import React,{useContext} from 'react';
import { useNavigate,Link } from 'react-router-dom';
import DataContext from '../context/DataContext';
import IssueRequestPopup from './IssueRequestPopup';

const StudentNavbar = () => {

    const {setIsStudentLogin,loggedStudent,setLoggedStudent,correctStatus} = useContext(DataContext);
    const navigate = useNavigate();

    const handleLogout = ()=>{
        setIsStudentLogin(false);
        setLoggedStudent([]);
        navigate('/');
    }
    console.log(loggedStudent)
  return (
    <div className=" bg-gray-800 w-[50rem] text-white">
      <div className='flex flex-col justify-center items-center w-full'>
        <div className="flex flex-row pt-2 w-full justify-center">
          <h4 className="text-3xl px-4">Library Management System</h4>
          {
            correctStatus && <IssueRequestPopup/>
          }
        </div>
          <p className="text-xl px-4 pt-6">Welcome {loggedStudent[0].name}</p>
        <div className='flex justify-center items-center mt-6'>
          <ul className='flex justify-center items-center'>
            <Link to="/myBooks"><li className='mx-4 border px-10 py-4 rounded-3xl hover:bg-gray-500'>My Books</li></Link>
            <li onClick={handleLogout} className='mx-4 border px-10 py-4 rounded-3xl hover:bg-gray-500'>Log Out</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StudentNavbar