const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/codingTracker", { useNewUrlParser: true }, function (err) {
    if (err)
        console.log(err);
    else
        console.log("Connected to DB");
});

const problemSchema = new mongoose.Schema({
    date: Date,
    problemName: String,
    problemLink: String,
    platform: String,
    tags: Object
});

const Problem = mongoose.model("Problem", problemSchema);

app.get("/", function (req, res) {

});

app.post("/", function (req, res) {
    let date = new Date(req.body.date);
    let problemName = req.body.problemName;
    let problemLink = req.body.problemLink;
    let platform = req.body.platform;
    let tags = req.body.tags

    const problem = new Problem({
        date: date,
        problemName: problemName,
        problemLink: problemLink,
        platform: platform,
        tags: tags
    });

    Problem.find({ problemLink: problemLink }, function (err, doc) {
        if (err)
            console.log(err);
        else if (doc.length == 0) {
            problem.save();
            res.send("sdf");
        } else {
            res.render('home', { message: "Problem Already Added" });
        }
    })
});

app.post("/display", function (req, res) {

    let query = {};
    if(req.body.date)
        query.date = new Date(req.body.date);
    if(req.body.platform)
        query.platform = req.body.platform;
    if(req.body.tags)
        query.tags = req.body.tags;
    Problem.find(query, function (err, docs) {
        if (!err) {
            res.render('home', { problems: docs, message: "" });
        } else {
            res.send(err);
        }
    });
});
app.listen(3000);