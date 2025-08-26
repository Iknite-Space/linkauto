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

const AllPayments = () => {
  const { currentUser } = useUser();
  const [payments, setPayments] = useState([]);

  // Define columns dynamically
  const columns = useMemo(() => {
    const baseColumns = [
      {
        name: "Amount (FCFA)",
        selector: (row) => row.amount_paid,
        sortable: true,
      },
      {
        name: "Payment Method",
        selector: (row) => row.payment_method,
        sortable: true,
      },
      {
        name: "Reference",
        selector: (row) => row.reference,
        sortable: true,
      },
      {
        name: "Status",
        selector: (row) => row.payment_status,
        sortable: true,
      },
      {
        name: "Date",
        selector: (row) => {
          const date = new Date(row.date_paid);
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
            2,
            "0"
          )}-${String(date.getDate()).padStart(2, "0")}`;
        },
        sortable: true,
      },
    ];

    // Add extra columns for admins
    if (currentUser?.role === "admin" || currentUser?.role === "car_owner") {
      baseColumns.unshift({
        name: "Customer",
        selector: (row) => row.customer_name,
        sortable: true,
      });
    }

    return baseColumns;
  }, [currentUser]);

  // Fetch payments
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get("/payments", {
          params: {
            role: currentUser?.role,
            user_uuid: currentUser?.uuid,
          },
        });
        if (res.status === 200) {
          console.log(res.data);
          setPayments(res.data.payments);
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
        title="All Payments"
        columns={columns}
        data={payments}
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

export default AllPayments;
