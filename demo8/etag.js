/**
 * Created by allen on 15/11/2.
 */
var conditional = require('koa-conditional-get');
var etag = require('koa-etag');
var koa = require('koa');
var app = koa();
app.use(conditional());
app.use(etag());

app.use(function(next){
    return function *(){
        yield next;
        this.body = 'Hello world';
    }
});

app.listen(3000);
console.log('listening on port 30000');