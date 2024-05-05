import React, { useContext, useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import DataContext from '../context/DataContext';
import Missing from './Missing';
import axios from 'axios';

const AdminIssueRequestDetail = () => {

    const {adminStudentReqData} = useContext(DataContext);
    const {id} = useParams();
    const allData=adminStudentReqData.filter((item)=>(item.issue_id).toString()===id);
    console.log(allData);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isApproveComment,setIsApproveComment] = useState(false);
    const [isRejectComment,setIsRejectComment] = useState(false);
    const navigate=useNavigate();
    const studentLimit = allData[0].booklimit;
    const bookInStock = allData[0].noofbook;
    const issueId=allData[0].issue_id;

    
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
      setPopupOpen(false);
    };
    
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    
    const handleSubmit =async () => {
        closePopup();
        if(inputValue!=="" && isApproveComment){
            try {
                const data = {comment:inputValue};
                await axios.put(`http://localhost:8800/approve/${issueId}`,data);
                const data2={id:allData[0].student_id}
                await axios.put(`http://localhost:8800/booklimit`,data2);
                const data3 = {id:allData[0].book_id};
                await axios.put(`http://localhost:8800/noofbook`,data3);
            } catch (error) {
                console.log(error);
            }finally{
                setInputValue('');
                setIsApproveComment(false);
                navigate('/');
            }
        }
        else if(inputValue!=="" && isRejectComment){
            try {
                const data = {comment:inputValue};
                await axios.put(`http://localhost:8800/reject/${issueId}`,data);
            } catch (error) {
                console.log(error);
            }finally{
                setInputValue('');
                setIsRejectComment(false);
                navigate('/');
            }
        }
        else{
        alert("Please Enter Some Comment");
    }
  };


    const handleApproveRequest = ()=>{
        if(studentLimit > 0 && bookInStock > 0){
            openPopup();
            setIsApproveComment(true);
        }
    }

    const handleRejectRequest = async()=>{
        openPopup();
        setIsRejectComment(true);
    }


  return (
    <div className='relative'>
        {isPopupOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
          <div className="bg-white p-8 rounded shadow-lg z-20 w-[30rem]">
            <h2 className="text-lg font-semibold mb-4">Enter Comment</h2>
            <input
              type="text"
              className="border border-gray-300 p-2 w-full mb-4"
              placeholder="Enter value"
              value={inputValue}
              onChange={handleInputChange}
            />
            <div className="flex justify-end space-x-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                onClick={closePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {allData && (
        <>
          <div className="min-h-[41.8rem] bg-gray-800 w-[50rem] text-white">
            <div className="flex flex-col items-center justify-center pt-10">
              <div>
                <p className="text-2xl">Student Issue Request Details</p>
              </div>
              <div className="flex flex-col items-center justify-center mt-10 space-y-4">
                <div>
                    <p className='text-xl'>Student Data</p>
                </div>
                <table className="table w-fit border">
                  <tbody className="text-white text-xl text-center">
                    <tr>
                        <td>University Id</td>
                        <td>{allData[0].student_id}</td>
                    </tr>
                    <tr>
                        <td>Student Name</td>
                        <td>{allData[0].student_name}</td>
                    </tr>
                    <tr>
                        <td>Student Email Id</td>
                        <td>{allData[0].email}</td>
                    </tr>
                    <tr>
                        <td>Issue Limit</td>
                        <td>{allData[0].booklimit}</td>
                    </tr>
                  </tbody>
                </table>
                <div>
                    <p className='text-xl'>Book Data</p>
                </div>
                <table className="table w-fit border">
                  <tbody className="text-white text-xl text-center">
                    <tr>
                        <td>Book Id</td>
                        <td>{allData[0].book_id}</td>
                    </tr>
                    <tr>
                        <td>Book Name</td>
                        <td>{allData[0].book_name}</td>
                    </tr>
                    <tr>
                        <td>Book Category</td>
                        <td>{allData[0].category}</td>
                    </tr>
                    <tr>
                        <td>Book In Stock</td>
                        <td>{allData[0].noofbook}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='flex justify-center items-center mt-10'>
                <p className='border px-4 py-2 rounded-3xl mx-4 cursor-pointer' onClick={handleApproveRequest}>Approve Request</p>
                <p className='border px-4 py-2 rounded-3xl mx-4 cursor-pointer' onClick={handleRejectRequest}>Reject Request</p>
              </div>
            </div>
          </div>
        </>
      )}
      {!allData && <Missing />}
    </div>
  );
}

export default AdminIssueRequestDetail