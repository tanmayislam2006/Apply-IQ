// External dependencies
const express = require("express");
const { google } = require("googleapis");
require("dotenv").config();

const router = express.Router();

// ===== 1. SETUP =====
// The SCOPES define the permissions your app is requesting
const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];

// OAuth2 setup
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID, // From Google Cloud Console
  process.env.GOOGLE_CLIENT_SECRET, // From Google Cloud Console
  process.env.GOOGLE_REDIRECT_URI // Must match what's in your Google Cloud project
);

// ===== 2. GENERATE AUTH URL =====
// Route: GET /api/calendar/auth
router.get("/calendar/auth", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline", // Needed to get refresh token
    scope: SCOPES,
  });

  res.send({ url: authUrl });
});

// ===== 3. HANDLE CALLBACK =====
// After the user approves access, Google redirects here
// Route: GET /api/calendar/callback?code=xxxxxx
router.get("/calendar/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Send tokens back to frontend (or store in DB for future use)
    res.send(tokens);
  } catch (error) {
    console.error("Error exchanging code for token", error);
    res.status(500).send("Token exchange failed");
  }
});

// ===== 4. CREATE CALENDAR EVENT =====
// Route: POST /api/calendar/event
router.post("/calendar/event", async (req, res) => {
  const { access_token, refresh_token } = req.body.tokens; // Tokens sent from frontend
  const { title, dateTime, description, location } = req.body;

  try {
    // Set user credentials
    oauth2Client.setCredentials({ access_token, refresh_token });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const event = {
      summary: title,
      description,
      location,
      start: {
        dateTime: dateTime,
        timeZone: "Asia/Dhaka", // Change based on your user
      },
      end: {
        dateTime: new Date(
          new Date(dateTime).getTime() + 30 * 60 * 1000
        ).toISOString(), // 30 mins duration
        timeZone: "Asia/Dhaka",
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    res.send({
      message: "Event created",
      eventLink: response.data.htmlLink,
    });
  } catch (error) {
    console.error("Error creating calendar event", error);
    res.status(500).send("Failed to create event");
  }
});

module.exports = router;
