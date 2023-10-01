import React from "react";
import { useState } from "react";

function BookCard({ book, handleReviewSubmit, user }) {
  const { Image, Title, Author, pdf } = book;

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
                Reviews: {review.username}: {review.content}
              </li>
            ))}
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
