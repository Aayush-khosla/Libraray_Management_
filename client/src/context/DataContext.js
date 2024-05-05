import { createContext,useState,useEffect } from "react";
import axios from "axios";

const DataContext = createContext({});

export const DataProvider = ({children})=>{
    const [isAdminLogin,setIsAdminLogin]=useState(false);
    const [isStudentLogin,setIsStudentLogin]=useState(false);

    const [admin,setAdmin] = useState([]);
    const [student,setStudent]=useState([]);
    const [books,setBooks] = useState([]);

    const [studentEdit,setStudentEdit] = useState(false);
    const [studentEditId,setStudentEditId] = useState("");

    const [adminEdit,setAdminEdit] = useState(false);
    const [adminEditId,setadminEditId] = useState("");

    const [bookEdit,setBookEdit] = useState(false);
    const [bookEditId,setBookEditId] = useState("");

    const [loggedStudent,setLoggedStudent] = useState([]);

    const [correctStatus,setCorrectStatus] = useState(false);
    const [editStatus,setEditStatus] = useState(false);
    const [deleteStatus,setDeleteStatus] = useState(false);

    const [studentRequestData,setStudentRequestData] = useState([]);
    const [adminStudentReqData,setAdminStudentReqData] = useState([]);
    const [adminApprovedData,setAdminApprovedData]=useState([]);
    const [adminRejectedData,setAdminRejectedData]=useState([]);

    useEffect(()=>{
        
        const fetchAllData= async()=>{
            try{
                const studentData= await axios.get("http://localhost:8800/loginS");
                setStudent(studentData.data);
                const adminData = await axios.get("http://localhost:8800/loginA");
                setAdmin(adminData.data);
                const booksData=await axios.get("http://localhost:8800/book");
                setBooks(booksData.data);
                if(loggedStudent){
                    const requestStudent = await axios.get(`http://localhost:8800/studentReq/${loggedStudent[0].id}`)
                    console.log(requestStudent.data);
                    setStudentRequestData(requestStudent.data);
                }
            }catch(err){
                console.log(err);
            }
        }
        fetchAllData();
    },[setAdmin,setBooks,setStudent,setStudentRequestData,loggedStudent,isAdminLogin,setIsAdminLogin])

    return(
        <DataContext.Provider value={{
            admin,setAdmin,student,setStudent,books,setBooks,isAdminLogin,setIsAdminLogin,isStudentLogin,setIsStudentLogin,studentEdit,setStudentEdit,studentEditId,setStudentEditId,adminEdit,setAdminEdit,adminEditId,setadminEditId,loggedStudent,setLoggedStudent,bookEdit,setBookEdit,bookEditId,setBookEditId,correctStatus,setCorrectStatus,editStatus,setEditStatus,deleteStatus,setDeleteStatus,studentRequestData,setStudentRequestData,adminStudentReqData,setAdminStudentReqData,adminApprovedData,setAdminApprovedData,adminRejectedData,setAdminRejectedData
        }}>
        {children}
        </DataContext.Provider>
    )
}

export default DataContext;