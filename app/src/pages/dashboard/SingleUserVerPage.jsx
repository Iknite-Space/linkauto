import React, { useState,useEffect } from "react";
import Button from "../../components/UI/Button";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import api from "../../services/axios";

export default function SingleUserVerification() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null); 
  const [userData, setUserData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const { user_uuid } = useParams();
  useEffect(() => {
    const fetchUserData = async () => {
      const res = await api.get(`/user-verification/${user_uuid}`);
      if (res.data.success) {
        setUserData(res.data.user)
      }
    }

    fetchUserData();
  },[user_uuid]);

  const handleActionClick = (action) => {
    setSelectedAction(action);
    setModalVisible(true);
  };

  const handleStatusChange = async (newStatus) => {
    setLoading(true);
    try {
      const res = await api.patch(`/user-verification`, {
        account_status: newStatus,
        uuid: userData?.user_uuid,
      });
      if (res.data.success) {
        toast.success(`User ${newStatus} successfully!`);
      }else{
        toast.error(res.data.message  || "Failed to update user status.");
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
              <h2 className="text-xl font-semibold">{userData?.name}</h2>
              <p className="text-sm text-gray-600"> {userData?.gender}</p>
            </div>
          </div>
        </div>

        <h4>Verification Type: <span className="text-accent">{userData?.verification_type}</span></h4>

        {/* Document Images Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Document Front */}
          <div className="p-4 border rounded-xl">
            <h3 className="mb-2 text-lg font-medium">Front Side</h3>
            <div className="w-full overflow-hidden bg-gray-200 rounded-lg h-96">
              <img
                src={userData?.ver_doc1_url}
                alt="Document Front"
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Document Back */}
          <div className="p-4 border rounded-xl">
            <h3 className="mb-2 text-lg font-medium">Back Side</h3>
            <div className="w-full overflow-hidden bg-gray-200 rounded-lg h-96">
              <img
                src={userData?.ver_doc2_url}
                alt="Document Back"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>


        {/* Action Buttons */}
        <div className="absolute flex gap-4  right-8">
          <Button
            className="bg-green "
            onClick={() => handleActionClick("active")}
          >
            Activate
          </Button>
          <Button
            className="bg-red "
            onClick={() => handleActionClick("blocked")}
          >
            Block
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
                Are you sure you want to{" "}
                <span className="font-medium text-blue-600">{selectedAction}</span> this user?
              </p>
              <div className="flex justify-end gap-3 mt-4">
                <Button
                  className="text-gray-800 bg-red hover:bg-gray-500"
                  onClick={() => setModalVisible(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="text-white bg-green hover:bg-blue-700"
                  onClick={() => handleStatusChange(selectedAction)}
                  loading={Loading}
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
