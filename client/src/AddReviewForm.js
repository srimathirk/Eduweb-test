// AddReviewForm.js

import React, { useState } from 'react';

const AddReviewForm = ({ onAddReview }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReview(content);
    setContent(''); // Reset content after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your review..."
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddReviewForm;
