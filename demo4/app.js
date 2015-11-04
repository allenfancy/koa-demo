/**
 * Created by allen on 15/11/2.
 */

var koa = require('koa');
var parse = require('co-body');

var app = koa();

app.use(function* (next){
    if('POST' != this.method){
        return yield next;
    }
    var body = yield parse(this,{limit:'1kb'});
    if(!body.name){
        this.throw(400,' . name required');
    }
    this.body = {name : body.name.toUpperCase()}
});


if(!module.parent)
    app.listen(3000);
    console.log('start koa ...');