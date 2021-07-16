var express = require("express"),
mongoose = require("mongoose"),
passport = require("passport"),
bodyParser = require("body-parser"),
LocalStrategy = require("passport-local"),
passportLocalMongoose = require("passport-local-mongoose"),
fuelquoteform = require('./models/fuelquoteform');
User = require("./models/user");
userInfo = require("./models/userInfo");


mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

URI = "mongodb+srv://dbT:testing123@cosc4353db.wflq0.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(URI, {useNewUrlParser: true});

const path = require("path");
const http = require('http');
const user = require("./models/user");
var app = express();
const server = http.createServer(app);
app.use(express.static(path.join(__dirname,'./Frontend')));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
  
  
app.use(passport.initialize());
app.use(passport.session());
  
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
  

  
// Showing home page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname,'./Frontend/login.html'));
});
  


  
// Showing register form
app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname,'./Frontend/register.html'));
});
  
var userID

// Handling user signup
app.post("/register", function (req, res) {
    userID = req.body.username
    var username = req.body.username
    var password = req.body.password
    User.register(new User({ username: username }),
            password, function (err, user) {
        if (err) {
            console.log(err);
            return res.sendFile(path.join(__dirname,'./Frontend/INVR.html'));
        }
  
        passport.authenticate("local")(
            req, res, function () {
            res.sendFile(path.join(__dirname,'./Frontend/login.html'));;
        });
    });
});
  
//Showing login form
app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname,'./Frontend/login.html'));
});
app.get("/home", function (req, res){
    res.sendFile(path.join(__dirname,'./Frontend/mainpg.html'));
});

app.get("/invalidlog", function (req, res){
    res.sendFile(path.join(__dirname,'./Frontend/invalid.html'));
});

//Handling user login
app.post("/login", passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: '/invalidlog'
}), function (req, res) {
});

app.get('/fuelhistory' , function(req,res){
res.sendFile(path.join(__dirname,'./Frontend/fuelhistory.html'))
});

app.get('/clientProfileMgt' , function(req,res){
    res.sendFile(path.join(__dirname,'./Frontend/actmngr.html'))
});

var userfullAddress
var profileInfo

app.post("/clientProfileMgt", function (req, res){
    
    userfullAddress = req.body.address.concat(", ", req.body.City, ", ",req.body.State, ", ",req.body.zip);
    
    profileInfo = {
        FullName :req.body.fullname,
        Address1 : req.body.address,
        Address2: req.body.address1,
        City : req.body.City,
        State : req.body.State,
        Zipcode : req.body.zip,
        fullAddress : userfullAddress
    }

    new userInfo(profileInfo).save()
    

    res.sendFile(path.join(__dirname,'./Frontend/mainpg.html'));
   

});

app.get('/FQF',function (req, res){
    
    res.sendFile(path.join(__dirname,'./Frontend/FQF.html'));
});

var quoteData

app.post("/FuelQuote", function (req, res){
    
    quoteData = {    
        gallonsRequested: req.body.input1,
        deliveryAddress: req.body.DA,
        deliveryDate:req.body.datechk,
        pricePerGallon: req.body.SP,
        totalAmt: req.body.TAD
       
    }

    new fuelquoteform(quoteData).save()


    res.sendFile(path.join(__dirname,'./Frontend/mainpg.html'));

});

app.get('/getAddress', async(req, res) => {
    const address_data = {
        address: userfullAddress
    }
    res.send(address_data)
})

app.get('/getProfile', async(req, res) => {
    const profile_data = profileInfo
    res.send(profile_data)
})

app.get('/getQuote', async(req,res) => {
    const quote_data = quoteData
    res.send(quote_data)
    
})


var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Server Has Started at port 3000!");
});
