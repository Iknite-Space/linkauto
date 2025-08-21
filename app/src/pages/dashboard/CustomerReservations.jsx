import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import api from "../../services/axios";
import Loading from "../../components/shared/Loading";
import { useUser } from "../../hooks/UseAuth";
import { format } from "date-fns";

const CustomerReservations = () => {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const { currentUser } = useUser();

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy");
  };

  // Fetch customer reservations
  useEffect(() => {
    const fetchCustomerReservations = async () => {
      try {
        const res = await api.get(`/customer-reservations/${currentUser.uuid}`);
        if (res.data.success) {
          const reservationData = res.data.reservations.map((reservation) => ({
            ...reservation,
          }));
          setReservations(reservationData);
        }
      } catch (error) {
        console.error("Error fetching customer reservations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomerReservations();
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
      selector: (row) => row.car_name,
      sortable: true,
    },
    {
      name: "Car Owner",
      selector: (row) => row.owner_name,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customer_name,
      sortable: true,
    },

    {
      name: "Rental Amount",
      selector: (row) => row.rental_amount,
      sortable: true,
    },
    {
      name: "Start Date",
      selector: (row) => formatDate(row.start_date),
      sortable: true,
    },
    {
      name: "End Date",
      selector: (row) => formatDate(row.end_date),
      sortable: true,
    },

    { name: "Status", selector: (row) => row.status, sortable: true },
  ];
  if (loading) {
    return <Loading />;
  }

  return (
    <DataTable
      columns={columns}
      data={reservations}
      customStyles={customStyles}
      title="Reservations"
      pagination
      fixedHeader
    />
  );
};

export default CustomerReservations;
