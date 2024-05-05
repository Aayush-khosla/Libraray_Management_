import React,{useContext} from 'react'
import { useParams,useNavigate, Link } from 'react-router-dom'
import DataContext from '../context/DataContext'
import Missing from './Missing';
import axios from 'axios';



const BookDetails = () => {
    const {books,isAdminLogin,isStudentLogin,setBooks,setBookEdit,setBookEditId,setDeleteStatus,loggedStudent,studentRequestData,setStudentRequestData,setCorrectStatus} = useContext(DataContext);
    const {id} = useParams();
    const bookDetail = books.find((book)=>((book.id).toString()===id));
    const navigate = useNavigate();

    const handleBookEdit = () =>{
        setBookEdit(true);
        setBookEditId(id);
    }

    const handleBookDelete = async ()=>{
        try {
          await axios.delete(`http://localhost:8800/books/${id}`);
          const booksData=await axios.get("http://localhost:8800/book");
          setBooks(booksData.data);
      } catch (error) {
        console.log(error.message);
      }finally{
        navigate("/");
        setDeleteStatus(true);
        }
    }


    const handleIssueRequest= async()=>{
      const isAnyPastRequest = studentRequestData.filter((item)=>((item.student_id)==loggedStudent[0].id && (item.book_id)==id));
      console.log(isAnyPastRequest);
      if(isAnyPastRequest.length==0){
        try {
          const requestObject = {bookid:id,studentid:loggedStudent[0].id,req:1,approve:0,reject:0,comment:""};
          await axios.post(`http://localhost:8800/addissue_req`,requestObject);
          const requestStudent = await axios.get(`http://localhost:8800/studentReq/${loggedStudent[0].id}`)
          setStudentRequestData(requestStudent.data);
        } catch (error) {
          console.log(error);
        }finally{
          setCorrectStatus(true);
          navigate('/');
        }
      }
      else{
        alert("Issue Request already sent")
      }
    }

  return (
    <div className="min-h-[41.8rem] bg-gray-800 w-[50rem] text-white">
      <div className="flex flex-col justify-center items-center pt-8 px-6 w-full">
        <div className="flex flex-row w-full px-6 justify-between items-center py-6">
          <p className="text-2xl">My Books</p>
          <Link to='/'><p className='border px-4 py-2 rounded-3xl'>Home</p></Link>
        </div>
        {bookDetail && (
          <div className="card lg:card-side shadow-xl bg-gray-800">
            <figure>
              <img
                src={bookDetail.cover}
                alt={bookDetail.name}
                className='w-96'
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{bookDetail.name}</h2>
              <p className='pt-6 pb-2'>{bookDetail.category}</p>
              <p className='max-w-lg'>{bookDetail.desc}</p>
              <div className="card-actions justify-end">
                {
                    isAdminLogin && 
                    <div>
                        <Link to="/editBook"><button onClick={handleBookEdit} className='mx-4 border px-10 py-4 rounded-3xl hover:bg-gray-500'>Edit Book</button></Link>
                        <button onClick={handleBookDelete} className='mx-4 border px-10 py-4 rounded-3xl hover:bg-gray-500'>Delete Book</button>
                    </div>
                }
                {
                    !isAdminLogin && isStudentLogin &&
                    <div>
                        <button className='mx-4 border px-10 py-4 rounded-3xl hover:bg-gray-500' onClick={handleIssueRequest}>Issue Request</button>
                    </div>
                }
              </div>
            </div>
          </div>
        )}
        {!bookDetail && <Missing />}
      </div>
    </div>
  );
}

export default BookDetails