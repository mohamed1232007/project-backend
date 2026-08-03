const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema");
const moment = require("moment");

router.get("/", (req, res) => {
    User.find()
        .then((result) => {
            res.render("index", { arr: result, moment: moment });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/user/add.html", (req, res) => {
    res.render("user/add");
});

router.get("/edit/:id", (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render("user/edit", { obj: result, moment: moment });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get("/view/:id", (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            res.render("user/view", { obj: result, moment: moment });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/user/add.html", (req, res) => {
    User.create(req.body)
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
});

const searchHandler = (req, res) => {
    const searchText = (
        (req.method === "POST" ? req.body.searchText : req.query.searchText) ||
        ""
    ).trim();
    const conditions = [
        { fireName: { $regex: searchText, $options: "i" } },
        { firstName: { $regex: searchText, $options: "i" } },
        { lastName: { $regex: searchText, $options: "i" } },
        { email: { $regex: searchText, $options: "i" } },
        { country: { $regex: searchText, $options: "i" } },
        { gender: { $regex: searchText, $options: "i" } },
    ];

    console.log("Search text:", searchText);

    User.find({
        $or: conditions,
    })
        .then((result) => {
            console.log("Search results:", result.length);
            res.render("user/search", { arr: result, moment: moment });
        })
        .catch((err) => {
            console.log(err);
        });
};

router.get("/search", searchHandler);
router.post("/search", searchHandler);

router.delete("/edit/:id", (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
});

router.put("/edit/:id", (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body)
        .then(() => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
