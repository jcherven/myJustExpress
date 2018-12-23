const path = require('path');

const express  = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const helmet = require('helmet');
app.use(helmet());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    if (req.query.msg === 'fail') {
        res.locals.msg = `Sorry, this username and password combination sucks.`;
    } else {
        res.locals.msg = ``;
    }
    next();
})

app.get('/', (req, res, next) => {
    res.send("SAN CHECK");
});

app.get('/login', (req, res, next) => {
    const msg = req.query.msg;
    if (msg === 'fail') {
        console.log(msg);
    }
    res.render('login');
});

app.post('/process_login', (req, res, next) => {
    const password = req.body.password;
    const username = req.body.username;

    if (password === "x") {
        res.cookie('username', username);
        res.redirect('/welcome');
    } else {
        res.redirect('/login?msg=fail&test=hello');
    }
    res.json(req.body);
});

app.get('/welcome', (req, res, next) => {
    res.render("Welcome", {
        username: req.cookies.username
    });
});

app.param('id', (req, res, next, id) => {
    console.log("Params called: " + id);
    next();
})

app.get('/story/:id', (req, res, next) => {
    res.send(`<h1>Story ${req.params.storyId}</h1>`)
});

app.get('/story/:storyId', (req, res, next) => {
    res.send(`<h1>Story ${req.params.storyId}</h1>`)
});

app.get('/story/:storyId/:link', (req, res, next) => {
    res.send(`<h1>Story ${req.params.storyId} - ${req.params.link}</h1>`)
});

app.get('/logout', (req, res, next) => {
    res.clearCookie('username');
    res.redirect('/login');
});

app.listen(3000);