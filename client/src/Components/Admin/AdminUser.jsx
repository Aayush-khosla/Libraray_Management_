import React,{useContext} from 'react';
import DataContext from '../../context/DataContext';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

const AdminUser = ({data}) => {


    const {setAdminEdit,setadminEditId,setAdmin,setDeleteStatus} = useContext(DataContext);
    const navigate=useNavigate();


    const handleAdminEdit = ()=>{
        setAdminEdit(true);
        setadminEditId(data.id);
    }

    const handleAdminDelete = async()=>{
        try {
            await axios.delete(`http://localhost:8800/admin/${data.id}`);
        const adminData = await axios.get("http://localhost:8800/loginA");
        setAdmin(adminData.data);
        } catch (error) {
            console.log(error.message);
        }finally{
          navigate('/');
          setDeleteStatus(true);
        }
    }
  return (
    <tr className='text-xl text-center mx-10 '>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>{data.password}</td>
      <td>
        <Link to="/editAdmin">
          <p onClick={handleAdminEdit} className='mx-2 border px-7 py-2 rounded-3xl hover:bg-gray-500'>Edit Admin</p>
        </Link>
      </td>
      <td>
        <p onClick={handleAdminDelete} className='mx-2 border px-7 py-2 rounded-3xl hover:bg-gray-500'>Delete Admin</p>
      </td>
    </tr>
  );
}

export default AdminUser