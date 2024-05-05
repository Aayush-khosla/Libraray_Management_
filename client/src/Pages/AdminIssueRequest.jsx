import React,{useContext, useEffect, useState} from 'react'
import DataContext from '../context/DataContext'
import axios from "axios";
import { Link } from 'react-router-dom';


const AdminIssueRequest = () => {

    const [selectedTab, setSelectedTab] = useState('yes');
    const {adminStudentReqData,setAdminStudentReqData,adminApprovedData,setAdminApprovedData,adminRejectedData,setAdminRejectedData} = useContext(DataContext);
    console.log(adminStudentReqData);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
      };

      useEffect(()=>{

        const fetchData = async()=>{
            try {
                const allAdminStuReq =await axios.get(`http://localhost:8800/issued`);
                console.log(allAdminStuReq.data);
                setAdminStudentReqData(allAdminStuReq.data);
                const allApproveData = await axios.get("http://localhost:8800/admin/approve");
                setAdminApprovedData(allApproveData.data);
                const allRejectData = await axios.get("http://localhost:8800/admin/reject");
                setAdminRejectedData(allRejectData.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();

      },[])
  return (
    
    <div className="min-h-[41.8rem] bg-gray-800 w-[50rem] text-white">
      <div className="flex flex-col items-center justify-center mt-10 w-full">
        <div className="flex justify-between px-6 items-center w-full">
          <p className="text-3xl">Books Request Data</p>
          <Link to='/'><p className='border px-4 py-2 rounded-3xl'>Home</p></Link>
        </div>
        <ul className="mx-auto grid max-w-full w-full grid-cols-3 gap-x-5 px-8">
          <li className="space-y-8">
            <input
              className="peer sr-only"
              type="radio"
              value="yes"
              name="answer"
              id="yes"
              checked={selectedTab === "yes"}
              onChange={() => handleTabChange("yes")}
            />
            <label
              className={`flex justify-center cursor-pointer rounded-full border border-gray-300 py-2 px-4 hover:bg-gray-500 focus:outline-none ${
                selectedTab === "yes"
                  ? "peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-indigo-500"
                  : ""
              } transition-all duration-500 ease-in-out`}
              htmlFor="yes"
            >
              Issue Request
            </label>

            <div
              className={`absolute w-[45rem] left-[25%] shadow-lg p-6 border mt-2 border-indigo-300 rounded-lg mx-auto transition-all duration-500 ease-in-out ${
                selectedTab === "yes"
                  ? "translate-x-1 opacity-100 visible"
                  : "translate-x-40 opacity-0 invisible"
              }`}
            >
              {adminStudentReqData.length>0 ? (
                <table className="table w-fit relative left-12">
                  <thead className="text-white text-xl text-center">
                    <tr>
                      <th>Issue Id</th>
                      <th>Book Name</th>
                      <th>Student Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminStudentReqData.map((item) => (
                      <tr key={item.issue_id}>
                        <td>{item.issue_id}</td>
                        <td>{item.book_name}</td>
                        <td>{item.student_name}</td>
                        <td><Link to={`/adminIssuePage/${item.issue_id}`}><p className='border px-4 py-2 rounded-3xl'>Details</p></Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : ("No New Requests")}
            </div>
          </li>

          <li className="space-y-8">
            <input
              className="peer sr-only"
              type="radio"
              value="no"
              name="answer"
              id="no"
              checked={selectedTab === "no"}
              onChange={() => handleTabChange("no")}
            />
            <label
              className={`flex justify-center cursor-pointer rounded-full border border-gray-300 py-2 px-4 hover:bg-gray-500 focus:outline-none ${
                selectedTab === "no"
                  ? "peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-indigo-500"
                  : ""
              } transition-all duration-500 ease-in-out`}
              htmlFor="no"
            >
              Approved Books
            </label>

            <div
              className={`absolute w-[45rem] left-[25%] shadow-lg p-6 border mt-2 border-indigo-300 rounded-lg mx-auto transition-all duration-500 ease-in-out ${
                selectedTab === "no"
                  ? "translate-x-1 opacity-100 visible"
                  : "translate-x-40 opacity-0 invisible"
              }`}
            >
              {adminApprovedData.length>0 ? (
                <table className="table w-fit relative left-12">
                  <thead className="text-white text-[15px] text-center">
                    <tr>
                      <th>Issue Id</th>
                      <th>Book Id</th>
                      <th>Book Name</th>
                      <th>Student Name</th>
                      <th>Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminApprovedData.map((item) => (
                      <tr key={item.issue_id}>
                        <td>{item.issue_id}</td>
                        <td>{item.book_id}</td>
                        <td>{item.book_name}</td>
                        <td>{item.student_name}</td>
                        <td>{item.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : ("No Books Approved")}
            </div>
          </li>

          <li className="space-y-8">
            <input
              className="peer sr-only"
              type="radio"
              value="something"
              name="answer"
              id="something"
              checked={selectedTab === "something"}
              onChange={() => handleTabChange("something")}
            />
            <label
              className={`flex justify-center cursor-pointer rounded-full border border-gray-300 py-2 px-4 hover:bg-gray-500 focus:outline-none ${
                selectedTab === "something"
                  ? "peer-checked:border-transparent peer-checked:ring-2 peer-checked:ring-indigo-500"
                  : ""
              } transition-all duration-500 ease-in-out`}
              htmlFor="something"
            >
              Rejected Books
            </label>

            <div
              className={`absolute w-[45rem] left-[25%] shadow-lg p-6 border mt-2 border-indigo-300 rounded-lg mx-auto transition-all duration-500 ease-in-out ${
                selectedTab === "something"
                  ? "translate-x-1 opacity-100 visible"
                  : "translate-x-40 opacity-0 invisible"
              }`}
            >
              {adminRejectedData.length > 0 ? (
                <table className="table w-fit relative left-12">
                  <thead className="text-white text-[15px] text-center">
                    <tr>
                      <th>Issue Id</th>
                      <th>Book Id</th>
                      <th>Book Name</th>
                      <th>Student Name</th>
                      <th>Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminRejectedData.map((item) => (
                      <tr key={item.issue_id}>
                        <td>{item.issue_id}</td>
                        <td>{item.book_id}</td>
                        <td>{item.book_name}</td>
                        <td>{item.student_name}</td>
                        <td>{item.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : ("No Rejected Books")}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminIssueRequest