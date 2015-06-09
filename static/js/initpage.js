//------------------------------------页面初始化相关函数---------------------------
var currentCompiler = null;
var allCompilers = [];

function initialise(options) {
	//input-output
	$(".inputOutput ul li").click(function(){
        $("."+$(".inputOutput ul li.active").attr("name")).addClass("hidden"); 
        $(".inputOutput ul li.active").removeClass("active");
        $(this).addClass("active");
        var className = $(this).attr("name");
        $("."+className).removeClass("hidden");
    });

	$("#judgeProblemButton").click(function() {
        $('#judgeProblem').modal('hide');
        judgeProblem();
    });
	// 设置css
	var screetHeight = screen.availHeight;
	var tempHeight = screetHeight - ($(".navbar").height() + 150);
	var height = tempHeight;
	$(".allContent").css({
		height: height
	});
	tempHeight = $(".ioContent").height() - ($(".panel-heading").height());
	height = tempHeight;
	$(".panel-body").css({
		height: height
	})
	$('#inputOutput').menuToggle({
		'ctrlBtn': 'ioContentHide',
		'speed': 300,
		'height': 200,
		'openText': 'input-output',
		'closeText': 'input-output',
		'type': 'height',
	});

	//用户代码
	// codeFile = getFile(getCookie("username"));

	//设置语言代码模板
	setSetting("templateC", $(".template.lang.c").text());
	setSetting("templateCC", $(".template.lang.cc").text());
	setSetting("templateJava", $(".template.lang.java").text());

	var language = getSetting("language");
	if (!language) {
		language = options.language;
	};
	//设置同步异步

	//显示语言
	$(".language-name").text(language);
	$(".languageSelect").val(language);
	setSetting("language", language);

	//函数在static/js/compiler.js文件定义
	var compiler = new Compiler($('body'), options.windowLocalPrefix, language);
	allCompilers.push(compiler);
	currentCompiler = compiler;

	var defaultCompiler = options.GCC_defaultCompiler;
	if (language == "java") {
		defaultCompiler = options.java_defaultCompiler;
	}

	//初始化所有编译器，，然后设置当前编译器
	compiler.setCompilers(options.compilers, defaultCompiler, language);
}

$(function() {
	initialise(OPTIONS);
});

//------------------------------------页面初始化相关函数---------------------------
//获取localstorage变量值
function getSetting(attrName) {
	return window.localStorage[OPTIONS.windowLocalPrefix + '.' + attrName];
}
function setSetting(attrName, attrValue) {
	window.localStorage[OPTIONS.windowLocalPrefix + '.' + attrName] = attrValue;
}
function setSource(code) {
	var editor = ace.edit("editor");
    editor.getSession().setValue(code);
}

function getSource() {
	var editor = ace.edit("editor");
    return editor.getSession().getValue();
}
function getCookie(name) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg)) {
			return unescape(arr[2]);
		} else {
			return null;
		}
	}
//------------------------------------页面功能函数----------------------------------
//提交判题
function judgeProblem(){
	var editor = ace.edit("editor");
    var code = editor.getSession().getValue();
    if(!code){
        alert("代码为空");
    }else{
        var data = {
            code: code,
            username: $("#showUsername").text().trim()
        }
        //设置提示信息
        var html = '<a href="#" id="judgeMessage" class="selected" style="text-align:center;">正在判题......</a>'
        $('#Menu li.template').clone().appendTo('#Menu').removeClass('template').html(html);
        $.ajax({
            type: 'POST',
            url: '/judgeProblem',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(result) {
            	//返回判题结果
                var message = result.message;
                $('#judgeMessage').text("判题结果："+message);
                // alert(message);
            }
        });
    }
}
//------------------------------------begin of 展开插件-----------------------------
(function($) {
	$.fn.extend({
		'menuToggle': function(options) {
			//self变量，用于函数内部调用插件参数
			var self = this;
			//默认参数
			this._default = {
				'ctrlBtn': null, //关闭&展开按钮id
				'speed': 400, //展开速度
				'width': 400, //展开菜单宽度
				'height': 400, //展开菜单高度
				'openText': '展开>>', //展开前文本
				'closeText': '<<关闭', //展开后文本
				'type': 'width' //width表示按宽度伸展，height表示按高度伸展
			};
			//插件初始化函数
			this.init = function(options) {
				//配置参数格式有误则提示并返回
				if (typeof options != 'object') {
					self.error('Options is not object Error!');
					return false;
				}
				if (typeof options.ctrlBtn == 'undefined') {
					self.error('Options ctrlBtn should not be empty!');
					return false;
				}
				//存储自定义参数
				self._default.ctrlBtn = options.ctrlBtn;
				if (typeof options.type != 'undefined') self._default.type = options.type;
				if (typeof options.width != 'undefined') self._default.width = options.width;
				if (typeof options.height != 'undefined') self._default.height = options.height;
				if (typeof options.speed != 'undefined') self._default.speed = options.speed;
				if (typeof options.openText != 'undefined') self._default.openText = options.openText;
				if (typeof options.closeText != 'undefined') self._default.closeText = options.closeText;
				if (self._default.type == 'width') {
					self._default.expandOpen = {
						width: self._default.width
					};
					self._default.expandClose = {
						width: 0
					};
				} else {
					self._default.expandOpen = {
						height: self._default.height
					};
					self._default.expandClose = {
						height: 0
					};
				}
			};
			this.run = function() {
				$("#" + self._default.ctrlBtn).click(function() {
					var showJudge = true;
					if ($(this).hasClass('closed')) { //有closed类，表示已关闭，现在展开
						$(this).removeClass('closed').html(self._default.closeText);
						$(self).show().animate(self._default.expandOpen, self._default.speed);
					} else {
						$(this).addClass('closed').html(self._default.openText);
						$(self).animate(self._default.expandClose, self._default.speed, function() {
							$(this).hide();
						});
						showJudge = false;
					}
					if (self._default.ctrlBtn == "ioContentHide" && !showJudge) {
						$("#editor").animate({
							height: $("#editor").height() + self._default.height
						}, self._default.speed);
					} else {
						$("#editor").animate({
							height: $("#editor").height() - self._default.height
						}, self._default.speed);
					}
				});
			};
			this.error = function(msg) {
					//没有错误提示DIV则自动添加
					if (!$("#menuToggleErrorTips").size()) {
						$("<div id='menuToggleErrorTips'><h2>Error<\/h2><div class='tips'><\/div><\/div>").appendTo($("body")).hide();
						$("#menuToggleErrorTips").css({
							position: 'absolute',
							left: 0,
							top: 0,
							width: 400,
							height: 200,
							'z-index': 9999999,
							'border': '1px solid #000',
							'background-color': '#ABC',
							'color': '#CC0000',
							'text-align': 'center'
						});
					}
					//显示错误提示信息
					$("#menuToggleErrorTips").show().children('.tips').html(msg);
				}
				//Init
			this.init(options);
			this.run();
		}
	});
})(jQuery);
//------------------------------------end of 展开插件-----------------------------