const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/s", { useNewUrlParser: true }, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully Connected to DataBase codingTracker");
    }
});

const loginSchema = mongoose.Schema({
    name:String
});

const Login = mongoose.model("login", loginSchema);

const login = new Login({
    name:"Pava"
});

login.save();