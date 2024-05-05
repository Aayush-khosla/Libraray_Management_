import React,{useContext,useState} from 'react'
import DataContext from '../context/DataContext'
import { Link } from 'react-router-dom';

const StudentBooks = () => {

    const [selectedTab, setSelectedTab] = useState('yes');
    const {studentRequestData} = useContext(DataContext);
    const issueReqBooks= studentRequestData.filter((item)=>(item.req===1));
    const acceptBooks= studentRequestData.filter((item)=>(item.approve===1));
    const rejectBooks= studentRequestData.filter((item)=>(item.reject===1));
    console.log(issueReqBooks);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="min-h-[41.8rem] bg-gray-800 w-[50rem] text-white">
      <div className="flex flex-col items-center justify-center mt-10 w-full">
        <div className="flex flex-row w-full px-6 justify-between items-center">
          <p className="text-3xl">My Books</p>
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
              {issueReqBooks.length > 0 ? (
                <table className="table w-fit">
                  <thead className="text-white text-2xl text-center">
                    <tr>
                      <th>Issue Id</th>
                      <th>Book Id</th>
                      <th>Book Name</th>
                      <th>Book Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issueReqBooks.map((item) => (
                      <tr>
                        <td>{item.issue_id}</td>
                        <td>{item.book_id}</td>
                        <td>{item.book_name}</td>
                        <td>{item.category}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                "No Books Issue Request"
              )}
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
              Issued Books
            </label>

            <div
              className={`absolute w-[45rem] left-[25%] shadow-lg p-6 border mt-2 border-indigo-300 rounded-lg mx-auto transition-all duration-500 ease-in-out ${
                selectedTab === "no"
                  ? "translate-x-1 opacity-100 visible"
                  : "translate-x-40 opacity-0 invisible"
              }`}
            >
              {
                acceptBooks.length > 0 ? (
                  <table className="table w-fit">
                <thead className="text-white text-xl text-center">
                  <tr>
                    <th>Issue Id</th>
                    <th>Book Id</th>
                    <th>Book Name</th>
                    <th>Book Category</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {acceptBooks.map((item) => (
                    <tr>
                      <td>{item.issue_id}</td>
                      <td>{item.book_id}</td>
                      <td>{item.book_name}</td>
                      <td>{item.category}</td>
                      <td>{item.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
                ) : ("No Issued Books")
              }
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
              {
                rejectBooks.length > 0 ? (
                  <table className="table w-fit">
                <thead className="text-white text-xl text-center">
                  <tr>
                    <th>Issue Id</th>
                    <th>Book Id</th>
                    <th>Book Name</th>
                    <th>Book Category</th>
                    <th>Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {rejectBooks.map((item) => (
                    <tr>
                      <td>{item.issue_id}</td>
                      <td>{item.book_id}</td>
                      <td>{item.book_name}</td>
                      <td>{item.category}</td>
                      <td>{item.comment}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
                )
                :
                ("No Rejected Books")
              }
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default StudentBooks;