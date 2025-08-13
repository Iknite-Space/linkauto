import React, { useState,useEffect } from "react";
import Button from "../../components/UI/Button";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import api from "../../services/axios";

export default function SingleUserVerification() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null); 
  const [carData, setCarData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const { car_uuid } = useParams(); // Used to extract the uuid form the current url
  console.log("Car UUID:", car_uuid);

  useEffect(() => {
  const fetchCarData = async () => {
    try {
      console.log("Fetching car data for UUID:", car_uuid); 
      const res = await api.get(`/car-verification/${car_uuid}`);
      if (res.data.success) {
        setCarData(res.data.docs); // // it stores the car data in the local state (using setCarData), making it available for rendering in your component.
        console.log("Fetched Car Data:", res.data.docs); 
      } else {
        toast.error("Failed to fetch car data.");
      }
    } catch (error) {
      console.error("Error fetching car data:", error); 
      toast.error("Error fetching car data.");
    }
  };

  fetchCarData();
}, [car_uuid]);

  const handleActionClick = (action) => {
    setSelectedAction(action);
    setModalVisible(true);
  };

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      const res = await api.patch(`/car-verification`, {
        account_status: newStatus,
        uuid: carData?.car_uuid,
      });
      if (res.data.success) {
        toast.success(`Car ${newStatus} successfully!`);
      }else{
        toast.error(res.data.message  || "Failed to update car status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100">
      <div className="relative p-8 mx-auto space-y-10 bg-white shadow-md max-w-7xl rounded-2xl">
        {/* Profile Top Right */}
        <div className="flex justify-end">
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="object-cover w-20 h-20 border rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">{carData?.name}</h2>
              <p className="text-sm text-gray-600"> {carData?.gender}</p>
            </div>
          </div>
        </div>

        {/* Document Images Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        
          <div className="p-4 border rounded-xl">
            <h3 className="mb-2 text-lg font-medium">Carte Grise</h3>
            <div className="w-full overflow-hidden bg-gray-200 rounded-lg h-96">
              <img
                src={carData?.cat_doc}
                alt="Carte Grise"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="p-4 border rounded-xl">
            <h3 className="mb-2 text-lg font-medium">Visite Technique</h3>
            <div className="w-full overflow-hidden bg-gray-200 rounded-lg h-96">
              <img
                src={carData?.visite_technique_doc}
                alt="Visite Technique"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          <div className="p-4 border rounded-xl">
            <h3 className="mb-2 text-lg font-medium">Insurance</h3>
            <div className="w-full overflow-hidden bg-gray-200 rounded-lg h-96">
              <img
                src={carData?.insurance_doc}
                alt="Insurance"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>


        {/* Action Buttons */}
        <div className="absolute flex gap-6 right-8">
          <Button
            variant="green"
            onClick={() => handleActionClick("available")}
          >
            Available
          </Button>
          <Button
            variant="accent"
            onClick={() => handleActionClick("rented")}
          >
            Rented
          </Button>
          <Button
            variant="danger"
            onClick={() => handleActionClick("unavailable")}
          >
            Unavailable
          </Button>
        </div>

        {/* Confirmation Modal */}
        {modalVisible && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-sm p-6 space-y-4 bg-white shadow-lg rounded-xl">
              <h2 className="text-lg font-semibold text-gray-800">
                Confirm Action
              </h2>
              <p className="text-sm text-gray-600">
                Are you sure you want to make{" "}
                <span className="font-medium text-primary">{selectedAction}</span> this car?
              </p>
              <div className="flex justify-end gap-3 mt-4">
                <Button
                  onClick={() => setModalVisible(false)}
                  variant="danger"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleStatusChange(selectedAction)}
                  loading={Loading}
                  variant="green"
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
