const router = require("express").Router();

let User = require("../models/user.model");

router.route('/').post((req,res)=>{
    if(req.body.username !== req.body.password){
         res.status(400).json('Error : incorrect password');
    }else{
User.find({username:req.body.username})
    .then(users => {
        let admin = false;
        
    console.log(JSON.stringify(users));
        if(users[0].username==="sandeep") admin=true;
        res.send({user: users[0].username,token: "test123","admin":admin})})
    .catch(err => res.status(400).json('Error : '+ err));
}
});

module.exports = router;