// src/pages/dashboard/SingleVerPage.jsx

import React, { useState } from "react";
import { CheckCircle, XCircle, LoaderCircle } from "lucide-react";
import Button from "../../components/UI/Button";

export default function SingleVerPage() {
  const [status, setStatus] = useState("active"); // "active" | "blocked" | "pending"
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null); // "active" | "blocked"

  const handleActionClick = (action) => {
    setSelectedAction(action);
    setModalVisible(true);
  };

  const confirmAction = () => {
    if (selectedAction) {
      setStatus(selectedAction);
      setModalVisible(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-10 relative">
        {/* Profile Top Right */}
        <div className="flex justify-end">
          <div className="flex items-center gap-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="w-20 h-20 object-cover rounded-full border"
            />
            <div>
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-sm text-gray-600">Gender: Male</p>
            </div>
          </div>
        </div>

        {/* Document Images Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Document Front */}
          <div className="rounded-xl border p-4">
            <h3 className="text-lg font-medium mb-2">Document Front</h3>
            <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/800x500"
                alt="Document Front"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Document Back */}
          <div className="rounded-xl border p-4">
            <h3 className="text-lg font-medium mb-2">Document Back</h3>
            <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="https://via.placeholder.com/800x500"
                alt="Document Back"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex justify-center mt-6">
          {status === "active" && (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Status: Activated</span>
            </div>
          )}
          {status === "blocked" && (
            <div className="flex items-center gap-2 text-red-600">
              <XCircle className="w-5 h-5" />
              <span className="font-semibold">Status: Blocked</span>
            </div>
          )}
          {status === "pending" && (
            <div className="flex items-center gap-2 text-yellow-600">
              <LoaderCircle className="w-5 h-5 animate-spin" />
              <span className="font-semibold">Status: Pending</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-6 right-8 flex gap-4">
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
          <Button
            className="bg-accent "
            onClick={() => setStatus("pending")}
          >
            Pending
          </Button>
        </div>

        {/* Confirmation Modal */}
        {modalVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Confirm Action
              </h2>
              <p className="text-sm text-gray-600">
                Are you sure you want to{" "}
                <span className="font-medium text-blue-600">{selectedAction}</span> this user?
              </p>
              <div className="flex justify-end gap-3 mt-4">
                <Button
                  className="bg-red text-gray-800 hover:bg-gray-500"
                  onClick={() => setModalVisible(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-green text-white hover:bg-blue-700"
                  onClick={confirmAction}
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
