import React, { useState, useContext, useEffect } from 'react';
import DataContext from '../../context/DataContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const EditBookForm = ({bookEditId}) => {
  const [name, setName] = useState('');
  const [cover, setCover] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const { setBooks,books,setBookEdit,setEditStatus} = useContext(DataContext);
  const bookDetail = books.find((book) => ((book.id).toString() === bookEditId));
  console.log(bookDetail);

  useEffect(() => {
    if (bookDetail) {
      setName(bookDetail.name);
      setCover(bookDetail.cover);
      setDesc(bookDetail.desc);
      setCategory(bookDetail.category);
    }
  }, [bookDetail]);

  const handleEditBookSubmit = async (e) => {
    e.preventDefault();

    const newBook = { name:name, cover:cover, desc:desc, category:category };

    try {
      await axios.put(`http://localhost:8800/books/${bookEditId}`, newBook);
      const booksData = await axios.get("http://localhost:8800/book")
      setBooks(booksData.data);
      setBookEdit(false);
      navigate(`/`);
    } catch (error) {
      console.log(error.message);
    }finally{
      setEditStatus(true);
    }
  };

  return (
    <div className="min-h-[41.8rem] bg-gray-800 w-[50rem] text-white">
      <form>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex w-full justify-between px-6 items-center mt-10">
            <p className="text-3xl">Edit Book Form</p>
            <Link to='/'><p className='border px-4 py-2 rounded-3xl'>Home</p></Link>
          </div>
          <div className="flex flex-col justify-center items-center space-y-8">
            <label htmlFor="Name" className="hidden">
              Name
            </label>
            <input
              id="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="input input-bordered text-xl h-12 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"
            />
            <label htmlFor="Cover" className="hidden">
              Cover Link
            </label>
            <input
              id="Cover"
              onChange={(e) => setCover(e.target.value)}
              value={cover}
              className="input input-bordered text-xl h-12 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"
            />
            <label htmlFor="Desc" className="hidden">
              Description
            </label>
            <textarea
              id="Desc"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              className="input input-bordered text-xl h-28 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"
            ></textarea>
            <label htmlFor="Category" className="hidden">
              Category
            </label>
            <input
              id="Category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="input input-bordered text-xl h-12 w-[40rem] font-semibold bg-slate-600 text-white border focus:border-white"
            />
            <button
              onClick={handleEditBookSubmit}
              className="mx-10 border px-10 py-4 rounded-3xl hover:bg-gray-500"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBookForm;
