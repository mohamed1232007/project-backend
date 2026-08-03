const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// View Engine & Static Files Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Routes
const userRoutes = require("./routes/userRoutes");
app.use(userRoutes);

// Database Connection
mongoose
    .connect(
        "mongodb+srv://mohamedibraim1232007_db_user:FY6fpIuDNAAFNGqE@system.pr2ofly.mongodb.net/all-data?appName=system",
    )
    .then(() => {
        if (process.env.NODE_ENV !== "production") {
            app.listen(port, () => {
                console.log(`Server running on http://localhost:${port}/`);
            });
        }
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = app;
