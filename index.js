const express = require("express");
const env = require("./config/enviorment");
const logger = require('morgan');
const cookieParser = require("cookie-parser");
const app = express();
require('./config/view-helpers')(app);
require('dotenv').config();
//console.log(process.env);
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const { Cookie } = require("express-session"); //doubt
const db = require("./config/mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jws-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");

var jsdom = require("jsdom");//ye kyu add hua hai
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = new JSDOM("").window;
global.document = document;
var $ = require("jquery")(window);
const MongoStore = require("connect-mongo");
 // how it is going to work-
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMare = require("./config/middleware");
const path = require("path");
const cors= require('cors');
// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app,{
  cors:{
    origin:'http://localhost:5000/'
  }
});
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
app.use(cors({
  origin:'http://localhost:5000/'
}))
console.log(env.name);
if (env.name == 'development'){
console.log("inside index", path.join(__dirname, env.asset_path, "scss"));
app.use(
  sassMiddleware({
    src: path.join(__dirname, env.asset_path, "scss"), // why we are doing this
    dest: path.join(__dirname, env.asset_path, "css"),
    debug: true,
    outputStyle: "extended",
    prefix: "/css",
  })
);
}
app.use(express.static("./assets"));
app.use(express.urlencoded()); //how app.use work
app.use(cookieParser());
app.use(express.static(env.asset_path));

app.use("/uploads", express.static(__dirname + "/uploads")); //yha doubt hai dirname+/uploads kaise work kr rha hai
app.use(logger(env.morgan.mode, env.morgan.options));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true); //yha doubt hai

//console.log(__dirname);
// set up the view engine
app.set("view engine", "ejs"); //yha doubt hai
app.set("views", "./views");
app.use(
  session({
    //session me doubt hai
    name: "codeial",
    // TODO change the secret before deployment in production mode
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore({
      mongoUrl: "mongodb://localhost/codeial_development",
      autoRemove: "disabled",
    }),
  })
);

app.use(passport.initialize()); //doubt
app.use(passport.session()); //doubt
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMare.setFlash);
// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error in running the server: ${err}`);
  }

  console.log(`Server is running on port: ${port}`);
});
