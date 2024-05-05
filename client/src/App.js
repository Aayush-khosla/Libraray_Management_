import {
  Route,
  Routes
} from "react-router-dom";
import { useContext } from "react";
import DataContext from "./context/DataContext";
import './App.css'
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Missing from "./Pages/Missing";
import User from './Pages/User';
import BookDetails from "./Pages/BookDetails";
import Footer from "./Components/Footer";
import Admins from "./Components/Admin/Admins";
import Students from "./Components/Student/Students";
import Books from "./Components/Book/Books";
import EditStudentForm from "./Components/Student/EditStudentForm";
import EditBookForm from "./Components/Book/EditBookForm";
import EditAdminForm from "./Components/Admin/EditAdminForm";
import StudentDetails from "./Pages/StudentDetails";
import AddAdminForm from "./Components/Admin/AddAdminForm";
import AddBookForm from "./Components/Book/AddBookForm";
import AddStudentForm from "./Components/Student/AddStudentForm";
import StudentBooks from "./Pages/StudentBooks";
import AdminIssueRequest from "./Pages/AdminIssueRequest";
import AdminIssueRequestDetail from "./Pages/AdminIssueRequestDetail";

function App() {

  const {isAdminLogin,isStudentLogin,studentEdit,studentEditId,adminEdit,adminEditId,bookEdit,bookEditId} = useContext(DataContext);

  return (
   <div className="flex flex-col justify-center items-center">
        <Routes>
          <Route path="/" element={isAdminLogin ? <Admin/> : isStudentLogin ? <User/> : <Home/>}/>
          <Route path="/login" element={isAdminLogin ? <Admin/> : isStudentLogin ? <User/> : <Login/> } />
          <Route path="/admin" element={isAdminLogin ? <Admin/> : <Missing/>} />
          <Route path='/addStudent' element={isAdminLogin ? <AddStudentForm/> : <Missing/>}/>
          <Route path="/addBook" element={isAdminLogin ? <AddBookForm/> : <Missing/>}/>
          <Route path="/addAdmin" element={isAdminLogin ? <AddAdminForm/> : <Missing/>}/>
          <Route path="/studentData" element={isAdminLogin ? <Students/> : <Missing/>} />
          <Route path="/bookData" element={isAdminLogin ? <Books/> : <Missing/>} />
          <Route path="/adminData" element={isAdminLogin ? <Admins/> : <Missing/>} />
          <Route path="/studentData/:id" element={isAdminLogin ? <StudentDetails/> : <Missing/>}/>
          <Route path="/adminIssuePage" element={isAdminLogin ? <AdminIssueRequest/> : <Missing/> }/>
          <Route path="/adminIssuePage/:id" element={isAdminLogin ? <AdminIssueRequestDetail/> : <Missing/> }/>
          <Route path="/editStudent" element={isAdminLogin && studentEdit ? <EditStudentForm studentEditId={studentEditId}/> : <Missing/>}/>
          <Route path="/editBook" element={isAdminLogin && bookEdit ? <EditBookForm bookEditId={bookEditId}/> : <Missing/>}/>
          <Route path="/editAdmin" element={isAdminLogin && adminEdit ? <EditAdminForm adminEditId={adminEditId}/> : <Missing/>}/>
          <Route path="/student" element={isStudentLogin ? <User/> : <Missing/>} />
          <Route path="/myBooks" element={isStudentLogin && !isAdminLogin ? <StudentBooks/> : <Missing/>}/>
          <Route path='/:id' element={<BookDetails/>}/>
        </Routes>
        <Footer/>
   
   </div>
  );
}

export default App;
