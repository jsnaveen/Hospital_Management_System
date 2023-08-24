import {
    Button,
    EditableText,
    InputGroup,
    Position,
    Toaster,
} from "@blueprintjs/core";
import { useEffect, useState } from "react";
import "./PatientPrescription.css";
    
    const AppToaster = Toaster.create({
      position: Position.TOP,
    });
    
    const headers = {
      'Host': 'http://localhost:8080/'
    };
    
    
    function PatientPrescription() {
      const [trusts, setTrust] = useState([]);
      const [newMedication, setNewMedication] = useState("");
      const [newPatientProfileId, setNewPatientProfileId] = useState("");
      const [newPrescriptionDate, setNewPrescriptionDate] = useState("");
      const [newTherapistInstructions, setNewTherapistInstructions] = useState("");
      const [newTherapistName, setNewTherapistName] = useState("");
     
      const [newPrescriptionNo, setNewPrescriptionNo] = useState("");
      
      const [filterActive, setFilterActive] = useState(false);
    
      useEffect(() => {
        fetch("http://localhost:8080/grails-cors/patientPrescription/indexApi",{ headers })
          .then((response) => response.json())
          .then((json) => setTrust(json)).catch((err) => {
            console.log(err);
            
         });
      }, []);
    
      const createpatientPrescription = () => {
        const medication = newMedication.trim();
        const patientProfileId = newPatientProfileId.trim();
        const prescriptionDate = newPrescriptionDate.trim();
        const therapistInstructions = newTherapistInstructions.trim();
        const therapistName = newTherapistName.trim();
        
        const prescriptionNo = newPrescriptionNo.trim();
  
        if (medication && patientProfileId && prescriptionDate && therapistInstructions && therapistName && prescriptionNo) {
    
          var body = JSON.stringify({
            medication,
            patientProfile: {
              id : patientProfileId
            },
            prescriptionDate,
            therapistInstructions,
            therapistName,
            
            prescriptionNo
          });
      
          fetch('http://localhost:8080/grails-cors/patientPrescription/createApi/', {
            method: 'POST',
            body: body,
            headers: {
             
              'Content-Type': 'application/json',
             
            },
          })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
  
            setTrust((prevTrusts) => [...prevTrusts, data]);
    
            AppToaster.show({
             
              intent: 'success',
              timeout: 3000,
            });
          })
          .catch((err) => {
            console.error('Error during fetch:', err);
            AppToaster.show({
             
              intent: 'danger',
              timeout: 3000,
            });
          });
        }
      };
    
      const updateUser = (id) => {
       
        const trust = trusts.find((trustR) => trustR.id === id);
       
        fetch(`http://localhost:8080/grails-cors/patientPrescription/updateApi/${id}`, {
          method: "PUT",
          body: JSON.stringify(trust),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Host': 'http://localhost:8080/',
          },
        })
          .then((response) => response.json())
          .then(() => {
            AppToaster.show({
             
              intent: "success",
              timeout: 3000,
            });
          })
          .catch((err) => {
            console.log(err.message);
           
         });;
      };
    
      const deleteUser = (id) => {
        fetch(`http://localhost:8080/grails-cors/patientPrescription/deleteApi/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then(() => {
            setTrust((values) => {
              return values.filter((item) => item.id !== id);
            });
            AppToaster.show({
             
              intent: "success",
              timeout: 3000,
            });
          });
      };
    
      const onChangeHandler = (id, key, value) => {
        setTrust((values) => {
          return values.map((item) =>
            item.id === id ? { ...item, [key]: value } : item
          );
        });
      };
  
      const filteredTrusts = filterActive
      ? trusts.filter(trust => !trust.prescriptionNo.endsWith('_0'))
      : trusts;
  
      return (
        
        <div className="App">
          <table class="bp4-html-table .modifier">
            <thead>
              <tr>
                <th>Id</th>
                <th>Medication</th>
                <th>PatientProfileId</th>
                <th>PrescriptionDate</th>
                <th>TherapistInstructions</th>
                <th>TherapistName</th>
              
                <th>PrescriptionNo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {filteredTrusts.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <EditableText
                      value={user.medication}
                      onChange={(value) => onChangeHandler(user.id, "medication", value)}
                    />
                  </td>
                  <td>
                    <EditableText
                      value={user.patientProfile.id}
                      onChange={(value) => onChangeHandler(user.id, "patientProfileId", value)}
                    />
                  </td>
                  <td>
                    <EditableText
                      value={user.prescriptionDate}
                      onChange={(value) => onChangeHandler(user.id, "prescriptionDate", value)}
                    />
                  </td>
                  <td>
                    <EditableText
                      value={user.therapistInstructions}
                      onChange={(value) => onChangeHandler(user.id, "therapistInstructions", value)}
                    />
                  </td>
                  <td>
                    <EditableText
                      value={user.therapistName}
                      onChange={(value) =>
                        onChangeHandler(user.id, "therapistName", value)
                      }
                    />
                  </td>
                  <td>
                    <EditableText
                      value={user.prescriptionNo}
                      onChange={(value) =>
                        onChangeHandler(user.id, "prescriptionNo", value)
                      }
                    />
                  </td>
                  <td>
                    <Button intent="primary" onClick={() => updateUser(user.id)}>
                      Update
                    </Button>
                    &nbsp;
                    <Button intent="danger" onClick={() => deleteUser(user.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td>
                <InputGroup
                    value={newMedication}
                    onChange={(e) => setNewMedication(e.target.value)}
                    placeholder="Enter Medication..."
                  />
                  </td>
                <td>
                <InputGroup
                    value={newPatientProfileId}
                    onChange={(e) => setNewPatientProfileId(e.target.value)}
                    placeholder="Enter PatientProfileId..."
                  />
                  </td>
                <td>
                  <InputGroup
                    placeholder="Enter PrescriptionDate..."
                    value={newPrescriptionDate}
                    onChange={(e) => setNewPrescriptionDate(e.target.value)}
                  />
                </td>
                <td>
                  <InputGroup
                    placeholder="Enter TherapistInstructions..."
                    value={newTherapistInstructions}
                    onChange={(e) => setNewTherapistInstructions(e.target.value)}
                  />
                </td>
                <td>
                  <InputGroup
                    placeholder="Enter therapist Name..."
                    value={newTherapistName}
                    onChange={(e) => setNewTherapistName(e.target.value)}
                  />
                </td>
                <td>
                  <InputGroup
                    placeholder="prescriptionNo..."
                    value={newPrescriptionNo}
                    onChange={(e) => setNewPrescriptionNo(e.target.value)}
                  />
                </td>
                <td>
                  <Button intent="success" onClick={createpatientPrescription}>
                    Create PatientPrescription
                  </Button>
                </td>
                <td>
                     <Button onClick={() => setFilterActive(!filterActive)}>
                      {filterActive ? 'Clear Filter' : 'Apply Filter'}
                     </Button>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      );
    }
    export default PatientPrescription;
    