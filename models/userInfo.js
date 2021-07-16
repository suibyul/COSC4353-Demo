var mongoose=require("mongoose");


var UserSchema = mongoose.Schema({
    FullName: String,
    Address1: String,
    Address2: String,
    City:String,
    State:String,
    Zipcode:Number,
    fullAddress: Object
    
});

module.exports = mongoose.model("userInfo", UserSchema);
