import { useState } from "react";

function NewBookForm({ onAddBook, isAdmin }) {
  const [author, setauthor] = useState("");
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [pdf, setpdf] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if(!isAdmin){
      alert("You do not have permission to add book ")
    }
    fetch("/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: author,
        title: title,
        image: image,
        pdf: pdf,
      }),
    })
      .then((r) => r.json())
      .then((newBook) => {
        onAddBook(newBook);
        // Reset form fields to their initial values
        setauthor("");
        settitle("");
        setimage("");
        setpdf("");
      });
  }

  return (
    <div className="new-book-form">
      <h2>New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="author"
          placeholder="Book author"
          value={author}
          onChange={(e) => setauthor(e.target.value)}
        />
        <input
          type="text"
          name="title"
          placeholder="Book title"
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <input
          type="text"
          name="image"
          placeholder="image URL"
          value={image}
          onChange={(e) => setimage(e.target.value)}
        />
        <input
          type="text"
          name="pdf"
          placeholder="pdf URL"
          value={pdf}
          onChange={(e) => setpdf(e.target.value)}
        />
        {/* <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        /> */}
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default NewBookForm;
