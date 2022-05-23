import { userDataTable, dataDelete } from "../../hooks/useFetch";
import { Link, useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import './DataTable.scss'


// this component call from ==> 🟨 ../pages/List.js 🟨 <Component/> 
const DataTable = ({ columns }) => {

  const location = useLocation();
  const [list, setList] = useState();

  const path = location.pathname.split("/")[1];
  const { data } = userDataTable(`/${path}`);

  useEffect(() => {
    setList(data);
  }, [data, list]);

  const handleDelete = async (id) => {
    try {
      await dataDelete(`/${path}/${id}`);
      setList(list.filter(item => item._id !== id));
    } catch (err) {
      console.log(err)
    }
  };


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="cellAction">

            <Link to={`/users/${params.row._id}`}>
              <div className="viewButton">View</div>
            </Link>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];



  return (
    <div className="dataTable">

      <div className="dataTableTitle">
        {path.toUpperCase()}
        <Link to={`/${path}/new`} className="link">
          Add New {path.charAt(0).toUpperCase() + path.slice(1)}
        </Link>
      </div>

      <DataGrid
        rows={data}
        pageSize={5}
        // checkboxSelection
        className='dataGrid'
        rowsPerPageOptions={[5]}
        getRowId={row => row._id}
        columns={columns.concat(actionColumn)}
      />

    </div>
  )
}

export default DataTable