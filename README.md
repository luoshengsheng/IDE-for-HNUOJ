# IDE-for-oj
graduation project
本项目参考了GCC-explorer项目
#环境配置说明
##系统运行在liunx系统上，不支持windows系统
##安装node.Js
1. 直接apt-get 或者yum 安装 或者自己编译安装也许
2. 安装node npm
3. 安装forever 用于管理node的进程后台运行
- $ sudo npm install forever -g   #安装
- $ forever start app.js          #启动
- $ forever stop app.js           #关闭
- $ forever start -l forever.log -o out.log -e err.log app.js   #输出日志和错误

##安装java环境
1. 安装JDK
2. 配置环境变量 
- 编辑/etc/profile 配置PATH变量 
- JAVA_HOME-----`JDK安装路径`		
- CLASS_PATH----`.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar`
- PATH----------`$JAVA_HOME/bin:.`

##安装C,C++环境
1. 安装GCC，G++编译器
2. 在config文件夹中更改配置文件
3. 如何配置--请看程序包中etc目录下的config配置文件备注

#安全使用系统说明
##由于需要运行用户编写的程序，为了防止用户提交恶意代码对系统造成伤害，请务必使用最低权限liunx账号运行系统
##如何创建使用低权限账户
1. 使用 sudo adduser username(自己命名) 然后设定密码
2. 登录账号，进入到home目录git clone 项目，进行npm install
3. 切换回sudo用户，进入项目目录的上一级目录，更改项目文件的所有者为nobody:nogroup
sudo chown nobody:nogroup -R 项目文件名
4. 登录刚才新建的用户，进入项目文件用forever或者node启动服务

#功能说明
1. 能进行更改主题theme,字体大小font
2. 查找,按ctrl+f
3. 替换,按两次ctrl+f
4. undo,按ctrl+z
5. 代码自动补全
6. 多语言java,C,C++
7. 代码检错
8. 黑箱测试

