import {
  Button,
  EditableText,
  InputGroup,
  Position,
  Toaster,
} from "@blueprintjs/core";
import { useEffect, useState } from "react";
import "./Comp8.css";
  
  const AppToaster = Toaster.create({
    position: Position.TOP,
  });
  
  const headers = {
    'Host': 'http://localhost:8080/'
  };
  
  
  function Comp8() {
    const [trusts, setTrust] = useState([]);
    const [newAdmissionNotes, setNewAdmissionNotes] = useState("");
    const [newPatientAdmissionDateAndTime, setNewPatientAdmissionDateAndTime] = useState("");
    const [newPatientDischargeDateAndTime, setNewPatientDischargeDateAndTime] = useState("");
    const [newAdmissionNo, setNewAdmissionNo] = useState("");
    const [newPatientProfileId, setNewPatientProfileId] = useState("");
    const [newHospitalId, setNewHospitalID] = useState("");
    const [filterActive, setFilterActive] = useState(false);

  
    useEffect(() => {
      fetch("http://localhost:8080/grails-cors/admissionLog/indexApi",{ headers })
        .then((response) => response.json())
        .then((json) => setTrust(json)).catch((err) => {
          console.log(err);
         
       });
    }, []);
  
    const createTrust = () => {
      const admissionNotes = newAdmissionNotes.trim();
      const admissionNo = newAdmissionNo.trim();
      const patientAdmissionDateAndTime = newPatientAdmissionDateAndTime.trim();
      const patientDischargeDateAndTime = newPatientDischargeDateAndTime.trim();
      const patientProfileId = newPatientProfileId.trim();
      const hospitalId = newHospitalId.trim();
      if (admissionNotes && patientAdmissionDateAndTime && patientDischargeDateAndTime && patientProfileId && admissionNo && hospitalId) {
  
        var body = JSON.stringify({
          admissionNotes,
          patientAdmissionDateAndTime,
          patientDischargeDateAndTime,
          patientProfile: {
            id : patientProfileId
          },
          hospital :{
            id : hospitalId
          },
          admissionNo,
        });
    
        fetch('http://localhost:8080/grails-cors/admissionLog/createApi/', {
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
    
      fetch(`http://localhost:8080/grails-cors/admissionLog/updateApi/${id}`, {
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
      fetch(`http://localhost:8080/grails-cors/admissionLog/deleteApi/${id}`, {
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
    ? trusts.filter(trust => !trust.admissionNo.endsWith('_0'))
    : trusts;

    return (
      
      <div className="App">
        <table class="bp4-html-table .modifier">
          <thead>
            <tr>
              <th>Id</th>
              <th>AdmissionNotes</th>
              <th>AdmissionNo</th>
              <th>PatientAdmissionDateAndTime</th>
              <th>PatientDischargeDateAndTime</th>
              <th>PatientProfileId</th>
              <th>HospitalId</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {filteredTrusts.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <EditableText
                    value={user.admissionNotes}
                    onChange={(value) => onChangeHandler(user.id, "admissionNotes", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.admissionNo}
                    onChange={(value) => onChangeHandler(user.id, "admissionNo", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.patientAdmissionDateAndTime}
                    onChange={(value) => onChangeHandler(user.id, "PatientAdmisionDateAndTime", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.patientDischargeDateAndTime}
                    onChange={(value) =>
                      onChangeHandler(user.id, "patientDischargeDateAndTime", value)
                    }
                  />
                </td>
                <td>
                  <EditableText
                    value={user.patientProfileId}
                    onChange={(value) =>
                      onChangeHandler(user.id, "patientProfileId", value)
                    }
                  />
                </td>
                <td>
                  <EditableText
                    value={user.hospitalId}
                    onChange={(value) =>
                      onChangeHandler(user.id, "hospital_Id", value)
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
                  value={newAdmissionNotes}
                  onChange={(e) => setNewAdmissionNotes(e.target.value)}
                  placeholder="Enter ..."
                />
              </td>
              <td>
                <InputGroup
                  value={newAdmissionNo}
                  onChange={(e) => setNewAdmissionNo(e.target.value)}
                  placeholder="Enter ..."
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter ..."
                  value={newPatientAdmissionDateAndTime}
                  onChange={(e) => setNewPatientAdmissionDateAndTime(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter ..."
                  value={newPatientDischargeDateAndTime}
                  onChange={(e) => setNewPatientDischargeDateAndTime(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter ..."
                  value={newPatientProfileId}
                  onChange={(e) => setNewPatientProfileId(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter ..."
                  value={newHospitalId}
                  onChange={(e) => setNewHospitalID(e.target.value)}
                />
              </td>
              <td>
                <Button intent="success" onClick={createTrust}>
                  Create AdmissionLog
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
  export default Comp8;
  