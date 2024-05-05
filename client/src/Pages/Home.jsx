import React from 'react'
import Books from '../Components/Book/Books';
import Header from '../Components/Header';
const Home = () => {

  return (
    <div className='bg-gray-800 text-white w-[50rem] flex flex-col'>
        <Header/>
        <Books/>
    </div>
  )
}

export default Home