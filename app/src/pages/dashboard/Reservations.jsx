import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import api from "../../services/axios";
import Loading from "../../components/shared/Loading";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/UseAuth";
import { format } from "date-fns";

const Reservations = () => {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const { currentUser } = useUser();

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy");
  };

  const handleReservationAction = (reservationId) => {
    // Handle reservation action (e.g., mark as completed)
    console.log("Reservation action for ID:", reservationId);
    useNavigate(``);
  };

  // Fetch customer reservations
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await api.get(`/reservations`);
        console.log(res.data);
        if (res.data.success) {
          const reservationData = res.data.reservations.map((reservation) => ({
            ...reservation,
            action: (
              <button
                onClick={() => handleReservationAction(reservation.id)}
                title="click here to verify"
                className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-blue-600"
              >
                Verify
              </button>
            ),
          }));
          setReservations(reservationData);
        }
      } catch (error) {
        console.error("Error fetching customer reservations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
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
      name: "Owner Name",
      selector: (row) => row.owner_name,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customer_name,
      sortable: true,
    },
    
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Date Created",
      selector: (row) => formatDate(row.date_created),
      sortable: true,
    },
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

export default Reservations;
