import { useState } from "react";

function NewBookForm({ onAddBook }) {
  const [Author, setAuthor] = useState("");
  const [Title, setTitle] = useState("");
  const [Image, setImage] = useState("");
  const [pdf, setpdf] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Author: Author,
        Title: Title,
        Image: Image,
        pdf: pdf,
      }),
    })
      .then((r) => r.json())
      .then((newBook) => {
        onAddBook(newBook);
        // Reset form fields to their initial values
        setAuthor("");
        setTitle("");
        setImage("");
        setpdf("");
      });
  }

  return (
    <div className="new-book-form">
      <h2>New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Author"
          placeholder="Book Author"
          value={Author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          type="text"
          name="Title"
          placeholder="Book Title"
          value={Title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="Image"
          placeholder="Image URL"
          value={Image}
          onChange={(e) => setImage(e.target.value)}
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
