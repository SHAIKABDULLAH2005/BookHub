const mongoose =require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: ['Fiction', 'Non-Fiction', 'Science', 'Biography', 'Technology', 'Other'],
        default: 'Fiction'
    },
    publicationYear: {
        type: Number,
        min: 1000,
        max: new Date().getFullYear()
    },
    isbn: {
        type: String,
        unique: true
    },
    price: {
        type: Number,
        min:0
    },
    stock: {
        type: Number,
        default: 1,
        min: 0
    },
    description: String,
    coverImage: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, { timestamps: true});

module.exports = mongoose.model('Book', bookSchema);