const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true } ,
    rolesId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    resetToken: { type: String, default: "" },
    resetTokenExpiration: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
  });

const User = mongoose.model('User', userSchema);
  
module.exports = User; 