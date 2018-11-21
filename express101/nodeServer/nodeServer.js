const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    console.log(req.url);
    if(req.url === '/'){
        res.writeHead(200, {'content-type': 'text/html'});
        const homePageHtml= fs.readFileSync('node.html');
        console.log(homePageHtml);
        res.write(homePageHtml);
        res.end();
    }
    else if ( req.url === '/node.png'){
        res.writeHead(200, {'content-type': 'text/html'});
        const image = fs.readFileSync('node.png');
        res.write(image);
        res.end();
    }
    else if ( req.url === '/styles.css'){
        res.writeHead(200, {'content-type': 'text/css'});
        const styles = fs.readFileSync('styles.css');
        res.write(styles);
        res.end();
    }
    else{
        res.writeHead(200, {'content-type': 'image/png'});
        res.write('<h4>sorry this isn\'t the pager ur looking for</h>');
        res.end();
    }
});

server.listen(3000);