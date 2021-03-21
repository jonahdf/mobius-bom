import logo from './logo.svg';
import './App.css';
import MaterialTable from 'material-table'
import { useEffect, useState } from 'react';

function App() {

  const [data, setData] = useState([])
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
  
  useEffect(() => {
    fetch("https://5f996efe50d84900163b8a42.mockapi.io/api/v1/bom/1001/bomitem")
    .then(resp=>resp.json())
    .then(resp=>setData(resp))
  }, [])

  return (
    <div className="App">
      <h4 align="center"> Bill of materials</h4>
      <MaterialTable
        title = "Bill of materials"
        data = {data}
        columns = {columns}
      />

    </div>
  );
}

export default App;
