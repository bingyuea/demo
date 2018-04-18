### bingyuea
百度学院移动端页面完整的demo  
### how to use  
把整个项目`clone`下来,
1. 安装 node
2. 全局安装 gulp 输入命令 `npm install -g gulp`
3. 在项目下面安装 输入命令 `npm install gulp`(指的是和README 同级的文件目录)
4. 安装相关插件 输入命令 `npm install --save-dev gulp-sass gulp-autoprefixer browser-sync gulp-rename gulp-concat`
【使用npm安装可能会报错，原因暂时未知，可以改为cnpm 
 安装cnpm 的方式为 `npm install -g cnpm --registry=https://registry.npm.taobao.org`
然后在执行 `cnpm install --save-dev gulp-sass gulp-autoprefixer browser-sync gulp-rename gulp-concat`】
5. 使用命令行输入 gulp serve，项目即可启动
6. 在地址栏输入`http://localhost:3000/dist/templet/index.html#`即可看到预览整个项目
7. 手机预览:手机端和电脑处于同一个局域网下，把localhost换为你本机的ip地址  

notice
- dist 是开发目录
- build 是生成好的
- lib 放公用的js
### how to  use as templete
- 开发在dist目录下面，引用的js都放在lib里面，引用路径改为`绝对路径`,生成好的在build 和 lib 里面

### modify
1.20180327 flexbile.js 引用尽量放在页面的最顶部

### flexible+gulp+rem+sass+bowsersync+flex
