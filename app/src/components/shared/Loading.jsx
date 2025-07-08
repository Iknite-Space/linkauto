import React from 'react'

const Loading = () => {
return (
    <div className='flex flex-1 justify-center items-center h-screen'>
        <div className='text-center'>
            <img
                src='/loader.gif'
                alt='Loading...'
                className='mx-auto mb-4 w-10 h-10'
            />
            <p className='text-lg font-medium'>Loading...</p>
        </div>
    </div>
)
}

export default Loading