import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import Modal from './UI/Modal';
import api from '../services/axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';


const PaymentConfirmation = ({ref}) => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(async ()=>{
            try {
                const res = await api.get(`/reservation/${ref}`);
                if(res.data.success){
                    console.log("Payment status:", res.data.status);
                    if(res.data.status === "SUCCESSFUL"){
                        clearInterval(interval);
                        toast.success("Payment confirmed successfully!");
                        localStorage.removeItem("reservationData"); // Clear reservation data after successful payment initiation
                        setTimeout(() => {
                            navigate("/"); // Redirect to home page after confirmation
                        },5000)
                    } else if(res.data.status === "FAILED"){
                        clearInterval(interval);
                        toast.error("Payment failed and reservation cancelled. Please try again.");
                        setTimeout(() => {
                            setIsOpen(false);
                            window.location.reload(); // Reload the page to reset state
                        },5000)
                    }
                }
                
            } catch (error) {
                console.error("Error checking payment status:", error);        
            }
        },10000) // keep checking for payment status every 10 seconds
        return () => clearInterval(interval); // Clear interval on unmount
           
    }, [isOpen, navigate]);
  return (
    <Modal isOpen={isOpen} btnx={false} btn={false} onClose={() => setIsOpen(false)} title="Payment Confirmation">
        <div className="text-center">
            <h2 className="mb-4 text-lg font-semibold">Confirm Your Payment</h2>
            <p className="mb-6 text-sm text-gray-600">Please complete your payment to finalize the reservation.</p>
            <div className='text-center'>
                <img src='/loader.gif' alt='Loading...'className='w-10 h-10 mx-auto mb-4'/>
                <p className='text-sm font-medium'>wating...</p>
            </div>
        </div>
    </Modal>
  )
}
PaymentConfirmation.propTypes = {
    ref: PropTypes.string.isRequired,
};

export default PaymentConfirmation