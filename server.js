const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("./config/db");
require("dotenv").config({ path: "./config/.env" });
// const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require("path");
const userRoutes = require("./routes/user.routes");
const formulaireRoutes = require("./routes/formulaire.routes");
const formulaireDaaraRoute = require("./routes/formulaire-daara.routes");
const zoneRoutes = require("./routes/zone.routes");
const regionRoutes = require("./routes/region.routes");
const departementRoutes = require("./routes/departement.routes");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  cookieSession({
    name: "khouma-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
  })
);

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "POST,GET,PUT,OPTIONS,DELETE",
    exposedHeaders: ["sessionId"],
    allowedHeaders: ["sessionId", "Content-Type"],
    preflightContinue: false,
  })
);

// simple route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname + "/about.html"));
});

//route
app.use("/api/users", userRoutes);
app.use("/api/formulaires", formulaireRoutes);
app.use("/api/zones", zoneRoutes);
app.use("/api/regions", regionRoutes);
app.use("/api/departements", departementRoutes);
app.use("/api/formsdaaras", formulaireDaaraRoute);

// set port, listen for requests
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
