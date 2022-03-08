require("dotenv").config();
require("./config/database").connect();
const cors = require("cors");

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const eventsRoute = require("./routes/events")
const membersRoute = require("./routes/members");

const {API_PORT} = process.env;
const port = process.env.PORT || API_PORT;

const express = require("express");

const app = express();

app.use(express.json());

app.use(cors({
    origin: "*"
}))

app.use("/", loginRoute);
app.use("/", registerRoute);
app.use("/events", eventsRoute);
app.use("/members", membersRoute);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
