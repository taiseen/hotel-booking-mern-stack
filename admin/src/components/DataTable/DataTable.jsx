import { userColumns } from "../../constants/dataTableSource";
import { Link, useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import './DataTable.scss'

const DataTable = ({ columns }) => {

  const location = useLocation();
  const [list, setList] = useState();
  const path = location.pathname.split("/")[1];
  // const { data, loading, error } = useFetch(`/${path}`);

  // useEffect(() => {
  //   setList(data);
  // }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err)
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">

            <Link to="/users/test" style={{ textDecoration: "none" }}>
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

      {/* <div className="dataTableTitle">
        {path} <Link to={`/${path}/new`} className="link"> Add New </Link>
      </div> */}

      <DataGrid
        rows={"userRows"}
        pageSize={5}
        checkboxSelection
        // className="dataGrid"
        rowsPerPageOptions={[5]}
        // getRowId={(row) => row._id}
        columns={userColumns.concat(actionColumn)}
      />

    </div>
  )
}

export default DataTable