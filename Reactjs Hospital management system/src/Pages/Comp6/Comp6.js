import {
  Button,
  EditableText,
  InputGroup,
  Position,
  Toaster,
} from "@blueprintjs/core";
import { useEffect, useState } from "react";
import "./Comp6.css";
  
  const AppToaster = Toaster.create({
    position: Position.TOP,
  });
  
  const headers = {
    'Host': 'http://localhost:8080/'
  };
  
  
  function Comp6() {
    const [trusts, setTrust] = useState([]);
    const [newUserProfileId, setNewUserProfileId] = useState("");
    const [newStreetAddressLine1, setNewStreetAddressLine1] = useState("");
    const [newStreetAddressLine2, setNewStreetAddressLine2] = useState("");
    const [newState, setNewState] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newCountry, setNewCountry] = useState("");
    const [newPostalCode, setNewPostalCode] = useState("");
    
    const [filterActive, setFilterActive] = useState(false);
  
    useEffect(() => {
      fetch("http://localhost:8080/grails-cors/address/indexApi",{ headers })
        .then((response) => response.json())
        .then((json) => setTrust(json)).catch((err) => {
          console.log(err);
          
       });
    }, []);
  
    const createTrust = () => {
      const userProfileId = newUserProfileId.trim();
      const streetAddressLine1 = newStreetAddressLine1.trim();
      const streetAddressLine2 = newStreetAddressLine2.trim();
      const state = newState.trim();
      const city = newCity.trim();
      const country = newCountry.trim();
      const postalCode = newPostalCode.trim();

      if (userProfileId && streetAddressLine1 && streetAddressLine1 && state && city && country && postalCode) {
  
        var body = JSON.stringify({
          userProfile: {
            id : userProfileId
          },
          streetAddressLine1,
          streetAddressLine2,
          state,
          city,
          country,
          postalCode,
        });
    
        fetch('http://localhost:8080/grails-cors/address/createApi/', {
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
     
      fetch(`http://localhost:8080/grails-cors/address/updateApi/${id}`, {
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
      fetch(`http://localhost:8080/grails-cors/address/deleteApi/${id}`, {
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
    ? trusts.filter(trust => !trust.postalCode.endsWith('_0'))
    : trusts;

    return (
      
      <div className="App">
        <table class="bp4-html-table .modifier">
          <thead>
            <tr>
              <th>Id</th>
              <th>UserProfileId</th>
              <th>StreetAddressLine1</th>
              <th>StreetAddressLine2</th>
              <th>State</th>
              <th>City</th>
              <th>Country</th>
              <th>PostalCode</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {filteredTrusts.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <EditableText
                    value={user.userProfileId}
                    onChange={(value) => onChangeHandler(user.id, "userProfileId", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.streetAddressLine1}
                    onChange={(value) => onChangeHandler(user.id, "streetAddressLine1", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.streetAddressLine2}
                    onChange={(value) => onChangeHandler(user.id, "streetAddressLine2", value)}
                  />
                </td>
                <td>
                  <EditableText
                    value={user.state}
                    onChange={(value) =>
                      onChangeHandler(user.id, "state", value)
                    }
                  />
                </td>
                <td>
                  <EditableText
                    value={user.city}
                    onChange={(value) =>
                      onChangeHandler(user.id, "city", value)
                    }
                  />
                </td>
                <td>
                  <EditableText
                    value={user.country}
                    onChange={(value) =>
                      onChangeHandler(user.id, "country", value)
                    }
                  />
                </td>
                <td>
                  <EditableText
                    value={user.postalCode}
                    onChange={(value) =>
                      onChangeHandler(user.id, "postalCode", value)
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
                  placeholder="Enter UserProfileId..."
                  value={newUserProfileId}
                  onChange={(e) => setNewUserProfileId(e.target.value)}
                />
                </td>
              <td>
                <InputGroup
                  placeholder="Enter streetAddressLine1..."
                  value={newStreetAddressLine1}
                  onChange={(e) => setNewStreetAddressLine1(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter streetAddressLine2..."
                  value={newStreetAddressLine2}
                  onChange={(e) => setNewStreetAddressLine2(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter State..."
                  value={newState}
                  onChange={(e) => setNewState(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter location..."
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter location..."
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  placeholder="Enter location..."
                  value={newPostalCode}
                  onChange={(e) => setNewPostalCode(e.target.value)}
                />
              </td>
              <td>
                <Button intent="success" onClick={createTrust}>
                  Create Address
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
  export default Comp6;
  