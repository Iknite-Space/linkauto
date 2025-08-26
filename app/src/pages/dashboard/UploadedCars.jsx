import { useEffect, useState, useMemo } from "react";
import api from "../../services/axios";
import { useUser } from "../../hooks/UseAuth";
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

const UploadedCars = () => {
  const { currentUser } = useUser();
  const [cars, setCars] = useState([]);

  // Define columns dynamically
  const columns = useMemo(() => {
    const baseColumns = [
      {
        name: "Car Name",
        selector: (row) => row.name,
        sortable: true,
      },
      {
        name: "Visibility",
        selector: (row) => row.visibility,
        sortable: true,
      },
      {
        name: "Price Per Day(FCFA)",
        selector: (row) => row.price_per_day,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
      },
      {
        name: "Date Uploaded",
        selector: (row) => {
          const date = new Date(row.date_added);
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}-${String(date.getDate()).padStart(2, "0")}`;
        },
        sortable: true,
      },
    ];

    return baseColumns;
  }, [currentUser]);

  // Fetch payments
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get("/uploaded-cars", {
          params: {
            user_uuid: currentUser?.uuid,
          },
        });
        console.log(res.data);
        if (res.status === 200) {
          console.log(res.data);
          setCars(res.data.cars);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, [currentUser]);

  return (
    <div>
      <DataTable
        title="All Uploaded Cars"
        columns={columns}
        data={cars}
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

export default UploadedCars;
