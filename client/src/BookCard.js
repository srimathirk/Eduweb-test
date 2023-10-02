import React from "react";
import { useState } from "react";

function BookCard({ book, handleReviewSubmit, user }) {
  const { Image, Title, Author, pdf } = book;
  // console.log(book)
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleReviewSubmit(book.id, content);
    setContent(""); // Reset the content after submitting
  };

  const openPdfInNewTab = () => {
    const newWindow = window.open(pdf, "_blank");
    if (newWindow) {
      newWindow.opener = null;
    }
  };
  function addingReviewRating(reviews, ratings) {
    const data = [];

    for (let i = 0; i < reviews.length; i++) {
      for (let j = 0; j < ratings.length; j++) {
        if (reviews[i].username === ratings[j].username) {
          // console.log(reviews[i],ratings[j])
          // console.log(reviews[i].content,ratings[j].value)
          // console.log({review: reviews[i].content, rating: ratings[j].value , username: reviews[i].username})
          data.push({
            review: reviews[i].content,
            rating: ratings[j].value,
            username: reviews[i].username,
          });
        }
      }
    }

    return data;
  }
  return (
    <div className="grid-wrapper">
      <div className="image" onClick={openPdfInNewTab}>
        <img src={Image} alt={Title} />
      </div>
      <div className="content">
        <div className="Title" style={{ color: "darkred", fontWeight: "bold" }}>
          Title: {Title}
        </div>
        <div>
          <div
            className="author"
            style={{ color: "darkblue", fontWeight: "bold" }}
          >
            Author: {Author}
          </div>
          <ul>
            {book.reviews.map((review, index) => (
              <li key={index}>
                User({review.username})- Review: {review.content}
              </li>
            ))}
          </ul>
          <ul>
            {book.ratings.map((rating, index) => (
              <li key={index}>
                User({rating.username})- Ratings: {rating.value}
              </li>
            ))}
          </ul>
          <ul>
            {addingReviewRating(book.reviews, book.ratings).map(
              (data, index) => {
                // console.log(data);
                return (
                  <li key={index}>
                    rating:{data.rating} review:{data.review} username:{data.username}
                  </li>
                );
              }
            )}
          </ul>
          <button onClick={() => handleReviewSubmit(book.id)}>
            Add Review
          </button>
          <form onSubmit={handleSubmit}>
            <label>
              Review Content:
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </label>
            <button type="submit">Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
