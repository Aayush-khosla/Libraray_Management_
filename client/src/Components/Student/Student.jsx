import React from 'react';

import { Link } from 'react-router-dom';

const Student = ({data}) => {

  return (
    <tr className='text-xl text-center mx-10 '>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>
        <Link to={`/studentData/${data.id}`}><p className="mx-10 border px-7 py-2 rounded-3xl hover:bg-gray-500">Details</p></Link>
      </td>
    </tr>
  );
}

export default Student