const mongoose = require('mongoose');
const multer = require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars');//yha doubt hai

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type:String
    },
    friendships: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship' 
        }
    ]

}, {
    timestamps: true
});

let storage = multer.diskStorage({//let kyu use kiya
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));//ye path kaise define ho rha hai 
     
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });
userSchema.statics.uploadedAvatar= multer({storage: storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;//why we use statics instd. of statics

const User = mongoose.model('User', userSchema);

module.exports = User;