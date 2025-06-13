"use client";
import apiClient from "@/lib/ApiClient";
// import cancelSubscription from "@/lib/payments/subscription/cancelSubscription";
import React, { useState } from "react";

export default function CancelButton({ sub_id }: { sub_id: string }) {
  const [showModal, setShowModal] = useState(false);

  const handleCancel = async () => {
    await apiClient.post("/subscription/cancel/" + sub_id, {});
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="bg-red-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-red-600 transition duration-300 my-2 mx-auto cursor-pointer"
      >
        Cancel subscription
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="mb-6">
              Do you really want to cancel your subscription?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition cursor-pointer"
              >
                No
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition cursor-pointer"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
