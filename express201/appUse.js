const express = require('express');
const app = express();

function validateUser(req, res, next){
    res.locals.validated = true;
    console.log("VALIDATED RAN");
    next();
};


app.use(validateUser);
app.use('/admin', validateUser);
app.get('/', validateUser);

app.get('/', (req, res, next)=>{
    res.send("<h1>give me your teeth</h1>");
    console.log(res.locals.validated);
});

app.get('/admin', (req, res, next)=>{
    res.send("<h1>give me your teeth</h1>");
    console.log(res.locals.validated);
});
app.listen(3000);