import React, { useState, useEffect,useContext } from 'react';
import DataContext from '../context/DataContext';

const IssueRequestPopup = () => {
  const [showAlert, setShowAlert] = useState(true);

  const {setCorrectStatus} = useContext(DataContext);
  useEffect(() => {
    // After 2 seconds, hide the alert by updating state
    const timeout = setTimeout(() => {
      setShowAlert(false);
      setCorrectStatus(false);
    }, 2000);

    // Clear the timeout to prevent memory leak
    // setCorrectStatus
    return () => clearTimeout(timeout);
  }, []); // The empty dependency array ensures that this effect runs only once after the initial render


  return (
    <div id='alert-container' className={`absolute right-1 transform transition-transform duration-500 ease-in-out ${showAlert ? 'translate-x-0' : 'translate-x-full'}`}>
      <div id='alert' role="alert" className="alert alert-success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Successfully Issued!!!</span>
      </div>
    </div>
  );
}

export default IssueRequestPopup