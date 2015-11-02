/**
 * Created by allen on 15/11/1.
 */


var render = require('./lib/render');
var logger = require('koa-logger');
var route = require('koa-route');
var parse = require('co-body');
var koa = require('koa');

var app = koa();


var posts = [];

app.use(logger());

/**
 * 路由
 */
app.use(route.get('/',list));
app.use(route.get('/post/new',add));
app.use(route.get('/post/:id',show));
app.use(route.post('/post',create));

/**
 * 显示博客列表
 */
function *list(){
    this.body = yield render('list',{posts:posts});
    console.log(posts);
}

/**
 * 增加博客，只是渲染到增加的页面而已
 */
function *add(){
    this.body = yield render('new');
}
/**
 * 根据博客的ID显示一条博客的内容详情
 */
function *show(id){
    var post = posts[id];
    if(!post) this.throw(404,'invalid post id')
    this.body = yield render('show',{post:post});
}
/**
 * 提交博客添加的博客内容
 */
function *create(){
    var post = yield parse(this);

    console.log('create blog : '+ post +'\n' + this);
    var id = posts.push(post) - 1;

    console.log('posts before : ' + posts);
    post.created_at = new Date;
    post.id = id;
    console.log('posts after : ' + posts);
    //添加成功后，调转到List页面，即主页面
    this.redirect('/');
}

app.listen(3000);
console.log('listening on port 3000');
console.log(__dirname);
