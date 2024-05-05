import React,{useState,useContext} from 'react';
import axios from 'axios';
import DataContext from '../../context/DataContext';
import CorrectPopup from '../CorrectPopup';
import { Link } from 'react-router-dom';

const AddAdminForm = () => {

  const [id,setId] = useState('');
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");

  const {setAdmin,correctStatus,setCorrectStatus} = useContext(DataContext);
  // console.log("Hello")

  const handleNewAdminSubmit = async (e)=>{
    e.preventDefault();
    const newAdmin = {id:id,name:name,password:password}

    try {
        await axios.post('http://localhost:8800/addadmin',newAdmin)
        const allAdmin =await axios.get("http://localhost:8800/loginA")
        setAdmin(allAdmin.data);
        setId('');
        setName('');
        setPassword('');
    } catch (error) {
        console.log(error.message);
    }finally{
      setCorrectStatus(true);
    }
  }

  return (
    <div className="min-h-[41.8rem] bg-gray-800 w-[50rem] text-white">
      <form>
        <div className='flex flex-col justify-center items-center w-full'>
          <div className='flex w-full justify-between px-6 items-center mt-10'>
            <p className='text-3xl'>Add Admin Form</p>
            <Link to='/'><p className='border px-4 py-2 rounded-3xl'>Home</p></Link>
            {
              correctStatus && <CorrectPopup/>
            }
          </div>
          <div className="flex flex-col justify-center items-center mt-[3rem] space-y-12">
            <label htmlFor="ID" className="hidden">
              ID
            </label>
            <input
              id="ID"
              onChange={(e) => setId(e.target.value)}
              value={id}
              placeholder="ID"
              className="input input-bordered text-xl h-12 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"
            />
            <label htmlFor="Name" className="hidden">
              Name
            </label>
            <input
              id="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="Name"
              className="input input-bordered text-xl h-12 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"
            />
            <label htmlFor="Password" className="hidden">
              Password
            </label>
            <input
              type='password'
              id="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              className="input input-bordered text-xl h-12 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"
            />
            <button
              onClick={handleNewAdminSubmit}
              className='mx-10 border px-10 py-4 rounded-3xl hover:bg-gray-500'
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddAdminForm