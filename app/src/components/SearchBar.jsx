import PropTypes from 'prop-types'
import React, { lazy, Suspense, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './shared/ErrorBoundary'
import { FaSearch } from 'react-icons/fa'
import Loading from './shared/Loading'

const Button = lazy(() => import('./UI/Button'));

const SearchBar = ({submitAction, button = false}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
return (
    <form onSubmit={submitAction}>
        <div className="flex items-center gap-4">
        <div className="flex items-center w-[200px] lg:w-[300px] p-2 rounded-full ring-[1.5px] bg-backgroundColor ring-backgroundColor">
                <FaSearch className="text-gray-200" size={16} />
                <input
                type="text"
                placeholder="Search"
                onChange={(e) => e.target.value}
                required
                name="search"
                className="w-full ml-2 text-sm bg-transparent text-SecondaryTextColor focus:outline-none"
                />
        </div>
        {button && (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Loading />}>
                <Button ariaLabel='search' type='submit' variant="secondary" onClick={() => setIsModalOpen(false)}>
                Search
                </Button>
            </Suspense>
            </ErrorBoundary>
        )}
        </div>
    </form>
)
}
SearchBar.propTypes = {
    submitAction: PropTypes.func.isRequired,
    button: PropTypes.bool,
}

export default SearchBar