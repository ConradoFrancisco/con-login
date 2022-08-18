const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../datacon')
const helpers = require('../helpers/helpers')


passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'Contraseña',
    passReqToCallback: true
    
}, async (req,username,password,done) => {
    const {Nombre , Apellido} = req.body
    let usuario = {
        Nombre,
        Apellido,
        username,
        password
    };
    /* usuario.password = await helpers.cifrarpw(password) */
    const result = await pool.query('INSERT INTO usuarios set ?', [usuario])
    
    usuario.id = result.insertId
    
    return done(null,usuario) 
    
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'Contraseña',
    passReqToCallback: true
}, async (req,username,password,done)=>{
      const row = await pool.query('select * from usuarios where username = ?',[username])
      const user = row[0]
      if(user.password === password){
        done(null,user,{msg:"welcome"+ user.username})
      }
      
}))


passport.serializeUser((usuario,done) =>{
        done(null,usuario.id);
})

passport.deserializeUser( async (id,done) =>{
    try{
        const rows = await pool.query("select * from usuarios where id = ?",[id] ) 
        done(null,rows[0]);
    } catch(e){
        console.log(e)
    }
     
})