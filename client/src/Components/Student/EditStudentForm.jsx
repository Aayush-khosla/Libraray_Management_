import React, { useState, useContext, useEffect } from 'react';
import DataContext from '../../context/DataContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const EditStudentForm = ({studentEditId}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { setStudent, student, setStudentEdit,setEditStatus } = useContext(DataContext);
    const studentDetail = student.find((data) => ((data.id)=== studentEditId));
    console.log(studentDetail);
    console.log(studentEditId);
    console.log(studentDetail);
  
    useEffect(() => {
      if (studentDetail) {
        setName(studentDetail.name);
        setEmail(studentDetail.email);
        setPassword(studentDetail.password);
      }
    }, [studentEditId]);
  
    const handleEditStudentSubmit = async (e) => {
      e.preventDefault();
  
      const newStudent = { name:name, email:email, password:password};
  
      try {
        await axios.put(`http://localhost:8800/student/${studentEditId}`, newStudent);
        const studentData = await axios.get("http://localhost:8800/loginS");
        setStudent(studentData.data);
        setStudentEdit(false);
        setName('');
        setEmail('');
        setPassword('');
        navigate(`/`);
      } catch (error) {
        console.log(error.message);
      }finally{
        setEditStatus(true);
      }
    };
  
    return (
      <div className="min-h-[41.8rem] bg-gray-800 w-[50rem] text-white">
        <form>
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-row w-full justify-between px-6 items-center mt-10">
              <p className="text-3xl">Edit Student Data</p>
              <Link to='/'><p className='border px-4 py-2 rounded-3xl'>Home</p></Link>
            </div>
            <div className="flex flex-col justify-center items-center space-y-12">
              <label htmlFor="Name" className="hidden">
                Name
              </label>
              <input
                id="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="input input-bordered text-xl h-12 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"
              />
              <label htmlFor="Email" className="hidden">
                Email
              </label>
              <input
                id="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="input input-bordered text-xl h-12 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"
              />
              <label htmlFor="Password" className="hidden">
                Password
              </label>
              <input
                id="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="input input-bordered text-xl h-12 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"
              />
              <button
                onClick={handleEditStudentSubmit}
                className="mx-10 border px-10 py-4 rounded-3xl hover:bg-gray-500"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    );
}

export default EditStudentForm