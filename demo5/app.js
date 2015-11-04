/**
 * Created by allen on 15/11/2.
 */
var compose = require('koa-compose');
var koa = require('koa');
var app = module.exports = koa();

function *responseTime(next){
    var start = new Date();
    yield next;
    var ms = new Date - start;
    this.set('X-Response-Time',ms + 'ms');
}

function *logger(next){
    var start = new Date;
    yield next;;
    var ms = new Date - start;

    if('test' != process.env.NODE_ENV){
        console.log('%s %s -%s ms',this.method,this.url,ms);
    }
}

function *respond(next){
    yield next;
    if('/' != this.url) return;

    this.body = 'hello world';
}

var all = compose([
    responseTime,
    logger,
    respond
]);

app.use(all);

if(!module.parent)
    console.log('koa start ....')
    app.listen(3000);
    console.log(process.env);
    console.log(process);