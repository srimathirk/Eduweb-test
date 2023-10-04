import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
function Books({ user }) {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);
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

  function handleAddReviews(newReview) {
    setReviews([...reviews, newReview]);
    //map thr books looking for bookid and add new review
    const modifiedBooks = books.map((book) => {
      if (book.id === newReview.book_id) {
        book.reviews.push(newReview);
        return book;
      } else {
        return book;
      }
    });
    setBooks(modifiedBooks);
  }
  function handleAddRatings(newRatings) {
    setRatings([...ratings, newRatings]);
    const modifiedBooks = books.map((book) => {
      if (book.id === newRatings.book_id) {
        book.ratings.push(newRatings);
        return book;
      } else {
        return book;
      }
    });
    setBooks(modifiedBooks);
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

  const handleRatingsSubmit = (bookId, value) => {
    // Implement logic to make a POST request to add a reviews for the specified bookId
    fetch(`/books/${bookId}/add_rating`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ book_id: bookId, value }),
    })
      .then((response) => response.json())
      .then((newRatings) => {
        console.log("Ratings added successfully:", newRatings);

        handleAddRatings(newRatings);
      })
      .catch((error) => {
        console.error("Error adding ratings:", error);
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
              onAddRatings={handleRatingsSubmit}
              user={user}
              reviews={reviews.filter((review) => review.book_id === book.id)}
              ratings={ratings.filter((rating) => rating.book_id === book.id)}
/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
