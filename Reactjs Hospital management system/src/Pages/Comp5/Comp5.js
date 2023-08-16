import {
  Button,
  EditableText,
  InputGroup,
  Position,
  Toaster,
} from "@blueprintjs/core";
import { useEffect, useState } from "react";
import "./Comp5.css";
  
  const AppToaster = Toaster.create({
    position: Position.TOP,
  });
  
  const headers = {
    'Host': 'http://localhost:8080/'
  };
  
  
  function Comp5() {
    const [trusts, setTrust] = useState([]);
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newAccessToken, setNewAccessToken] = useState("");
    const [newDOB, setNewDOB] = useState("");
    const [newGender, setNewGender] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPhoneNumber, setNewPhoneNumber] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newUUID, setNewUUID] = useState("");
    const [filterActive, setFilterActive] = useState(false);
   
  
    useEffect(() => {
      fetch("http://localhost:8080/grails-cors/userProfile/indexApi",{ headers })
        .then((response) => response.json())
        .then((json) => setTrust(json)).catch((err) => {
          console.log(err);
          
       });
    }, []);
  
    const createTrust = () => {
      const firstName = newFirstName.trim();
      const lastName = newLastName.trim();
      const email = newEmail.trim();
      const accessToken = newAccessToken.trim();
      const dob = newDOB.trim();
      const gender = newGender.trim();
      const password = newPassword.trim();
      const phoneNumber = newPhoneNumber.trim();
      const title = newTitle.trim();
      const uuid = newUUID.trim();

      if (firstName && lastName && email && accessToken && dob && gender && password && phoneNumber && title && uuid) {
  
        var body = JSON.stringify({
          firstName,
          lastName,
          email,
          accessToken,
          dob,
          gender,
          password,
          phoneNumber,
          title,
          uuid,

        });
    
        fetch('http://localhost:8080/grails-cors/userProfile/createApi/', {
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
    
      fetch(`http://localhost:8080/grails-cors/userProfile/updateApi/${id}`, {
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
      fetch(`http://localhost:8080/grails-cors/userProfile/deleteApi/${id}`, {
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
    ? trusts.filter(trust => !trust.uuid.endsWith('_0'))
    : trusts;

    return (
      
      <div className="App">
        <table class="bp4-html-table .modifier">
          <thead>
            <tr>
              <th>Id</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>AccessToken</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>PhoneNumber</th>
              <th>password</th>
              <th>Title</th>
              <th>UUID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {filteredTrusts.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                
                <td>
                  <EditableText
                    value={user.firstName}
                    onChange={(value) => onChangeHandler(user.id, "firstName", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.lastName}
                    onChange={(value) => onChangeHandler(user.id, "lastName", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.email}
                    onChange={(value) => onChangeHandler(user.id, "email", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.accessToken}
                    onChange={(value) => onChangeHandler(user.id, "accessToken", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.dob}
                    onChange={(value) => onChangeHandler(user.id, "dob", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.gender}
                    onChange={(value) => onChangeHandler(user.id, "gender", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.phoneNumber}
                    onChange={(value) => onChangeHandler(user.id, "phoneNumber", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.password}
                    onChange={(value) => onChangeHandler(user.id, "password", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.title}
                    onChange={(value) => onChangeHandler(user.id, "title", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.uuid}
                    onChange={(value) => onChangeHandler(user.id, "uuid", value)}
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
           )) }
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <td>
                <InputGroup
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                  placeholder="Enter Firstname ..."
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter Lastname..."
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter Email..."
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="EnterAccessToken ..."
                  value={newAccessToken}
                  onChange={(e) => setNewAccessToken(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter DOB..."
                  value={newDOB}
                  onChange={(e) => setNewDOB(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter Gender..."
                  value={newGender}
                  onChange={(e) => setNewGender(e.target.value)}
                />
              </td>

              <td>
                <InputGroup
                  placeholder="Enter PhoneNumber..."
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                />
              </td>
              
              <td>
                <InputGroup
                  placeholder="Enter Password..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </td>
              
              <td>
                <InputGroup
                  placeholder="Enter Title..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter UUID..."
                  value={newUUID}
                  onChange={(e) => setNewUUID(e.target.value)}
                />
              </td>
              <td>
                <Button intent="success" onClick={createTrust}>
                  Create UserProfile
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
  export default Comp5;
  