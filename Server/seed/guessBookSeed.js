const databaseConnection = require("../database");
const GuessBook = require("../Model/guessBookModel");

const books = [
    {
        title: "Atomic Habits",
        author: "James Clear",
        emoji: "⚛️",
        clue: "Small changes, big results"
    },
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        emoji: "🟢",
        clue: "The green light at the end of the dock"
    },
    {
        title: "1984",
        author: "George Orwell",
        emoji: "👁️",
        clue: "Big Brother is watching"
    },
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        emoji: "🏜️",
        clue: "A shepherd's journey to find treasure"
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        emoji: "💐",
        clue: "It is a truth universally acknowledged"
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        emoji: "🧙",
        clue: "An unexpected journey"
    }
];

const seedGuessBooks = async () => {
    try {
        await databaseConnection();

        await GuessBook.deleteMany();

        await GuessBook.insertMany(books);

        console.log("Guess the Book questions added successfully");

        process.exit();
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

seedGuessBooks();