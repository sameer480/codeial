const User = require('../models/user');

// let's keep it same as before
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    });

}


module.exports.update = async function (req,res) {
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//             req.flash('success', 'Updated!');
//             return res.redirect('back');
//         });
//     }else{
//         req.flash('error', 'Unauthorized!');
//         return res.status(401).send('Unauthorized');
//     }
// }
console.log('line 26',req.user.id,req.params.id);
if(req.user.id==req.params.id){//yha doubt hai
    try{
        let user=await User.findById(req.params.id);
        User.uploadedAvatar(req,res, function(err){//User kisko represent kr rha hai
            if(err) {console.log('Multer Error:',err)}
           // console.log(req.file);
           user.name=req.body.name;//ye user kha se aa rha hai
           user.email=req.body.email;//ye name or email kha se aa rha hai
           if(req.file){//user.file kisko represent kr rha hai 
            user.avatar=User.avatarPath+'/'+req.file.filename;//ye work kaise kr rha hai or user .avatar me user work kha se aa rha hai
           }
           user.save();
           return res.redirect('back');
        });
    }catch(err){
        req.flash('error',err);//why we req instd of res
        return res.redirect('back');
    }
}else{
    req.flash('error','Unauthorized!');
    return res.status(401).send('Unauthorized!');
}

}



// render the sign up page
module.exports.signUp = function(req, res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }


    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}


// render the sign in page
module.exports.signIn = function(req, res){

    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){req.flash('error', err); return}

        if (!user){
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}

                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }

    });
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'You have logged out!');


    return res.redirect('/');
}