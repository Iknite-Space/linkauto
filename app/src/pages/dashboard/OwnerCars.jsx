import DataTable from "react-data-table-component";
import { useEffect, useState } from "react";
import api from "../../services/axios";
import Loading from "../../components/shared/Loading";
import { useUser } from "../../hooks/UseAuth";
import { format } from "date-fns";
import Modal from "../../components/UI/Modal";
import Button from "../../components/UI/Button";
import { toast } from "react-toastify";

const OwnerCars = () => {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { currentUser } = useUser();

  // Format dates to readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return format(date, "MMMM dd, yyyy");
  };

  // Handle action button click → open modal
  const handleCarAction = (car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  // Change car status
  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      const res = await api.patch(`/car-status`, {
        status: newStatus,
        uuid: selectedCar?.car_uuid,
      });

      if (res.data.success) {
        toast.success(`Car marked as ${newStatus} successfully!`);

        // update UI instantly without refetch
        setCars((prevCars) =>
          prevCars.map((car) =>
            car.car_uuid === selectedCar.car_uuid
              ? { ...car, visibility: newStatus }
              : car
          )
        );
      } else {
        toast.error(res.data.message || "Failed to update car status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      setModalOpen(false); 
    }
  };

  // Fetch cars from backend
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await api.get(`/owner-car/${currentUser.uuid}`);
        if (res.data.success) {
          const resData = res.data.cars.map((car) => ({
            ...car,
            action: (
              <button
                onClick={() => handleCarAction(car)}
                title="Click here to view details"
                className="px-4 py-2 font-bold text-white rounded bg-primary hover:bg-blue-600"
              >
                Details
              </button>
            ),
          }));
          setCars(resData);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        toast.error("Failed to load cars.");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [currentUser]);

  // DataTable styles
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
    { name: "Owner Name", selector: (row) => row.owner_name, sortable: true },
    { name: "Car Uuid", selector: (row) => row.car_uuid, sortable: true },
    {
      name: "Price Per Day",
      selector: (row) => row.price_per_day,
      sortable: true,
    },
    { name: "Status", selector: (row) => row.visibility, sortable: true },
    {
      name: "Date Uploaded",
      selector: (row) => formatDate(row.date_created),
      sortable: true,
    },
    { name: "Action", selector: (row) => row.action },
  ];

  if (loading) return <Loading />;

  return (
    <>
      
      <DataTable
        columns={columns}
        data={cars}
        customStyles={customStyles}
        title="Cars"
        pagination
        fixedHeader
      />

      {/* Car Details Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Car Details"
      >
        {selectedCar ? (
          <div className="space-y-3">
            <p>
              <strong>Car Owner:</strong> {selectedCar.owner_name}
            </p>
            <p>
              <strong>Car Uuid:</strong> {selectedCar.car_uuid}
            </p>
            <p>
              <strong>Price Per Day:</strong> {selectedCar.price_per_day}
            </p>
            <p>
              <strong>Status:</strong> {selectedCar.visibility}
            </p>
            <p>
              <strong>Date Uploaded:</strong>{" "}
              {formatDate(selectedCar.date_created)}
            </p>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                variant="green"
                onClick={() => handleStatusChange("available")}
              >
                Available
              </Button>
              <Button
                variant="red"
                onClick={() => handleStatusChange("unavailable")}
              >
                Unavailable
              </Button>
            </div>
          </div>
        ) : (
          <p>No car selected</p>
        )}
      </Modal>
    </>
  );
};

export default OwnerCars;
