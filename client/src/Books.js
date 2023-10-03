import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
function Books({ user }) {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);

  // console.log(user)
  useEffect(() => {
    fetch(`/books`)
      .then((r) => r.json())
      .then((books) => {
        setBooks(books);
      });

    fetch("/books/reviews")
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  console.log(user);
  console.log(books)
  console.log(reviews)

  function handleAddReviews(newReviews) {
    setReviews([...reviews, newReviews]);
  }

  const handleReviewsSubmit = (bookId, content) => {
    // Implement logic to make a POST request to add a reviews for the specified bookId
    fetch(`/books/${bookId}/add_review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book_id: bookId, content }),
    })
      .then((response) => response.json())
      .then((newReview) => {
        console.log("Reviews added successfully:", newReview);

        handleAddReviews(newReview);
      })
      .catch((error) => {
        console.error("Error adding reviews:", error);
      });
  };

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <BookCard
              book={book}
              onAddReviews={handleReviewsSubmit}
              user={user}
              reviews={reviews.filter((review) => review.book_id === book.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
