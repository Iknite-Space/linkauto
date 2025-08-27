import { useEffect, useState, useMemo } from "react";
import api from "../../services/axios";
import DataTable from "react-data-table-component";

const customStyles = {
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      backgroundColor: "rgb(1 40 91 / var(--tw-bg-opacity, 1));",
      color: "white",
    },
  },
};

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  // Define columns dynamically
  const columns = useMemo(() => {
    const baseColumns = [
      {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
      },
      {
        name: "Gender",
        selector: (row) => row.gender,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row.account_status,
        sortable: true,
      },
      {
        name: "Date Registered",
        selector: (row) => {
          const date = new Date(row.created_at);
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}-${String(date.getDate()).padStart(2, "0")}`;
        },
        sortable: true,
      },
    ];

    return baseColumns;
  }, []);

  // Fetch payments
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/all-users");
        if (res.status === 200) {
          console.log(res.data);
          setUsers(res.data.users);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <DataTable
        title="All Active Users"
        columns={columns}
        data={users}
        pagination
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
        responsive
        striped
      />
    </div>
  );
};

export default AllUsers;
