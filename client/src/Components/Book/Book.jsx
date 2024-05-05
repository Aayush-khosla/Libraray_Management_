import React from 'react';
import { Link } from 'react-router-dom';

export const Book = ({book}) => {
  return (
    <>
      <Link to={`/${book.id}`}>
        <div className="card w-60 shadow-xl h-96 border-[1px] mx-10 my-4 bg-gray-800">
          <figure>
            <img src={book.cover} alt={book.name} className='w-[140px] h-[140px] pt-5'/>
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {book.name}
            </h2>
            <p>
              {book.desc.length <= 50
                ? book.desc
                : `${book.desc.slice(0, 50)}...`}
            </p>
            <div className="card-actions justify-end">
              <div className="badge badge-outline">{book.category}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

