import {useState} from 'react'
import {useUser} from '../../hooks/UseAuth'
import Modal from '../../components/UI/Modal'
import { Link } from 'react-router-dom';

const Home = () => {
  const [isOpen, setIsOpen] = useState(true);
  const onClose = () => setIsOpen(false);
  const {currentUser} = useUser()
  console.log(currentUser)

  if (currentUser.status === "pending" && currentUser.role !== "admin") {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Account Verification Pending" btnx={false} btn={false}>
        {/* Modal content for pending verification */}
        <div className="text-center">
          <p className="mb-6 text-secondary">
            Your account is currently pending verification. Please click the button below to upload verification documents.
          </p>
          <div className="flex justify-between gap-4">
            <Link to="/dashboard/user-ver-doc-form"
              className="px-4 py-2 text-white rounded-md bg-primary hover:bg-primary"
              title='Click to upload verification documents'
              aria-label='Upload verification documents'
            >
              Upload Verification Documents
            </Link>
            <Link to='/dashboard/logout' className='px-4 py-2 text-white rounded-md bg-red' title='logout'>Logout</Link>
          </div>
        </div>
      </Modal>
    )
  }
  return (
    <div>Hello {currentUser.lName}! stay tune your analytic dashboard is on it way</div>
  )
}

export default Home