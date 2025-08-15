import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";
import { toast } from "react-toastify";

export default function Payment() {
  const navigate = useNavigate();

  const [reservationData, setReservationData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [paymentDetails, setPaymentDetails] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Load reservation data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("reservationData");
    if (storedData) {
      setReservationData(JSON.parse(storedData));
    } else {
      navigate("/"); // If no data, redirect back
    }
  }, [navigate]);

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    // Mobile number validation
    let phone;
    if (paymentMethod === "momo") {
        let phone = paymentDetails.phone?.replace(/\s+/g, ""); // remove all spaces
        const phoneRegex = /^6\d{8}$/; // starts with 6 and 9 digits total
        if (!phoneRegex.test(phone)) {
          alert("Mobile number must start with 6 and be exactly 9 digits.");
          return;
        }
        paymentDetails.phone = phone; // store cleaned number
    }

    setIsProcessing(true);
    setPaymentStatus(null);

    const description = paymentDetails.description || "Payment for reservation";
    const amount = reservationData.rental_amount.toString();
    const number = paymentDetails.phone;

    paymentDetails.amount_paid = Number(reservationData.rental_amount);
    paymentDetails.payment_method = paymentMethod;
    delete paymentDetails.description;
    delete paymentDetails.phone;
    paymentDetails.rental_uuid = "";
    paymentDetails.reference = "";
    paymentDetails.status = "";

    const payload = {
      phone: number, // string
      // amount,
      amount: "100",
      description,
      reservationDetails: { ...reservationData },
      paymentDetails, // amount_paid as numeric
    };
    console.log(payload)

    try {
      const res = await api.post("/reservation", payload);
      console.log("Payment initiated:", res.data);
      if(res.data.success){
        localStorage.removeItem("reservationData"); // Clear reservation data after successful payment initiation
        toast.success("Payment initiated successfully. Please confirm your payment.");
      }
      
    } catch (error) {
      console.error("Payment processing error:", error);
      setIsProcessing(false);
      setPaymentStatus("error");
      return;  
    }finally{
      setIsProcessing(false);
    }

    // try {
    //   // Send data to backend
    //   const response = await fetch("/api/process-payment", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(payload),
    //   });

    //   if (!response.ok) throw new Error("Failed to initiate payment");

    //   // Simulate waiting for payment confirmation
    //   let countdown = 30;
    //   const interval = setInterval(async () => {
    //     countdown--;

    //     // Poll backend for payment status
    //     const statusRes = await fetch(`/api/payment-status?reservationId=${reservationData.id}`);
    //     const statusData = await statusRes.json();

    //     if (statusData.status === "success") {
    //       clearInterval(interval);
    //       setIsProcessing(false);
    //       setPaymentStatus("success");
    //       navigate("/confirmation");
    //     } else if (countdown <= 0) {
    //       clearInterval(interval);
    //       setIsProcessing(false);
    //       setPaymentStatus("timeout");
    //     }
    //   }, 1000);

    // } catch (err) {
    //   console.error(err);
    //   setIsProcessing(false);
    //   setPaymentStatus("error");
    // }
  };

  return (
    <div className="max-w-lg p-6 mx-auto mt-10">
      <h1 className="mb-4 text-2xl font-bold">Complete Your Payment</h1>

      {reservationData && (
        <div className="p-4 mb-4 border rounded bg-gray-50">
          <h2 className="font-semibold">Reservation Summary</h2>
          <p>Start: {reservationData. start_date} at {reservationData.pickup_time}</p>
          <p>End: {reservationData. end_date} at {reservationData.dropoff_time}</p>
          <p>Total: <strong>${reservationData.rental_amount}</strong></p>
        </div>
      )}

      <form onSubmit={handlePayment} className="space-y-4">
        <div>
          <label className="block font-medium">Payment Method</label>
          <select
            className="w-full p-2 border rounded"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="card">Credit/Debit Card</option>
            <option value="momo">Mobile Money</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>

        {/* Dynamic Fields */}
        {paymentMethod === "card" && (
          <>
            <input type="text"name="cardNumber" placeholder="Card Number"className="w-full p-2 border rounded"
              onChange={handlePaymentChange}
              required
            />
            <div className="grid grid-cols-2 gap-2">
              <input type="text" name="expiry"placeholder="MM/YY"className="p-2 border rounded"
              onChange={handlePaymentChange}
              required/>
              <input type="text" name="cvv" placeholder="CVV"className="p-2 border rounded"
                onChange={handlePaymentChange}
                required/>
            </div>
          </>
        )}

        {paymentMethod === "momo" && (
          <>
            <input type="text"name="phone"placeholder="Mobile Money Number e.g: 654573923"className="w-full p-2 border rounded"
            onChange={handlePaymentChange}
            required/>
            <textarea name="description" className="w-full p-2 border rounded" placeholder="Description"
            onChange={handlePaymentChange}></textarea>
          </>
        )}

        {paymentMethod === "bank" && (
          <>
            <input
              type="text"
              name="accountNumber"
              placeholder="Account Number"
              className="w-full p-2 border rounded"
              onChange={handlePaymentChange}
              required
            />
            <input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              className="w-full p-2 border rounded"
              onChange={handlePaymentChange}
              required
            />
          </>
        )}

        <button
          type="submit"
          className="w-full py-2 text-white rounded bg-primary"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>

      {/* Status Messages */}
      {isProcessing && (
        <div className="mt-4 text-sm text-center text-gray-600">
          Please confirm your payment... Waiting for confirmation
        </div>
      )}
      {paymentStatus === "timeout" && (
        <div className="mt-4 text-center text-red-500">
          Payment confirmation timed out. Please try again.
        </div>
      )}
      {paymentStatus === "error" && (
        <div className="mt-4 text-center text-red-500">
          Something went wrong. Please try again.
        </div>
      )}
    </div>
  );
}
