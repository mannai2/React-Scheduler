const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const app = express();

// Enable CORS

const corsOptions = {
  origin: "http://localhost:8081",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Specify the allowed methods
  credentials: true, // Allow credentials (cookies) to be sent with the request
};

app.use(cors(corsOptions));



// Parse JSON and url-encoded requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add express-session middleware
app.use(
  session({
    secret: "your-secret-key", // Replace with a secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure to true in a production environment with HTTPS
  })
);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Scheduler backend service." });
});

// Load routes
require("./routes/scheduler.routes")(app);
require("./routes/bureau.routes")(app);
require("./routes/membre.routes")(app);
require("./routes/attendance.routes")(app);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});


// Set port and start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Sync database
const db = require("./models");
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synchronized.");
});
