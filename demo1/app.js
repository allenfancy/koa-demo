/**
 * Created by allen on 15/11/1.
 */


var koa = require('koa');

var app = module.exports = koa();

app.use(function *(){
    this.body = 'hello world';
});

if(!module.parent)
    app.listen(3000);
    console.log('start koa ...');