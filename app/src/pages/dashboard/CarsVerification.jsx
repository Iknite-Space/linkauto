import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import api from "../../services/axios";
import Loading from "../../components/shared/Loading";
import { useNavigate } from "react-router-dom";

const CarsVerification = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [pendingCars, setPendingCars] = useState([]);
  const handleVerify = (carId) => {
    console.log("verify car with ID:", carId);
    // navigate to the single car verification page
    navigate(`/dashboard/car-verification/${carId}`);
  };
  // Fetch pending cars for verification
  useEffect(() => {
    const fetchPendingCars = async () => {
      try {
        const res = await api.get("/cars/pending-verification");
        if (res.data.success) {
          const usersWithAction = res.data.cars.map((car) => ({
            ...car,
            action: (
              <button
                onClick={() => handleVerify(car.uuid)}
                title="click here to verify"
                className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-blue-600"
              >
                Verify
              </button>
            ),
          }));
          setPendingCars(usersWithAction);
        }
      } catch (error) {
        console.error("Error fetching pending users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPendingCars();
  }, []);
  const customStyles = {
    headCells: {
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        backgroundColor: "rgb(1 40 91 / var(--tw-bg-opacity, 1));",
        color: "white",
      },
    },
    cells: {
      style: {
        fontSize: "16px",
        paddingLeft: "8px",
        paddingRight: "8px",
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
      selector: (row) => row.owner_name,
      sortable: true,
    },

    { name: "Status", selector: (row) => row.visibility, sortable: true },
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
      data={pendingCars}
      customStyles={customStyles}
      title="Car Verification"
      pagination
      fixedHeader
    />
  );
};


export default CarsVerification;
