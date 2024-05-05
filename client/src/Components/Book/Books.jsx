import React, { useContext } from 'react';
import { Book } from './Book';
import DataContext from '../../context/DataContext';
import { Link } from 'react-router-dom';

const Books = () => {

  const {books,isAdminLogin} = useContext(DataContext);
    
  return (
    <div className='min-h-[41.8rem] bg-gray-800 w-[50rem] text-white'>
      <div className='flex flex-col justify-center items-center w-full'>
        {isAdminLogin && 
          <div className='flex w-full justify-between items-center px-6'>
              <p className='text-3xl pt-6 px-10'>Books Data</p>
              <Link to='/'><p className='border px-4 py-2 rounded-3xl'>Home</p></Link>
          </div>}
        <p className='text-2xl pt-4 px-10'>Available Books</p>
      </div>
      <div className="books flex flex-row pt-10 flex-wrap justify-center items-center">
        {
          books.map((book)=>(<Book key={book.id} book={book}/>))
        }
      </div>
    </div>
  )
}

export default Books