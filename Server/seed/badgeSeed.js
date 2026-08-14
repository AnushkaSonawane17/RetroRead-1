const databaseConnection = require("../database");
const Badge = require("../Model/badgeModel");


const badges = [

    {
        name: "First Reader",
        description: "Read your first book",
        icon: "📖",
        requirementType: "books",
        target: 1
    },

   {
    name: "Bookworm",
    description: "Read 10 books",
    icon: "🐛",
    requirementType: "books",
    target: 10
},

    {
        name: "Streak Master",
        description: "Maintain a 7-day reading streak",
        icon: "🔥",
        requirementType: "streak",
        target: 7
    },

    {
        name: "Book Collector",
        description: "Own 20 books",
        icon: "📚",
        requirementType: "books",
        target: 20
    },

    {
        name: "Reviewer Pro",
        description: "Write 5 reviews",
        icon: "✏️",
        requirementType: "reviews",
        target: 5
    },

    {
        name: "Exchange Expert",
        description: "Complete 10 exchanges",
        icon: "🔄",
        requirementType: "exchanges",
        target: 10
    },

    {
        name: "Trivia Champion",
        description: "Win 5 trivia games",
        icon: "🧠",
        requirementType: "trivia",
        target: 5
    },

    {
        name: "Guess Master",
        description: "Guess 10 books correctly",
        icon: "🎯",
        requirementType: "guessBook",
        target: 10
    }

];


const seedBadges = async () => {

    try {

        await databaseConnection();

        await Badge.deleteMany();

        await Badge.insertMany(badges);

        console.log("Badges added successfully");

        process.exit();

    } catch (err) {

        console.log(err.message);

        process.exit(1);

    }

};


seedBadges();