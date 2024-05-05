import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import DataContext from '../context/DataContext'

const Header = () => {

  const {isAdminLogin,isStudentLogin} = useContext(DataContext);

  return (
    <div className="flex flex-row justify-between items-center pt-2">
      <h3 className="text-3xl px-6">Library Management System</h3>
      <Link to="/login">
        <button className="text-2xl font-light bg-gray-800 text-white mx-6 border px-4 py-4 rounded-3xl hover:bg-gray-500">
          {isAdminLogin ? "Admin" : isStudentLogin ? "Student" : "Login"}
        </button>
      </Link>
    </div>
  );
}

export default Header