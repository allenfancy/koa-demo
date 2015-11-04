/**
 * Created by allen on 15/11/1.
 */

/**
 * 第一个程序
 * Hello World
 * @type {Application|exports|module.exports}
 */
var koa = require('koa');

var app =  koa();

app.use(function *(){
    this.body = 'hello world';
});

if(!module.parent)
    app.listen(3000);
    console.log('start koa ...');