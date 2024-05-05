import React,{useContext,useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import DataContext from '../context/DataContext';


const Login = () => {

  const [id,setId]=useState("");
  const [password,setPassword]=useState("");
  const [errorMessage,setErrorMessage] = useState(null);
  const {student,admin,setIsAdminLogin,setIsStudentLogin,setLoggedStudent} = useContext(DataContext);
  const navigate=useNavigate();


  const handleAdminLogin = (e)=>{
    e.preventDefault();
    const result = admin.filter((data)=>((data.id).toString()===id)&&(data.password).toString()===password);
    if(!result.length){
      setErrorMessage("Id or Password is Incorrect");
      return;
    }
    setErrorMessage(null);
    setIsAdminLogin(true);
    navigate("/admin");
  }

  const handleStudentLogin = (e)=>{
    e.preventDefault();
    const result = student.filter((data)=>((data.id).toString()===id)&&(data.password).toString()===password);
    if(!result.length){
      setErrorMessage("Id or Password is Incorrect");
      return;
    }
    setErrorMessage(null);
    setIsStudentLogin(true);
    setLoggedStudent(result);
    navigate('/student')
  }

  return (
    <div className="min-h-[41.8rem] bg-gray-800 w-[50rem] text-white">
      <div className="flex flex-col justify-center items-center pt-[4rem] space-y-6 w-full">
        <div className='flex w-full justify-between px-6'>
          <h1 className="text-3xl">Library Management System</h1>
          <Link to='/'><p className='border px-4 py-2 rounded-3xl'>Home</p></Link>
        </div>
        <p className="text-2xl">Admin / Student Login</p>
      </div>
      <form>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center mt-[5rem] space-y-8">
            <label htmlFor="ID" className="hidden">
              Id
            </label>
            <input
              type="text"
              id="ID"
              placeholder="ID"
              className="input input-bordered text-xl h-12 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"
              onChange={(e) => setId(e.target.value)}
              value={id}
            />
            <label htmlFor="Password" className="hidden">
              Password
            </label>
            <input
              type="password"
              id="Password"
              placeholder="Password"
              className="input input-bordered text-xl h-12 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {errorMessage && <p className="text-red-600 pt-6 text-xl">{errorMessage}</p>}
          <div className="mt-10">
            <button
              onClick={handleAdminLogin}
              className="mx-10 border px-10 py-4 rounded-3xl hover:bg-gray-500"
            >
              Admin Login
            </button>
            <button
              onClick={handleStudentLogin}
              className="mx-10 border px-10 py-4 rounded-3xl hover:bg-gray-500"
            >
              Student Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login