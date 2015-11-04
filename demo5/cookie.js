/**
 * Created by allen on 15/11/2.
 */

var koa = require('koa');
var app = module.exports = koa();

app.use(function *(){
   var n = this.cookies.get('node_club') + 1;
    console.log(n);
   this.cookies.set('node_club',n);
    this.body = n + '   views';
});

if(!module.parent)
    app.listen(3000);