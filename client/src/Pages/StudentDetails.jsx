import React,{useContext} from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';
import axios from 'axios';
import Missing from './Missing';

const StudentDetails = () => {

    const {id} = useParams();

    const {setStudentEdit,setStudentEditId,setStudent,student,setDeleteStatus}=useContext(DataContext);

    const data=student.filter((item)=>((item.id).toString()===id));
    const navigate = useNavigate();
    // console.log(data);

    const handleEditStudent=()=>{
        setStudentEdit(true);
        setStudentEditId(data[0].id);
    }

    const handleDeleteStudent= async ()=>{
        try {
          await axios.delete(`http://localhost:8800/student/${data[0].id}`);
        const studentData= await axios.get("http://localhost:8800/loginS");
        setStudent(studentData.data);
      } catch (error) {
          console.log(error.message);
      }finally{
          navigate('/');
          setDeleteStatus(true);

        }
    }


  return (
    <>
      {data && (
        <div className="min-h-[41.8rem] bg-gray-800 w-[50rem] text-white">
          <div className="mt-10 flex justify-between px-6 items-center text-3xl">
            <p>Student Details</p>
            <Link to='/'><p className='border px-4 py-2 rounded-3xl'>Home</p></Link>
          </div>
          <div className="flex flex-col justify-center items-center my-10">
            <table className="table w-fit border">
              <tbody className="text-center">
                <tr>
                  <th className="text-2xl">University ID</th>
                  <td className="text-xl">{data[0].id}</td>
                </tr>
                <tr>
                  <th className="text-2xl">Name</th>
                  <td className="text-xl">{data[0].name}</td>
                </tr>
                <tr>
                  <th className="text-2xl">Email</th>
                  <td className="text-xl">{data[0].email}</td>
                </tr>
                <tr>
                  <th className="text-2xl">Password</th>
                  <td className="text-xl">{data[0].password}</td>
                </tr>
                <tr>
                  <th className="text-2xl">Book Limit</th>
                  <td className="text-xl">{data[0].booklimit}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='flex justify-center items-center'>
            <Link to="/editStudent">
              <button onClick={handleEditStudent} className='mx-10 border px-7 py-2 rounded-3xl hover:bg-gray-500'>Edit Student</button>
            </Link>
            <button onClick={handleDeleteStudent} className='mx-10 border px-7 py-2 rounded-3xl hover:bg-gray-500'>Delete Student</button>
          </div>
        </div>
      )}
      {!data && <Missing />}
    </>
  );
}

export default StudentDetails