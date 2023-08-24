import {
  Button,
  EditableText,
  InputGroup,
  Position,
  Toaster,
} from "@blueprintjs/core";
import { useEffect, useState } from "react";
import "./PatientProfile.css";
  
  const AppToaster = Toaster.create({
    position: Position.TOP,
  });
  
  const headers = {
    'Host': 'http://localhost:8080/'
  };
  
  
  function PatientProfile() {
    const [trusts, setTrust] = useState([]);
    const [newMedicalRecordNo, setNewMedicalRecordNo] = useState("");
    const [newPatientId, setNewPatientId] = useState("");
    const [newUserProfileId, setNewUserProfileID] = useState("");
    const [newHospitalId, setNewHospitalID] = useState("");
    const [filterActive, setFilterActive] = useState(false);
  
    useEffect(() => {
      fetch("http://localhost:8080/grails-cors/patientProfile/indexApi",{ headers })
        .then((response) => response.json())
        .then((json) => setTrust(json)).catch((err) => {
          console.log(err);
       });
    }, []);
  
    const createTrust = () => {
      const medicalRecordNo = newMedicalRecordNo.trim();
      const patientId = newPatientId.trim();
      const userProfileId = newUserProfileId.trim();
      const hospitalId = newHospitalId.trim();
      if (medicalRecordNo && patientId && userProfileId && hospitalId) {
  
        var body = JSON.stringify({
          medicalRecordNo,
          patientId,
          userProfile: {
            id : userProfileId
          },
          hospital: {
            id : hospitalId
          }
        });
        alert(body)
        console.log(body)

        fetch('http://localhost:8080/grails-cors/patientProfile/createApi/', {
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
     
      fetch(`http://localhost:8080/grails-cors/patientProfile/updateApi/${id}`, {
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
      fetch(`http://localhost:8080/grails-cors/patientProfile/deleteApi/${id}`, {
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
    ? trusts.filter(trust => !trust.patientId.endsWith('_0'))
    : trusts;


    return (
      
      <div className="App">
        <table class="bp4-html-table .modifier">
          <thead>
            <tr>
              <th>Id</th>
              <th>medicalRecordNo</th>
              <th>PatientId</th>
              <th>UserProfileId</th>
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
                    value={user.medicalRecordNo}
                    onChange={(value) => onChangeHandler(user.id, "medicalRecordId", value)}
                  />
                </td>
                
                <td>
                  <EditableText
                    value={user.patientId}
                    onChange={(value) => onChangeHandler(user.id, "patientId", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.userProfile.id}
                    onChange={(value) => onChangeHandler(user.id, "userProfileId", value) }
                  />
                </td>
                <td>
                  <EditableText
                    value={user.hospitaId}
                    onChange={(value) => onChangeHandler(user.id, "hospitalId", value) }
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
                  value={newMedicalRecordNo}
                  onChange={(e) => setNewMedicalRecordNo(e.target.value)}
                  placeholder="Enter ..."
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter ..."
                  value={newPatientId}
                  onChange={(e) => setNewPatientId(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter ..."
                  value={newUserProfileId}
                  onChange={(e) => setNewUserProfileID(e.target.value)}
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
                  Create PatientProfile
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
  export default PatientProfile;
  