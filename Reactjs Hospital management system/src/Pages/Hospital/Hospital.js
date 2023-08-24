import {
  Button,
  EditableText,
  InputGroup,
  Position,
  Toaster,
} from "@blueprintjs/core";
import { useEffect, useState } from "react";
import "./Hospital.css";
  
  const AppToaster = Toaster.create({
    position: Position.TOP,
  });
  
  const headers = {
    'Host': 'http://localhost:8080/'
  };
  
  
  function Hospital() {
    const [trusts, setTrust] = useState([]);
    const [newName, setNewName] = useState("");
    const [newCode, setNewCode] = useState("");
    const [newLocation, setNewLocation] = useState("");
    const [newTrustId, setNewTrustId] = useState("");
    const [filterActive, setFilterActive] = useState(false);

  
    useEffect(() => {
      fetch("http://localhost:8080/grails-cors/hospital/indexApi",{ headers })
        .then((response) => response.json())
        .then((json) => setTrust(json)).catch((err) => {
          console.log(err);
       });
    }, []);
  
    const createTrust = () => {
      const name = newName.trim();
      const code = newCode.trim();
      const location = newLocation.trim();
      const trustId = newTrustId.trim();
      if (name && code && location && trustId) {
  
        var body = JSON.stringify({
          name,
          code,
          location,
          trust : {
            id : trustId
          },
        });
    
        fetch('http://localhost:8080/grails-cors/hospital/createApi/', {
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
     
      fetch(`http://localhost:8080/grails-cors/hospital/updateApi/${id}`, {
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
            message: "hospital updated successfully",
            intent: "success",
            timeout: 3000,
          });
        })
        .catch((err) => {
          console.log(err.message);
          
       });;
    };
  
    const deleteUser = (id) => {
      fetch(`http://localhost:8080/grails-cors/hospital/deleteApi/${id}`, {
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
              <th>Name</th>
              <th>Code</th>
              <th>Location</th>
              <th>Trust Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {filteredTrusts.map((user) => (
              <tr key={user.id}>
                
                <td>{user.id}</td>
                <td>
                  <EditableText
                    value={user.name}
                    onChange={(value) => onChangeHandler(user.id, "name", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.code}
                    onChange={(value) => onChangeHandler(user.id, "code", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.location}
                    onChange={(value) =>onChangeHandler(user.id, "location", value)
                    }
                  />
                </td>
                <td>
                  <EditableText
                    value={user.trust.id} onChange={(value) =>onChangeHandler(user.id, "trust_Id", value)
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
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter name..."
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter code..."
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter location..."
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter Id..."
                  value={newTrustId}
                  onChange={(e) => setNewTrustId(e.target.value)}
                />
              </td>
              <td>
                <Button intent="success" onClick={createTrust}>
                  Create Hospital
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
  export default Hospital;
  