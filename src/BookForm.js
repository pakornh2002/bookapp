import React, { useState } from 'react';

const BookForm = () => {
    const [book, setBook] = useState({ id: '', title: '', author: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>ID:</label>
                <input type="text" name="id" value={book.id} onChange={handleChange} />
            </div>
            <div>
                <label>Title:</label>
                <input type="text" name="title" value={book.title} onChange={handleChange} />
            </div>
            <div>
                <label>Author:</label>
                <input type="text" name="author" value={book.author} onChange={handleChange} />
            </div>
            <button type="submit">Add Book</button>
        </form>
    );
};

export default BookForm;
