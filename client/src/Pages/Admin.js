import React,{useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import DataContext from '../context/DataContext'
import EditPopup from '../Components/EditPopup';
import DeletePopup from '../Components/DeletePopup';


const Admin = () => {

  const {setIsAdminLogin,student,admin,books,editStatus,deleteStatus} = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout = ()=>{
    setIsAdminLogin(false);
    navigate('/');
  }

  return (
    <div className="min-h-[41.8rem] bg-gray-800 w-[50rem] text-white">
      <div className="flex flex-col justify-center items-center pt-[2rem] space-y-6">
        <div className="flex flex-row justify-center items-center">
          <h3 className="text-3xl">Library Management System</h3>
          {editStatus && <EditPopup />}
          {deleteStatus && <DeletePopup />}
        </div>
        <h4 className="text-2xl">Welcome Admin</h4>
      </div>
      <div className="flex flex-col justify-center items-center">
        <ul className="flex flex-row justify-center items-center space-x-2 mt-16 text-lg">
          <Link to="/">
            <li className="border px-4 py-2 rounded-3xl">Home</li>
          </Link>
          <Link to="/addStudent">
            <li className="border px-4 py-2 rounded-3xl">Add Student</li>
          </Link>
          <Link to="/addBook">
            <li className="border px-4 py-2 rounded-3xl">Add Book</li>
          </Link>
          <Link to="/addAdmin">
            <li className="border px-4 py-2 rounded-3xl">Add Admin</li>
          </Link>
          <Link to="/adminIssuePage">
            <li className="border px-4 py-2 rounded-3xl">Issue Requests</li>
          </Link>
          <button
            onClick={handleLogout}
            className="border px-4 py-2 rounded-3xl"
          >
            Log out
          </button>
        </ul>
      </div>
      <div className="flex flex-row justify-center items-center pt-28 flex-wrap space-x-14">
        <div className="w-fit flex flex-col justify-center items-center space-y-6 border px-8 py-4 rounded-xl">
          <p className="text-2xl">Total Students</p>
          <p className="text-xl">{student.length}</p>
          <Link to="/studentData">
            <p className="border px-4 py-2 rounded-3xl">Student Details</p>
          </Link>
        </div>
        <div className="w-fit flex flex-col justify-center items-center space-y-6 border px-8 py-4 rounded-xl">
          <p className="text-2xl">Total Books</p>
          <p className="text-xl">{books.length}</p>
          <Link to="/bookData">
            <p className="border px-4 py-2 rounded-3xl">Book Details</p>
          </Link>
        </div>
        <div className="w-fit flex flex-col justify-center items-center space-y-6 border px-8 py-4 rounded-xl">
          <p className="text-2xl">Total Admin</p>
          <p className="text-xl">{admin.length}</p>
          <Link to="/adminData">
            <p className="border px-4 py-2 rounded-3xl">Admin Details</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Admin