import React,{useContext} from 'react'
import DataContext from '../../context/DataContext'
import Student from './Student';
import { Link } from 'react-router-dom';


const Students = () => {

    const {student} = useContext(DataContext);

  return (
    <div className="min-h-[41.8rem] bg-gray-800 w-[50rem] text-white">
      <div className="my-16 mx-6 flex justify-between items-center">
        <p className="text-3xl">Students Data</p>
        <Link to='/'><p className='border px-4 py-2 rounded-3xl'>Home</p></Link>
      </div>
      <div className="overflow-x-auto flex justify-center items-center mt-10">
        <table className="table w-fit">
          <thead className='text-white text-2xl text-center'>
            <tr>
              <th>University Id</th>
              <th>Name</th>
              <th>Email Id</th>
            </tr>
          </thead>
          <tbody>
            {student.map((data) => (
              <Student key={data.id} data={data} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students