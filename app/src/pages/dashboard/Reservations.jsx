import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import api from "../../services/axios";
import Loading from "../../components/shared/Loading";
import { useUser } from "../../hooks/UseAuth";
import { format } from "date-fns";
import Modal from "../../components/shared/Modal";

const Reservations = () => {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { currentUser } = useUser();

  //  Format dates to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy");
  };

  //  Handle action button click → open modal
  const handleReservationAction = (reservation) => {
    setSelectedReservation(reservation);
    setModalOpen(true);
  };

  //  Fetch reservations from backend
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await api.get(`/reservations`);
        if (res.data.success) {
          const resData = res.data.reservations.map((reservation) => ({
            ...reservation,
            action: (
              <button
                onClick={() => handleReservationAction(reservation)}
                title="Click here to view details"
                className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-blue-600"
              >
                Verify
              </button>
            ),
          }));
          setReservations(resData);
        }
      } catch (error) {
        console.error(" Error fetching customer reservations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [currentUser]);

  //  DataTable styles
  const customStyles = {
    headCells: {
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        backgroundColor: "rgb(1 40 91 / var(--tw-bg-opacity, 1))",
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

  // Table Columns
  const columns = [
    { name: "Car Name", selector: (row) => row.car_name, sortable: true },
    { name: "Owner Name", selector: (row) => row.owner_name, sortable: true },
    {
      name: "Customer Name",
      selector: (row) => row.customer_name,
      sortable: true,
    },
    { name: "Car Status", selector: (row) => row.status, sortable: true },
    {
      name: "Date Created",
      selector: (row) => formatDate(row.date_created),
      sortable: true,
    },
    { name: "Action", selector: (row) => row.action },
  ];

  // Show loader while fetching
  if (loading) return <Loading />;

  return (
    <>
      {/* Reservations DataTable */}
      <DataTable
        columns={columns}
        data={reservations}
        customStyles={customStyles}
        title="Reservations"
        pagination
        fixedHeader
      />

      {/* Reservation Details Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Reservation Details"
      >
        {selectedReservation ? (
          <div className="space-y-2">
            <p>
              <strong>Car Owner:</strong> {selectedReservation.owner_name}
            </p>
            <p>
              <strong>Customer:</strong> {selectedReservation.customer_name}
            </p>
            <p>
              <strong>Start Date:</strong>{" "}
              {formatDate(selectedReservation.start_date)}
            </p>
            <p>
              <strong>End Date:</strong>{" "}
              {formatDate(selectedReservation.end_date)}
            </p>
            <p>
              <strong>Rental Amount:</strong> $
              {selectedReservation.rental_amount}
            </p>
            <p>
              <strong>Status:</strong> {selectedReservation.status}
            </p>
            <p>
              <strong>Date Created:</strong>{" "}
              {formatDate(selectedReservation.date_created)}
            </p>
          </div>
        ) : (
          <p>No reservation selected</p>
        )}
      </Modal>
    </>
  );
};

export default Reservations;
