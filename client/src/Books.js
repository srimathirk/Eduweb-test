import React,{ useEffect, useState }  from 'react';
import BookCard from "./BookCard";
function Books({user}) {
  
  const [books, setBooks] = useState([]);

  const [content, setContent] = useState('');
// console.log(user)
    useEffect(() => {
      fetch(`/books`)
      .then((r) => r.json())
      .then((books) => {
        setBooks(books);
    
      });
  }, []);

  console.log(user)
  function handleReviewSubmit(bookId) {
    
    fetch('/add_review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: user.id, book_id: bookId, content: content }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        setContent('');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  
  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <BookCard book={book} handleReviewSubmit={handleReviewSubmit} user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
