const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const joi = require('joi');

const userSchema = mongoose.Schema(
    {
   fullName: {
        type: String,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    emailAddress: {
        type: String,
        minLength: 4,
        maxLength: 100,
        required: true,
        trim: true,
        unique: true
    },
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    role: {
        type: String,
        enum: ["user", "admin", "subAdmin"]
    },
    isActive: {
        type: Boolean,
        default: true
    }

},
{timestamps:true}

)

userSchema.pre("save",function(next){
   
    const salt=bcrypt.genSaltSync(7);
    const hashedPassword=bcrypt.hashSync(this.password,salt)
    this.password=hashedPassword

     next()

})

userSchema.pre("update",function(next){
     if(this.password){
        const salt=bcrypt.genSaltSync(7);
        const hashedPassword=bcrypt.hashSync(this.password,salt)
        this.password=hashedPassword
    
         next()

     }
  

})

const User= mongoose.model("User", userSchema)
module.exports=User