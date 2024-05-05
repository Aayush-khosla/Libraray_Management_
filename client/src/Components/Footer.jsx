import React from 'react'

const Footer = () => {

    const today = new Date();

  return (
    <div className='pt-8 bg-gray-800 text-white w-[50rem] text-center'>
        <p>Copyright &copy; {today.getFullYear()}</p>
    </div>
  )
}

export default Footer