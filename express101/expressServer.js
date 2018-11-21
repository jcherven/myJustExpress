const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.all('/',(req,res)=>{
    console.log(path.join(__dirname + '/node.html'));
    res.sendFile(path.join(__dirname + '/node.html'));    
    // res.send(`<h1>This is the home page</h1>`);
});
app.all('*', (req, res) => {
    res.send('<h1>sorry this page does not exits</h1>');
});

app.listen(3000);
console.log('server is listening on 3000');
