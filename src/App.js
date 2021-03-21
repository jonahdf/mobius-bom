import './App.css';
import MaterialTable from 'material-table'
import { useState } from 'react';

function App() {

  const [data, setData] = useState([])
  const [selectedBom, setBom] = useState("")

  const columns = [
    { title: "ID", field: "id"},
    { title: "bomId", field: "bomId"},
    { title: "model", field: "model"},
    { title: "uuid", field: "uuid"},
    { title: "created_at", field: "created_at"},
    { title: "updated_at", field: "updated_at"},
    { title: "quantity", field: "quantity"},
    { title: "item_unit_cost", field: "item_unit_cost"},
    { title: "specific_part", field: "specific_part"}
  ]

  function fetchBOM(e) {
    e.preventDefault()
    fetch("https://5f996efe50d84900163b8a42.mockapi.io/api/v1/bom/" + selectedBom + "/bomitem")
    .then(resp=>resp.json())
    .then(resp=>setData(resp))
  }

  var formStyle = {
      padding: 10,
      margin: 10,
      backgroundColor: "#e6e6e6",
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
      <form onSubmit = {fetchBOM}>
        <label>
          Enter Bom ID:
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

      <MaterialTable
        title = "Bill of materials"
        data = {data}
        columns = {columns}
        options = {{
          headerStyle: {
            backgroundColor: "#fafaf0",
            fontWeight: "bold"
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
