import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config();

// Mongoose Schema for Book (MongoDB Collection)
const BookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please enter book title"]
        },
        author: {
            type: String,
            required: [true, "Please enter book author"]
        },
        publishedDate: {
            type: Date,
            required: [true, "Please enter published date"]
        },
        pages: {
            type: Number,
            required: [true, "Please enter number of pages"]
        }

    },
    {
        timestamps: true
    }
)

const Book = mongoose.model("Book", BookSchema);
export default Book;



