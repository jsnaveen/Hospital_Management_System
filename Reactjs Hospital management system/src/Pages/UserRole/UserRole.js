import {
  Button,
  EditableText,
  InputGroup,
  Position,
  Toaster,
} from "@blueprintjs/core";
import { useEffect, useState } from "react";
import "./UserRole.css";
  
  const AppToaster = Toaster.create({
    position: Position.TOP,
  });
  
  const headers = {
    'Host': 'http://localhost:8080/'
  };
  
  
  function UserRole() {
    const [trusts, setTrust] = useState([]);
    const [newUserProfileId, setNewUserProfileID] = useState("");
    const [newRoleId, setNewRoleId] = useState("");

    const [filterActive, setFilterActive] = useState(false);
   
  
    useEffect(() => {
      fetch("http://localhost:8080/grails-cors/userRole/indexApi",{ headers })
        .then((response) => response.json())
        .then((json) => setTrust(json)).catch((err) => {
          console.log(err);
         
       });
    }, []);
  
      const create = () => {
      const userProfileId = newUserProfileId.trim();
      const roleId = newRoleId.trim();
     
      if (userProfileId && roleId) {
  
        var body = JSON.stringify({
          userProfile:{
            id : userProfileId
          },
          role:{
             id : roleId
          }
        });
    
        fetch('http://localhost:8080/grails-cors/userRole/createApi/', {
          method: 'POST',
          body: body,
          headers: {
          
            'Content-Type': 'application/json',
          },
        })
           .then((response) => response.json())
           .then((data) => {
            AppToaster.show({
              intent: "success",
              timeout: 3000,
            });
              
           })
           .catch((err) => {
              console.log(err);
             
           });
  

      }
    };
  
    const updateUser = (id) => {
      
      const trust = trusts.find((trustR) => trustR.id === id);
     
      fetch(`http://localhost:8080/grails-cors/userRole/updateApi/${id}`, {
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
      fetch(`http://localhost:8080/grails-cors/userRole/deleteApi/${id}`, {
        method: "DELETE",
      })
    };
  
    const onChangeHandler = (id, key, value) => {
      setTrust((values) => {
        return values.map((item) =>
          item.id === id ? { ...item, [key]: value } : item
        );
      });
    };

    const filteredTrusts = filterActive
    ? trusts.filter(trust => !trust.status.endsWith('_0'))
    : trusts;


    return (
      
      <div className="App">
        <table class="bp4-html-table .modifier">
          <thead>
            <tr>
              <th>Id</th>
              <th>UserProfileId</th>
              <th>RoleId</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {filteredTrusts.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <EditableText
                    value={user.userProfile.id}
                    onChange={(value) => onChangeHandler(user.id, "userProfileId", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.role.id}
                    onChange={(value) => onChangeHandler(user.id, "roleId", value)
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
                  value={newUserProfileId}
                  onChange={(e) => setNewUserProfileID(e.target.value)}
                  placeholder="Enter ..."
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter ..."
                  value={newRoleId}
                  onChange={(e) => setNewRoleId(e.target.value)}
                />
              </td>
              <td>
                <Button intent="success" onClick={create}>
                  Create UserRole
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
  export default UserRole;
  