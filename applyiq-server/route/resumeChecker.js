// // routes/resumeChecker.js

// const express = require("express");
// const multer = require("multer");
// const pdfParse = require("pdf-parse");
// const mammoth = require("mammoth");
// const fs = require("fs");
// const { OpenAI } = require("openai");
// require("dotenv").config();

// const router = express.Router();

// // OpenAI setup
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// // Multer setup to handle file uploads
// const upload = multer({ dest: "uploads/" });

// // POST route for resume checker
// router.post(
//   "/resume-checker",
//   upload.fields([
//     { name: "resume", maxCount: 1 },
//     { name: "jobDescriptionFile", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     try {
//       const resumeFile = req.files.resume?.[0];
//       const jdFile = req.files.jobDescriptionFile?.[0];
//       const jdTextInput = req.body.jobDescriptionText;
//       console.log(resumeFile);
//       console.log(jdTextInput);
//       const resumeText = await extractText(resumeFile);
//       const jdText = jdTextInput || (await extractText(jdFile));

//       const prompt = `
// You are an AI resume reviewer. Compare the following resume and job description. Output:
// 1. Match Score (0-100)
// 2. Missing Skills or Experience (list)
// 3. Suggestions for improving the resume

// Resume:
// ${resumeText}

// Job Description:
// ${jdText}
// `;

//       const completion = await openai.chat.completions.create({
//        model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: prompt }],
//         temperature: 0.3,
//       });

//       const reply = completion.choices[0].message.content;

//       const scoreMatch = reply.match(/Match Score.*?(\d{1,3})/);
//       const score = scoreMatch ? parseInt(scoreMatch[1]) : null;

//       const missingMatch = reply.match(/Missing.*?:([\s\S]*?)Suggestions/i);
//       const suggestionsMatch = reply.match(/Suggestions.*?:([\s\S]*)/i);

//       const missing = missingMatch
//         ? missingMatch[1]
//             .trim()
//             .split("\n")
//             .map((item) => item.replace(/^-/, "").trim())
//         : [];

//       const suggestions = suggestionsMatch
//         ? suggestionsMatch[1]
//             .trim()
//             .split("\n")
//             .map((item) => item.replace(/^-/, "").trim())
//         : [];

//       // Clean up uploaded files
//       if (resumeFile) fs.unlinkSync(resumeFile.path);
//       if (jdFile) fs.unlinkSync(jdFile.path);

//       res.json({ score, missing, suggestions });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "Resume analysis failed" });
//     }
//   }
// );

// // Extract text from file (.pdf / .docx / .txt)
// async function extractText(file) {
//   if (!file) return "";

//   if (file.mimetype === "application/pdf") {
//     const data = fs.readFileSync(file.path);
//     const parsed = await pdfParse(data);
//     return parsed.text;
//   }

//   if (
//     file.mimetype ===
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//   ) {
//     const buffer = fs.readFileSync(file.path);
//     const result = await mammoth.extractRawText({ buffer });
//     return result.value;
//   }

//   if (file.mimetype === "text/plain") {
//     return fs.readFileSync(file.path, "utf8");
//   }

//   return "";
// }

// module.exports = router;















// resumeChecker.js
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const router = express.Router();

// Gemini Setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Multer setup
const upload = multer({ dest: "uploads/" });

router.post(
  "/resume-checker",
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "jobDescriptionFile", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const resumeFile = req.files.resume?.[0];
      const jdFile = req.files.jobDescriptionFile?.[0];
      const jdTextInput = req.body.jobDescriptionText;

      const resumeText = await extractText(resumeFile);
      const jdText = jdTextInput || (await extractText(jdFile));

      const prompt = `
Compare the following resume and job description. Return:
1. Match Score (0-100)
2. Missing Skills or Experience (list)
3. Suggestions for improving the resume

Resume:
${resumeText}

Job Description:
${jdText}
`;

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent(prompt);
      const reply = result.response.text();

      const scoreMatch = reply.match(/Match Score.*?(\d{1,3})/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : null;

      const missingMatch = reply.match(/Missing.*?:([\s\S]*?)Suggestions/i);
      const suggestionsMatch = reply.match(/Suggestions.*?:([\s\S]*)/i);

      const missing = missingMatch
        ? missingMatch[1]
            .trim()
            .split("\n")
            .map((item) => item.replace(/^-/, "").trim())
        : [];

      const suggestions = suggestionsMatch
        ? suggestionsMatch[1]
            .trim()
            .split("\n")
            .map((item) => item.replace(/^-/, "").trim())
        : [];

      // Remove uploaded files
      if (resumeFile) fs.unlinkSync(resumeFile.path);
      if (jdFile) fs.unlinkSync(jdFile.path);

      res.json({ score, missing, suggestions });
    } catch (err) {
      console.error("Gemini Error:", err);
      res.status(500).json({ error: "Gemini resume check failed" });
    }
  }
);

// 📄 Text extraction helper
async function extractText(file) {
  if (!file) return "";
  const mimetype = file.mimetype;

  if (mimetype === "application/pdf") {
    const data = fs.readFileSync(file.path);
    const parsed = await pdfParse(data);
    return parsed.text;
  }

  if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const buffer = fs.readFileSync(file.path);
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  if (mimetype === "text/plain") {
    return fs.readFileSync(file.path, "utf8");
  }

  return "";
}

module.exports = router;



