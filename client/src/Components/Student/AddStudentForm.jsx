import React,{useContext,useState} from 'react'
import DataContext from '../../context/DataContext';
import axios from 'axios';
import CorrectPopup from '../CorrectPopup';
import { Link } from 'react-router-dom';

const AddStudentForm = () => {

  const [id,setId] = useState('');
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const {setStudent,correctStatus,setCorrectStatus} = useContext(DataContext);
  console.log("Hello");

  const handleNewStudentSubmit = async(e)=>{
    e.preventDefault();
    const newStudent={id:id,name:name,email:email,password:password};

    try {
      await axios.post("http://localhost:8800/addstudent" , newStudent );
      const studentData=await axios.get("http://localhost:8800/loginS");
      setStudent(studentData.data);
      setId('');
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log(error.message);
    }finally{
      setCorrectStatus(true);
    }

  }

  return (
    <div className="min-h-[41.8rem] bg-gray-800 w-[50rem] text-white">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex flex-row w-full justify-between items-center mt-10 px-6">
            <p className="text-3xl">Add Student Data</p>
            <Link to='/'><p className='border px-4 py-2 rounded-3xl'>Home</p></Link>
            {
              correctStatus && <CorrectPopup/>
            }
          </div>
          <div className="flex flex-col justify-center items-center space-y-12">
            <label htmlFor="ID" className='hidden'>Id</label>
            <input 
              id="ID" 
              onChange={(e) => setId(e.target.value)} 
              value={id} 
              placeholder='ID'
              className="input input-bordered text-xl h-12 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"  
            />
            <label htmlFor="Name" className='hidden'>Name</label>
            <input
              id="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Name'
              className="input input-bordered text-xl h-12 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"
            />
            <label htmlFor="Email" className='hidden'>Email</label>
            <input
              id="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder='Email'
              className="input input-bordered text-xl h-12 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"
            />
            <label htmlFor="Password" className='hidden'>Password</label>
            <input
              id="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder='Password'
              className="input input-bordered text-xl h-12 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"
            />
            <button onClick={handleNewStudentSubmit} className='mx-10 border px-10 py-4 rounded-3xl hover:bg-gray-500'>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddStudentForm