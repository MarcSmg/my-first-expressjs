import express from 'express';
import mongoose from 'mongoose';

import setupSwagger from './swagger.js';

import Book from './models/book.model.js';
import { getAllNotes, getNote, createNote, updateNote, deleteNote } from './database.js';

import dotenv from 'dotenv'

dotenv.config();

const port = process.env.PORT || 3000;
const mongo_url = process.env.MONGO_URL;

const app = express();
app.use(express.json());

// MongoDB Connection

mongoose.connect(mongo_url).then (() => {
    console.log("Connected to database");
})
.catch ((e) => {
    console.log("Connection failed : ", e);
})
;

// MongoDB Book Endpoints

/**
 * @swagger
 * /api/books/
 *  post:
 *   summary: Create a new book
 *   description: Create a new book
 *   responses:
 *    201:
 *     description: Book created successfully

 * 
 * 
 */
app.post('/api/books/', async (req, res) => {

    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error : "+ error });
    }
})

app.get('/api/books/', async (req, res) => {
    try {
        const books = await Book.find({});
        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error : "+ error });
    }
})

app.get('/api/book/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error : "+ error });
    }
})

app.put('/api/book/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        const updatedBook = await Book.findById(id);
        res.status(200).json(updatedBook);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error : "+ error });
    }
});

app.delete('/api/book/:id', async (req, res) =>  {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error : "+ error });
    }

});

// MySQL Notes Endpoints

app.post('/api/note', async (req, res) => {
    try {
        const {title, content} = req.body;
        const note = await createNote(title, content);
        res.status(201).json(note)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error : "+ error})
    }
})

app.get('/api/notes', async (req, res) => {
    try {
        const notes = await getAllNotes();
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error : "+ error });
    }
})

app.get('/api/note/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const note = await getNote(id);
        res.status(200).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error : "+ error});
    }
})

app.put('/api/note/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const {title, content} = req.body;
        const note = await updateNote(id, title, content);
        res.status(200).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error : " + error)
    }
})

app.delete('/api/note/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteNote(id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error : " + error})
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    setupSwagger(app, port);
})