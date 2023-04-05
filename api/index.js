const express = require("express");
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")

dotenv.config();


// Connect to Database Server
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DBConnection Successfull!"))
    .catch((err)=>{
        console.log(err);
    });

app.use(express.json)
app.use("/api/auth", authRoute);
// Whenever user access /api/user, app uses userRoute (accesses /api/test/usertest)
app.use("/api/users", userRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!");
})