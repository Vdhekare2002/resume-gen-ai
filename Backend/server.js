require("dotenv").config();

const app = require("./src/App");
const connectToDB = require("./src/config/database");
const { resumeText, selfDescription, jobDescription } = require("./src/services/temp");
const generateInterviewReport = require("./src/services/ai.service");

connectToDB();

(async () => {
    try {
        console.log("AI calling start 🚀");

        const result = await generateInterviewReport({
            resumeText,
            selfDescription,
            jobDescription
        });

        console.log("FINAL AI RESULT 🔥:", result);

    } catch (err) {
        console.error("AI ERROR ❌:", err.message);
    }
})();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});