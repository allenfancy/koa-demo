/**
 * Created by allen on 15/11/1.
 */

    
var koa = require('koa');

var auth = require('koa-basic-auth');

var app = koa();


app.use(function *(next){
    try{
        yield* next;
    }catch(err){
        if(401 == err.status){
            this.status = 401;
            this.body = 'can not do that';
        }else{
            throw err;
        }
    }
});

app.use(auth({name:'allen',pass:'fancy'}));


app.use(function* (){
    this.body = 'secret';
});

if(!module.parent)
    console.log('start koa ....');
    app.listen(3000);
    console.log('koa is the next node web framework');