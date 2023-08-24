import {
    Button,
    EditableText,
    InputGroup,
    Position,
    Toaster,
} from "@blueprintjs/core";
import { useEffect, useState } from "react";
import "./HospitalTherapy.css";
    
    const AppToaster = Toaster.create({
      position: Position.TOP,
    });
    
    const headers = {
      'Host': 'http://localhost:8080/'
    };
    
    
    function HospitalTherapy() {
      const [trusts, setTrust] = useState([]);
      const [newCode, setNewCode] = useState("");
      const [newPatientProfileId, setNewPatientProfileId] = useState("");
      const [newProductId, setNewProductId] = useState("");
      const [newSessionCompletedDate, setNewSessionCompletedDate] = useState("");
      const [newSessionEndDate, setNewSessionEndDate] = useState("");
      const [newSessionNotes, setNewSessionNotes] = useState("");
      const [newSessionStartDate, setNewSessionStartDate] = useState("");
      
      const [newTherapistName, setNewTherapistName] = useState("");
      
      const [filterActive, setFilterActive] = useState(false);
    
      useEffect(() => {
        fetch("http://localhost:8080/grails-cors/hospitalTherapy/indexApi",{ headers })
          .then((response) => response.json())
          .then((json) => setTrust(json)).catch((err) => {
            console.log(err);
            
         });
      }, []);
    
      const createHospitalTherapy = () => {
        const code = newCode.trim();
        const patientProfileId = newPatientProfileId.trim();
        const productId = newProductId.trim();
        const sessionCompleted = newSessionCompletedDate.trim();
        const sessionEndDate = newSessionEndDate.trim();
        const sessionNotes = newSessionNotes.trim();
        const sessionStartDate = newSessionStartDate.trim();
        
        const therapistName = newTherapistName.trim();
  
        if (code && patientProfileId && productId && sessionCompleted && sessionEndDate && sessionNotes && sessionStartDate && therapistName) {
    
          var body = JSON.stringify({
            code,
            patientProfile: {
              id : patientProfileId
            },
            product:{
                id : productId
            },
            sessionCompleted,
            sessionEndDate,
            sessionNotes,
            sessionStartDate,
           
            therapistName
          });
      
          fetch('http://localhost:8080/grails-cors/hospitalTherapy/createApi/', {
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
       
        fetch(`http://localhost:8080/grails-cors/hospitalTherapy/updateApi/${id}`, {
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
        fetch(`http://localhost:8080/grails-cors/hospitalTherapy/deleteApi/${id}`, {
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
      ? trusts.filter(trust => !trust.code.endsWith('_0'))
      : trusts;
  
      return (
        
        <div className="App">
          <table class="bp4-html-table .modifier">
            <thead>
              <tr>
                <th>Id</th>
                <th>Code</th>
                <th>PatientProfileId</th>
                <th>ProductId</th>
                <th>SessionCompletedDate</th>
                <th>SessionEndDate</th>
                <th>SessionNotes</th>
                <th>SessionStartDate</th>
                
                <th>TherapistName</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {filteredTrusts.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    <EditableText
                      value={user.code}
                      onChange={(value) => onChangeHandler(user.id, "code", value)}
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
                      value={user.product.id}
                      onChange={(value) => onChangeHandler(user.id, "productId", value)}
                    />
                  </td>
                  <td>
                    <EditableText
                      value={user.sessionCompletedDate}
                      onChange={(value) => onChangeHandler(user.id, "sessionCompletedDate", value)}
                    />
                  </td>
                  <td>
                    <EditableText
                      value={user.sessionEndDate}
                      onChange={(value) =>
                        onChangeHandler(user.id, "sessionEndDate", value)
                      }
                    />
                  </td>
                  <td>
                    <EditableText
                      value={user.sessionNotes}
                      onChange={(value) =>
                        onChangeHandler(user.id, "sessionNotes", value)
                      }
                    />
                  </td>
                  <td>
                    <EditableText
                      value={user.sessionStartDate}
                      onChange={(value) =>
                        onChangeHandler(user.id, "sessionStartDate", value)
                      }
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
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="Enter Code..."
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
                    placeholder="Enter ProductId..."
                    value={newProductId}
                    onChange={(e) => setNewProductId(e.target.value)}
                  />
                </td>
                <td>
                  <InputGroup
                    placeholder="Enter sessionCompletedDate..."
                    value={newSessionCompletedDate}
                    onChange={(e) => setNewSessionCompletedDate(e.target.value)}
                  />
                </td>
                <td>
                  <InputGroup
                    placeholder="Enter SessionEndDate..."
                    value={newSessionEndDate}
                    onChange={(e) => setNewSessionEndDate(e.target.value)}
                  />
                </td>
                <td>
                  <InputGroup
                    placeholder="Enter SessionNotes..."
                    value={newSessionNotes}
                    onChange={(e) => setNewSessionNotes(e.target.value)}
                  />
                </td>
                <td>
                  <InputGroup
                    placeholder="Enter SessionStartDate..."
                    value={newSessionStartDate}
                    onChange={(e) => setNewSessionStartDate(e.target.value)}
                  />
                </td>
               
                <td>
                  <InputGroup
                    placeholder="therapistName..."
                    value={newTherapistName}
                    onChange={(e) => setNewTherapistName(e.target.value)}
                  />
                </td>
                <td>
                  <Button intent="success" onClick={createHospitalTherapy}>
                    Create Hospital Therapy
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
    export default HospitalTherapy;
    