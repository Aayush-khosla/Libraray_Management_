import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';
import DataContext from '../../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';

const EditAdminForm = ({adminEditId}) => {
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
  
    const {setAdmin,admin,setEditStatus} = useContext(DataContext);
    console.log("Hello")
    const adminDetails = admin.find((data)=>((data.id)===adminEditId));
    const navigate = useNavigate();

    useEffect(()=>{
        if(adminDetails){
            setName(adminDetails.name);
            setPassword(adminDetails.password);
        }
    },[adminDetails])
  
    const handleNewAdminEdit = async (e)=>{
      e.preventDefault();
      const newAdmin = {name:name,password:password}
  
      try {
          await axios.put(`http://localhost:8800/admin/${adminEditId}`,newAdmin)
          const allAdmin =await axios.get("http://localhost:8800/loginA")
          setAdmin(allAdmin.data);
          setName('');
          setPassword('');
          navigate('/')
      } catch (error) {
          console.log(error.message);
      }finally{
        setEditStatus(true);
      }
    }
  
    return (
      <div className="min-h-[41.8rem] bg-gray-800 w-[50rem] text-white">
        <form>
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex justify-between px-6 items-center mt-10 w-full">
              <p className="text-3xl">Edit Admin Form</p>
              <Link to='/'><p className='border px-4 py-2 rounded-3xl'>Home</p></Link>
            </div>
            <div className="flex flex-col justify-center items-center mt-[3rem] space-y-12">
              <label htmlFor="Name" className="hidden">
                Name
              </label>
              <input
                id="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="input input-bordered text-xl h-12 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"
              />
              <label htmlFor="Password" className="hidden">
                Password
              </label>
              <input
                type='password'
                id="Pawword"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="input input-bordered text-xl h-12 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"
              />
              <button onClick={handleNewAdminEdit} className='mx-10 border px-10 py-4 rounded-3xl hover:bg-gray-500'>Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
}

export default EditAdminForm