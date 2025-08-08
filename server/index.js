const express = require("express");
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const resumeCheckerRoute = require("./route/resumeChecker"); // <-- Import the route
const calendarRoutes = require("./route/calendarRoutes");

app.use(
  cors({
    origin: ["http://localhost:5173","https://applyiq-app11-70872.web.app"],
  })
);
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7v7xhww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
app.get("/", (req, res) => {
  res.send("Hello server");
});
async function run() {
  try {
    //  create a connection to the MongoDB cluster
    const ApplyIQ = client.db("ApplyIQ");
    const usersCollection = ApplyIQ.collection("Users");
    const jobsCollection = ApplyIQ.collection("Jobs");
    // get user information
    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const user = await usersCollection.findOne(query);
      res.send(user);
    });
    // get all jobs
    app.get("/appliedJobs", async (req, res) => {
      const email = req.query.email;
      const query = {};
      if (email) {
        query.email = email;
      }
      const jobs = await jobsCollection.find(query).toArray();
      res.send(jobs);
    });
    // get a specific job by id
    app.get("/appliedJobs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const job = await jobsCollection.findOne(query);
      res.send(job);
    });
    // register user data
    app.post("/register", async (req, res) => {
      // make a vaildation that same email does not exist
      const email = req.body.email;
      const user = req.body;
      const existingUser = await usersCollection.findOne({ email: email });
      if (existingUser) {
        return res.status(400).send({ message: "User already exists" });
      }
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    // store the user applied jobs
    app.post("/appliedJobs", async (req, res) => {
      const jobData = req.body;
      const result = await jobsCollection.insertOne(jobData);
      res.send(result);
    });
    // resume checker api
    app.use("/api", resumeCheckerRoute);
    // calendr api
    app.use("/api", calendarRoutes);
    // update a job with id
    app.patch("/appliedJobs/:id", async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: jobData,
      };
      const result = await jobsCollection.updateOne(query, updateDoc);
      res.send(result);
    });
    // delete a applied job
    app.delete("/appliedJobs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobsCollection.deleteOne(query);
      res.send(result);
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  const time = new Date().toLocaleTimeString();
  console.log(`Server is running on ${time} port http://localhost:${port}`);
});
