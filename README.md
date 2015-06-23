# IDE-for-oj
graduation project
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

#功能说明
1. 能进行更改主题theme,字体大小font
2. 查找,按ctrl+f
3. 替换,按两次ctrl+f
4. undo,按ctrl+z
5. 代码自动补全
6. 多语言java,C,C++
7. 代码检错
8. 黑箱测试

