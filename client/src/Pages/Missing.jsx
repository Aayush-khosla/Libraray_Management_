import React from 'react';
import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <div className="min-h-[41.8rem] bg-gray-800 w-[50rem] text-white ">
      <div className='flex flex-col justify-center items-center pt-16 space-y-8'>
        <h2 className='text-3xl'>Page Not Found</h2>
        <p className='text-2xl'>Well that's disappointing.</p>
        <p className='mx-10 border px-10 py-4 rounded-3xl hover:bg-gray-500'>
          <Link to="/">Visit Our Homepage</Link>
        </p>
      </div>
    </div>
  );
}

export default Missing;