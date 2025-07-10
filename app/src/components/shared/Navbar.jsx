import {lazy,Suspense,useState} from 'react'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorBoundary';
import { FaBell, FaSearch, FaBars } from 'react-icons/fa';
import SearchBar from '../SearchBar';
import Loading from './Loading';
import PropTypes from 'prop-types';

const Modal = lazy(() => import('../UI/Modal'));

const Navbar = ({toggleMenu}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //handle search
  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Search query: ${e.target.search.value}`);
  }
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* left */}
      <div className="flex-col hidden gap-2 lg:flex">
        <h2 className="text-xl leading-3 text-PrimaryTextColor">Welcome, Ichami!</h2>
        <p className="text-xs text-SecondaryTextColor">Today is a great day for car rental service</p>
      </div>

      {/* menu icon for mobile view */}
      <div className="flex items-center justify-start lg:hidden">
        <button aria-label='open menu' onClick={toggleMenu} className="p-2 rounded-full ring-[1.5px] bg-backgroundColor ring-backgroundColor">
          <FaBars aria-label='open search' className="text-gray-600" size={20} />
        </button>
      </div>

      {/* right */}
      <div className="flex items-center justify-between">
        {/* search bar */}
        <div className="hidden md:flex">
          <SearchBar submitAction={handleSearch} />
        </div>
        {/* mobile search icon */}
        <div className="flex md:hidden items-center p-2 rounded-full ring-[1.5px] bg-backgroundColor ring-backgroundColor">
          <FaSearch onClick={()=>setIsModalOpen(true)} className="text-gray-600" size={16} />
        </div>

        {/* search bar mobile view modal */}
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<Loading />}>
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Search"
            >
              <SearchBar submitAction={handleSearch} button={true}/>
            </Modal>
          </Suspense>
        </ErrorBoundary>
        
        {/* notification and profile icon */}
        <div className="flex items-center justify-center gap-3 md:gap-4">
          <div className="relative">
            <FaBell className="text-2xl text-gray-500" />
            <span className="absolute px-1 text-xs text-white rounded-full -top-1 -right-1 bg-accent">3</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium leading-3">ichami</span>
            <span className="text-SecondaryTextColor text-right text-[10px]">Admin</span>
          </div>
          <img
            src="/logo192.png"
            alt="Profile"
            height={40}
            width={40}
            className="border border-gray-100 rounded-full"
          />
        </div>
      </div>
    </div>
  )
}

Navbar.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
}

export default Navbar