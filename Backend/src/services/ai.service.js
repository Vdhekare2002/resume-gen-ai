const { GoogleGenAI } = require('@google/genai');
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const genai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

// ✅ Zod Schema
const interviewReportSchema = z.object({
    jobDescription: z.string(),
    resumeText: z.string(),
    selfDescription: z.string(),
    matchScore: z.number().min(0).max(100),

    technicalQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string()
    })),

    behavioralQuestions: z.array(z.object({
        question: z.string(),
        intention: z.string(),
        answer: z.string()
    })),

    skillGaps: z.array(z.object({
        skill: z.string(),
        severity: z.enum(["low", "medium", "high"]),
        gapDescription: z.string()
    })),

    preparationPlan: z.array(z.object({
        day: z.number(),
        focus: z.string(),
        tasks: z.string()
    }))
});

// ✅ Convert once
const interviewReportJsonSchema = zodToJsonSchema(interviewReportSchema);

async function generateInterviewReport({ resumeText, jobDescription, selfDescription }) {
    console.log("Gemini started ✅");

    try {
        const prompt = `
Generate a structured interview report in JSON format.

Resume:
${resumeText}

Job Description:
${jobDescription}

Self Description:
${selfDescription}
`;

        const response = await genai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: interviewReportJsonSchema
            }
        });

        const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

        const parsed = JSON.parse(text);

        console.log("FINAL JSON OUTPUT 🔥:", parsed);

        return parsed;

    } catch (error) {
        console.error("Gemini Error ❌:", error.message);
        throw error;
    }
}

module.exports = generateInterviewReport;