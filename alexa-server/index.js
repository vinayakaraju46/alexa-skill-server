const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const db = require("./models");
const routes = require("./routes");

const corsOptions = {
  origin: "*",
};

db.mongoose
  .connect(`mongodb://mongo:27017/alexa-skill`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Hello from Alexa",
  });
});

app.use(routes);

app.listen(port, () => {
  console.log("Server is running on port", port);
});
