import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import api from "../../services/axios";
import Loading from "../../components/shared/Loading";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/UseAuth";

const CustomerPayment = () => {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const { currentUser } = useUser();

  const handlePaymentAction = (paymentId) => {
    // Handle payment action (e.g., mark as completed)
    console.log("Payment action for ID:", paymentId);
    useNavigate(``);
  };

  // Fetch customer payments
  useEffect(() => {
    const fetchCustomerPayments = async () => {
      try {
        const res = await api.get(`/customer-payments/${currentUser.uuid}`);
        console.log(res.data);
        if (res.data.success) {
          const paymentData = res.data.payments.map((payment) => ({
            ...payment,
            action: (
              <button
                onClick={() => handlePaymentAction(payment.id)}
                title="click here to verify"
                className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-blue-600"
              >
                Verify
              </button>
            ),
          }));
          setPayments(paymentData);
        }
      } catch (error) {
        console.error("Error fetching customer reservations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerPayments();
  }, [currentUser]);
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
      name: "Customer Name",
      selector: (row) => row.customer_name,
      sortable: true,
    },
    { name: "Car Name", selector: (row) => row.car_name, sortable: true },
    {
      name: "Amount Paid (XAF)",
      selector: (row) => row.amount_paid,
      sortable: true,
    },
    {
      name: "Payment Method",
      selector: (row) => row.payment_method,
      sortable: true,
    },
    {
      name: "Payment Status",
      selector: (row) => row.payment_status,
      sortable: true,
    },
    {
      name: "Reference",
      selector: (row) => row.reference,
      sortable: true,
    },
    {
      name: "Date Paid",
      selector: (row) => row.date_paid,
      sortable: true,
    },
  ];
  if (loading) {
    return <Loading />;
  }

  return (
    <DataTable
      columns={columns}
      data={payments}
      customStyles={customStyles}
      title="Payments"
      pagination
      fixedHeader
    />
  );
};

export default CustomerPayment;
