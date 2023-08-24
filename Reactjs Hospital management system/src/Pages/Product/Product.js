import {
  Button,
  EditableText,
  InputGroup,
  Position,
  Toaster,
} from "@blueprintjs/core";
import { useEffect, useState } from "react";
import "./Product.css";
  
  const AppToaster = Toaster.create({
    position: Position.TOP,
  });
  
  const headers = {
    'Host': 'http://localhost:8080/'
  };
  
  
  function Product() {
    const [trusts, setTrust] = useState([]);
    const [newCode, setNewCode] = useState("");
    const [newDiseaseName, setNewDiseaseName] = useState("");
  
    const [filterActive, setFilterActive] = useState(false);
  
  
    useEffect(() => {
      fetch("http://localhost:8080/grails-cors/product/indexApi",{ headers })
        .then((response) => response.json())
        .then((json) => setTrust(json)).catch((err) => {
          console.log(err);
          
       });
    }, []);
  
    const createProduct = () => {
      const code = newCode.trim();
      const diseaseName = newDiseaseName.trim();
      
     
      if (code && diseaseName  ) {
  
        var body = JSON.stringify({
          
          code,
          diseaseName
         
          
        });
    
        fetch('http://localhost:8080/grails-cors/product/createApi/', {
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
     
      fetch(`http://localhost:8080/grails-cors/product/updateApi/${id}`, {
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
      fetch(`http://localhost:8080/grails-cors/product/deleteApi${id}`, {
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
    ? trusts.filter(trust => !trust.code.endswith('_0'))
    : trusts;

    return (
      
      <div className="App">
        <table class="bp4-html-table .modifier">
          <thead>
            <tr>
              <th>Id</th>
              <th>Code</th>
              <th>DiseaseName</th>
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
                    value={user.diseaseName}
                    onChange={(value) => onChangeHandler(user.id, "diseaseName", value)}
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
                  placeholder="Enter code..."
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                />
              </td>
              <td>
                <InputGroup
                  value={newDiseaseName}
                  onChange={(e) => setNewDiseaseName(e.target.value)}
                  placeholder="Enter name..."
                />
              </td>


              <td>
                <Button intent="success" onClick={createProduct}>
                  Create Product
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
  export default Product;
  