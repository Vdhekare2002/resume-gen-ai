const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // ✅ no extra options
        console.log("DB Connected ✅");
    } catch (error) {
        console.error("DB Connection Failed:", error);
        process.exit(1);
    }
};

module.exports = connectToDB;