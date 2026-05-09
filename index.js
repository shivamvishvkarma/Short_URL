require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./Connect");

const { checkForAuthentication, restrictTo } = require("./Middlewares/auth");

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();

const PORT = process.env.PORT || 8001;

connectToMongoDB(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () =>
  console.log(`Server started at ${PORT}`)
);