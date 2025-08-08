// /routes/calendarRoutes.js
const express = require("express");
const { google } = require("googleapis");
require("dotenv").config();

const router = express.Router();
const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI // e.g., http://localhost:5000/api/google-calendar/callback
);

// Step 1: Get Google Auth URL
router.get("/google-calendar/auth", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  res.send({ url: authUrl });
});

// Step 2: Handle Google OAuth callback and redirect with tokens
router.get("/google-calendar/callback", async (req, res) => {
  const code = req.query.code;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const query = new URLSearchParams({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    }).toString();
    // Redirect to the client with tokens
    res.redirect(`https://applyiq-app11-70872.web.app/dashboard/calendar-success?${query}`);
    // res.redirect(`http://localhost:5173/dashboard/calendar-success?${query}`);
  } catch (error) {
    console.error("Error exchanging code for token", error);
    res.redirect("http://localhost:5173/dashboard/calendar-error");
  }
});

// Step 3: Create a Calendar Event
router.post("/calendar/event", async (req, res) => {
  const { access_token, refresh_token } = req.body.tokens;
  const { title, dateTime, description, location } = req.body;

  try {
    oauth2Client.setCredentials({ access_token, refresh_token });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const startDate = new Date(dateTime);
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000); // 30 min event
    // Create the event object
    const event = {
      summary: title,
      description,
      location,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: "Asia/Dhaka",
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: "Asia/Dhaka",
      },
    };
    // response from Google Calendar API
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
    // console.log(response.data);
    // Send the event link back to the client
    res.send({
      message: "Event created",
      eventLink: response.data.htmlLink,
    });
  } catch (error) {
    console.error("Event creation error:", error);
    res.status(500).send("Failed to create event");
  }
});

module.exports = router;
