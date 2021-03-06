var logger = require('koa-logger');
var serve = require('koa-static');
var parse = require('co-busboy');
var koa = require('koa');
var fs = require('fs');
var app = koa();
var os = require('os');
var path = require('path');



app.use(logger());

// custom 404

app.use(function *(next){
    yield next;
    if (this.body || !this.idempotent) return;
    this.redirect('/404.html');
});

// serve files from ./public

app.use(serve(__dirname + '/public'));

// handle uploads

app.use(function *(next){
    // ignore non-POSTs
    if ('POST' != this.method) return yield next;

    // multipart upload
    var parts = parse(this);

    console.log(parts);
    var part;

    while (part = yield parts) {
        console.log(os.tmpdir());

        var stream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString()));
        console.log('stream : '+ stream);
        part.pipe(stream);
        console.log('uploading %s -> %s', part.filename, stream.path);
    }

    this.redirect('/');
});

// listen

app.listen(3000);
console.log('listening on port 3000');
