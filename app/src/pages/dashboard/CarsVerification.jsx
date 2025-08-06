import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import api from "../../services/axios";
import Loading from "../../components/shared/Loading";
import { useNavigate } from "react-router-dom";

const CarsVerification = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pendingUsers, setPendingUsers] = useState([]);
  const handleVerify = (userId) => {
    console.log("verify user with ID:", userId);
    // navigate to the single user verification page
    navigate(`/dashboard/user-verification/${userId}`);
  };
  // Fetch pending users for verification
  useEffect(() => {
    const fetchPendingUsers = async () => {
      try {
        const res = await api.get("/users/pending-verification");
        if (res.data.success) {
          const usersWithAction = res.data.users.map((user) => ({
            ...user,
            action: (
              <button
                onClick={() => handleVerify(user.uuid)}
                title="click here to verify"
                className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-blue-600"
              >
                Verify
              </button>
            ),
          }));
          setPendingUsers(usersWithAction);
        }
      } catch (error) {
        console.error("Error fetching pending users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingUsers();
  }, []);
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

  const columns = [
    {
      name: "Car Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Car Owner",
      selector: (row) => row.owner,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    { name: "Status", selector: (row) => row.status, sortable: true },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];
  if (loading) {
    return <Loading />;
  }

  return (
    <DataTable
      columns={columns}
      data={pendingUsers}
      customStyles={customStyles}
      title="User Verification"
      pagination
      fixedHeader
    />
  );
};

export default CarsVerification;
