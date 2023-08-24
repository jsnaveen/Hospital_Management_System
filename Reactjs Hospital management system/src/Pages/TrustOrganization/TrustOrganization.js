import {
  Button,
  EditableText,
  InputGroup,
  Position,
  Toaster,
} from "@blueprintjs/core";
import { useEffect, useState } from "react";
import "./TrustOrganization.css";
  
  const AppToaster = Toaster.create({
    position: Position.TOP,
  });
  
  const headers = {
    'Host': 'http://localhost:8080/'
  };
  
  
  function TrustOrganization() {
    const [trusts, setTrust] = useState([]);
    const [newTrustId, setNewTrustId] = useState("");
    const [newOrganizationId, setNewOrganizationId] = useState("");
    const [filterActive, setFilterActive] = useState(false);

  
    useEffect(() => {
      fetch("http://localhost:8080/grails-cors/trustOrganization/indexApi",{ headers })
        .then((response) => response.json())
        .then((json) => setTrust(json)).catch((err) => {
          console.log(err);
          
       });
    }, []);
  
    const createTrust = () => {
      const trustId = newTrustId.trim();
      const organizationId = newOrganizationId.trim();
      
      if (trustId && organizationId) {
  
        var body = JSON.stringify({
          trust:{
            id : trustId
          },
          organization: {
            id : organizationId
          }
        });
    
        fetch('http://localhost:8080/grails-cors/trustOrganization/createApi/', {
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
     
      fetch(`http://localhost:8080/grails-cors/trustOrganization/updateApi/${id}`, {
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
      fetch(`http://localhost:8080/grails-cors/trustOrganization/deleteApi/${id}`, {
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
    ? trusts.filter(trust => !trust.clinicianId.endsWith('_0'))
    : trusts;

    return (
      
      <div className="App">
        <table class="bp4-html-table .modifier">
          <thead>
            <tr>
              <th>Id</th>
              <th>TrustId</th>
              <th>OrganizationId</th>
              
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {filteredTrusts.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <EditableText
                    value={user.trust.id}
                    onChange={(value) => onChangeHandler(user.id, "trustId", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.organization.id}
                    onChange={(value) => onChangeHandler(user.id, "OrganizationId", value)}
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
                  value={newTrustId}
                  onChange={(e) => setNewTrustId(e.target.value)}
                  placeholder="Enter ..."
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter ..."
                  value={newOrganizationId}
                  onChange={(e) => setNewOrganizationId(e.target.value)}
                />
              </td>
              
              <td>
                <Button intent="success" onClick={createTrust}>
                  Create TrustOrganization
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
  export default TrustOrganization;
  