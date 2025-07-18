import { useState } from 'react'
import Modal from '../../components/UI/Modal'
import Button from '../../components/UI/Button';
import { auth, signOut } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLogout = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setIsOpen(false);
            navigate('/'); // Redirect to login page after logout
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    }
  return (
    <Modal
      title="Logout"
      isOpen={isOpen}
        onClose={() => setIsOpen(false)}
    >
      <div className="flex flex-col gap-2">
        <p>Are you sure you want to logout?</p>
        <Button
        loading={loading}
        ariaLabel='logout'
        variant="danger"
        className='w-1/4'
        onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </Modal>
  )
}

export default Logout