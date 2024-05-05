import React,{useContext} from 'react';
import DataContext from '../../context/DataContext';
import AdminUser from './AdminUser';
import { Link } from 'react-router-dom';


const Admins = () => {

    const {admin} =useContext(DataContext);

  return (
    <div className="min-h-[41.8rem] bg-gray-800 w-[50rem] text-white">
      <div className="my-16 mx-6 flex justify-between px-6 items-center ">
        <p className="text-3xl">Admins Data</p>
        <Link to='/'><p className='border px-4 py-2 rounded-3xl'>Home</p></Link>
      </div>
      <div className="overflow-x-auto flex justify-center items-center mt-10">
        <table className="table w-fit">
          <thead className="text-white text-2xl text-center">
              <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {admin.map((data) => (
              <AdminUser key={data.id} data={data} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admins