const databaseConnection = require("../database");
const Trivia = require("../Model/triviaModel");

const questions = [
    {
        question: "Who wrote '1984'?",
        options: [
            "George Orwell",
            "Aldous Huxley",
            "Ray Bradbury",
            "H.G. Wells"
        ],
        correct: 0,
        hint: "Big Brother is watching you"
    },
    {
        question: "What is the first book in the Harry Potter series?",
        options: [
            "Chamber of Secrets",
            "Prisoner of Azkaban",
            "Sorcerer's Stone",
            "Goblet of Fire"
        ],
        correct: 2,
        hint: "The boy who lived"
    },
    {
        question: "Which author wrote 'The Great Gatsby'?",
        options: [
            "Ernest Hemingway",
            "F. Scott Fitzgerald",
            "John Steinbeck",
            "William Faulkner"
        ],
        correct: 1,
        hint: "The green light at the end of the dock"
    },
    {
        question: "In 'To Kill a Mockingbird', who is the narrator?",
        options: [
            "Atticus Finch",
            "Scout Finch",
            "Jem Finch",
            "Boo Radley"
        ],
        correct: 1,
        hint: "She's the daughter of a lawyer in Maycomb"
    },
    {
        question: "Who wrote 'The Alchemist'?",
        options: [
            "Paulo Coelho",
            "Gabriel García Márquez",
            "Jorge Luis Borges",
            "Isabel Allende"
        ],
        correct: 0,
        hint: "A shepherd boy's journey to find treasure"
    }
];

const seedTrivia = async () => {
    try {
        await databaseConnection();

        await Trivia.deleteMany();

        await Trivia.insertMany(questions);

        console.log("Trivia questions added successfully");

        process.exit();
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

seedTrivia();