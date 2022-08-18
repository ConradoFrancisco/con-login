const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get('/signin', (req,res) =>{
    res.render("signin.ejs")
})

router.post('/signin',(req,res,next) =>{
    passport.authenticate('local.signin', {
        successRedirect:'/perfil',
        failureRedirect: '/signin'
    })(req,res,next)
})


router.get('/signup', (req,res) =>{
    res.render('signup.ejs')
})

router.post('/signup', passport.authenticate('local.signup',{
    successRedirect : '/perfil',
    failureRedirect: '/signup',
}))

router.get ('/perfil', (req,res)=>{
    res.render('perfil.ejs')
})

module.exports= router