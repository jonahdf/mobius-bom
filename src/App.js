import './App.css';
import MaterialTable from 'material-table'
import { useState } from 'react';

function App() {

  //State hooks for data in table and currently selected BOM ID
  const [data, setData] = useState([]);
  const [selectedBom, setBom] = useState("");

  //Table object for MaterialTable
  const columns = [
    { title: "ID", field: "id", editable: "never"},
    { title: "BOM ID", field: "bomId", editable: "never"},
    { title: "Model", field: "model"},
    { title: "UUID", field: "uuid"},
    { title: "Created At", field: "created_at", type: 'numeric', editable: "never"},
    { title: "Updated At", field: "updated_at", type: 'numeric', editable: "never"},
    { title: "Quantity", field: "quantity", type: 'numeric'},
    { title: "Item Unit Cost", field: "item_unit_cost", type: 'numeric'},
    { title: "Specific Part", field: "specific_part", type: 'numeric'}
  ]

  //idSubmit: Handler for BOM ID Submit button
  function idSubmit(e) {
    e.preventDefault();
    fetchBOM();
  }

  //fetchBOM: Get request for BOM inputted to form
  function fetchBOM() {
    fetch("https://60582c6dc3f49200173ad737.mockapi.io/api/v1/bom/" + selectedBom + "/bomitem")
    .then(resp=>resp.json())
    .then(resp=>setData(resp))
  }

  //SendBOM: Sends PUT request
  //NewData: Updated row
  function sendBOM(newData) {
    console.log("newdata:", newData)

    fetch("https://60582c6dc3f49200173ad737.mockapi.io/api/v1/bom/" + selectedBom + "/bomitem/" + newData["id"], {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newData) 
    })
      .then(resp=>resp.json()) //Logs response
      .then(resp => {
        console.log('Success:', resp);
      })
      .catch((error) => {
        console.error('Error:', error);
      })

  }

  //Style for input form and BOM table
  var formStyle = {
      padding: 10,
      margin: 10,
      color: "#333",
      display: "inline-block",
      fontFamily: "monospace",
      fontSize: 16,
      textAlign: "center"
  };

  var divStyle = {
    margin: "auto",
    width: "50%",
    padding: 10
  };

  return (
    <div className="App">
      <div style={divStyle}>
      <form onSubmit = {idSubmit}>
        <label>
          Enter BOM ID:
          <input style={formStyle}
            type = "text" 
            name = "bom ID" 
            value = {selectedBom} 
            onChange = {(e) => setBom(e.target.value)}
            />

        </label>
        <input type="submit" value="Submit"  />
      </form>
      </div>

      <MaterialTable style={formStyle} //Style inside box
        title = "Bill of Materials:"
        data = {data}
        columns = {columns}

        editable={{
          //When row updated, updates locally and sends PUT request
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              dataUpdate[index]["updated_at"] = Math.floor(new Date().getTime()/1000);
              setData(dataUpdate);
              sendBOM(newData);
              resolve();
            }),      
          
          //When row deleted, updates locally. Does not send DELETE request
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              const dataUpdate = [...data];
              const index = oldData.tableData.id;
              dataUpdate.splice(index, 1);
              setData([...dataUpdate]);
              resolve();
            }),     
        }}
        options = {{
          filtering: true,
          headerStyle: {
            backgroundColor: "#fafaf0",
            fontWeight: "bold",
            padding: 10
          },

          rowStyle: {
            backgroundColor: '#f5f5f5',
            fontFamily: "monospace",
            fontSize: 20
          }
        }}
      />

    </div>
  );
}

export default App;
