$(function () {
    //测试预设项
    $('#no_more').hide();


    var every_videoId = 0;
    var my_videoId = 0;
    var type = 'every_video';

    //展开评论
    $("section").on("click", ".zkpl", function () {
        var mt = $(this).parent();
        //console.log($(this).find(".comment_item").length);
        if (mt.find(".comment_item").length) {
            //
        } else {
            if (window.localStorage.getItem("token")) {
                //展开
                $.ajax({
                    type: "GET",
                    url: "http://127.0.0.1:2245/comment?videoId=" + $(this).parent().attr("id") + "&&userId=" + window.localStorage.getItem("userId") + "&&token=" + window.localStorage.getItem("token"),
                    async: true,
                    success: function (data) {
                        // console.log(data);
                        var commentDiv = $('<div class = "comment_div"></div>');
                        data.data.forEach(function (ele) {
                            // console.log(ele);
                            if (ele.user_id == window.localStorage.getItem("userId")) {
                                var $commentItem = $('<p class="comment_item" id=' + ele.id + '><span>你:' + ele.comment + '</span>   <span class="comment_del">删除</span></p>');
                            } else {
                                var $commentItem = $('<p class="comment_item" id=' + ele.id + '><span>' + ele.real_name + ':</span><span>' + ele.comment + '</span></p>');
                            }
                            commentDiv.append($commentItem);
                        });
                        var $commentNoMore = $('<p class="comment_item"><span class="no_more">没有更多了...</span></p>');

                        var $commentInput = $('<p class="comment_item"><input type="text" id="textInput"><input class="comment_post" type="button" value="发送评论"></p>');
                        commentDiv.append($commentNoMore).append($commentInput);
                        mt.append(commentDiv);
                        //console.log($(this));
                        mt.find(".zkpl").html("<span\">收起评论</span><img src=\"../public/images/yyy.png\" alt=\"error\">");
                        $(".comment_item").show();

                    }
                });
            } else {
                $("#login").click();
            }
        }

        mt.find(".comment_div").slideToggle(function () {
            // console.log(mt.find(".zkpl").text());
            mt.find(".zkpl").text() === "收起评论" ? mt.find(".zkpl").html("<span\">展开评论</span><img src=\"../public/images/xxx.png\" alt=\"error\">") : mt.find(".zkpl").html("<span\">收起评论</span><img src=\"../public/images/yyy.png\" alt=\"error\">");
        });
    });

    //发布评论
    $("section").on("click", ".comment_post", function () {
        // console.log($(this).prev());
        var $commentBtn = $(this);
        if (!$commentBtn.prev().val()) {
            // console.log(0);
            $commentBtn.prev().css("border", "1px solid red")
        } else {
            // console.log($(this).parent().parent().parent().attr("id"));
            $.ajax({
                url: "http://127.0.0.1:2245/commentNew",
                async: true,
                type: "GET",
                dataType: "json",
                data: "videoId=" + $commentBtn.parent().parent().parent().attr("id") + "&&comment=" + $commentBtn.prev().val() + "&&userId=" + window.localStorage.getItem('userId') + "&&token=" + window.localStorage.getItem('token') + "&&realName=" + window.localStorage.getItem('nickname'),
                success: function (data) {
                    // alert( "Data Saved: " + data );
                    // console.log(data);
                    // console.log($commentBtn.parent().prev());
                    var $myComment = '<p class="comment_item fdfdW"><span>你:' + $commentBtn.prev().val() + '</span></p>';
                    $commentBtn.parent().prev().before($myComment);
                    $commentBtn.text("评论成功").attr('disabled', 'false').prev().attr('readonly', 'readonly');
                    setTimeout(function () {
                        $commentBtn.parent().hide();
                    }, 500)
                }
            });
        }
    });

    //删除评论
    $("section").on("click", ".comment_del", function () {
        // console.log($(this).prev());
        var $commentDelBtn = $(this);

        // console.log($(this).parent().parent().parent().attr("id"));
        $.ajax({
            url: "http://127.0.0.1:2245/commentDel",
            async: true,
            type: "GET",
            dataType: "json",
            data: "userId=" + window.localStorage.getItem('userId') + "&&token=" + window.localStorage.getItem('token') + "&&commentId=" + $commentDelBtn.parent().attr("id"),
            success: function (data) {
                // alert( "Data Saved: " + data );
                // console.log(data);
                // var $myComment = '<p class="comment_item fdfdW"><span>你:' + $commentBtn.prev().val() + '</span></p>';
                // $commentBtn.parent().prev().before($myComment);
                // $commentBtn.text("评论成功").attr('disabled', 'false').prev().attr('readonly', 'readonly');
                $commentDelBtn.text("删除成功");
                setTimeout(function () {
                    $commentDelBtn.parent().hide();
                }, 500)
            }
        });

    });

    //判断登录状态
    if (window.localStorage.getItem("token")) {
        $("#login").hide().prev().show().text(window.localStorage.getItem("nickname"));
    } else {
    }

    //初始视频列表
    $.ajax({
        type: "GET",
        url: "http://127.0.0.1:2245/videoList",
        data: "videoId=0",
        async: true,
        success: function (data) {
            // console.log(data);
            var $videoList = $('<div class="every_video"></div>');
            data.data.forEach(function (ele) {
                every_videoId++;
                var $videoItem = $('<div class="video_item" id=' + ele.id + '></div>');
                var $img = $('<video src="../' + ele.video + '"controls="controls">您的浏览器不支持 video 标签。</video>');
                // var $img = $('<embed src="../'+ele.video+'" style="height:240px;width:320px" type="audio/mpeg" autostart="1" loop="0">');
                var $author = $('<p class="author">作者:' + ele.real_name + '</p>');
                var $title = $('<p class="title">' + ele.title + '</p>');
                var $comment = $('<p class="zkpl"><span">展开评论</span><img src="../public/images/xxx.png" alt="error"></p>');
                $videoItem.append($title).append($author).append($img).append($comment);
                $videoList.append($videoItem);
            });
            $("section").append($videoList);
            if (data.data.length < 10) {
                $('#loading').hide();
                $('#no_more').show();
            }
            // $("#profile").click();
        }
    });

    //滚动监听
    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();    //滚动条距离顶部的高度
        var scrollHeight = $(document).height();   //当前页面的总高度
        var clientHeight = $(window).height();    //当前可视的页面高度
        // console.log("top:"+scrollTop+",doc:"+scrollHeight+",client:"+clientHeight);
        if (type == 'login') {
            //登录
        } else {
            //列表
            if (scrollTop + clientHeight >= scrollHeight) {   //距离顶部+当前高度 >=文档总高度 即代表滑动到底部
                //滚动条到达底部
                if (type == "every_video") {
                    var url = "http://127.0.0.1:2245/videoList?videoId=" + every_videoId;
                } else if (type == "my_video") {
                    var url = "http://127.0.0.1:2245/myVideoList?videoId=" + my_videoId + "&&userId=" + window.localStorage.getItem("userId") + "&&token=" + window.localStorage.getItem("token");
                }
                // console.log('底部');
                $.ajax({
                    type: "GET",
                    url: url,
                    async: true,
                    success: function (data) {
                        data.data.forEach(function (ele) {
                            // console.log(ele);
                            if (type == "every_video") {
                                every_videoId++;
                                var $videoItem = $('<div class="video_item" id="'+ele.id+'"></div>');
                                var $img = $('<video src="../' + ele.video + '"controls="controls">您的浏览器不支持 video 标签。</video>');
                                // var $img = $('<embed src="../'+ele.video+'" style="height:240px;width:320px" type="audio/mpeg" autostart="1" loop="0">');
                                var $author = $('<p class="author">作者:' + ele.real_name + '</p>');
                                var $title = $('<p class="title">' + ele.title + '</p>');
                                $videoItem.append($title).append($img).append($author);
                                $(".every_video").append($videoItem);
                            } else if (type == "my_video") {
                                my_videoId++;
                                var $myVideoItem = $('<div class="video_item" id="'+ele.id+'"></div>');
                                var $myImg = $('<video src="../' + ele.video + '"controls="controls">您的浏览器不支持 video 标签。</video>');
                                // var $img = $('<embed src="../'+ele.video+'" style="height:240px;width:320px" type="audio/mpeg" autostart="1" loop="0">');
                                var $myAuthor = $('<p class="author">作者:' + ele.real_name + '</p>');
                                var $myTitle = $('<p class="title">' + ele.title + '</p>');
                                $myVideoItem.append($myTitle).append($myImg).append($myAuthor);
                                $(".my_video").append($myVideoItem);
                            }

                        });
                        if (data.data.length < 10) {
                            $('#loading').hide();
                            $('#no_more').show();
                        } else {

                        }
                    }
                });
            } else if (scrollTop <= 0) {
                //滚动条到达顶部
                // alert(4)
                //滚动条距离顶部的高度小于等于0 TODO
            }

        }

    });

    //活动标签页切换
    $(".choice").on("click", function () {
        $(".choice").removeClass("active");
        $(this).addClass("active");
        // console.log(this.id);
        switch (this.id) {
            case "every_video":
                $(".my_video").hide();
                $(".every_video").show();
                $(".login").hide();
                $('#loading').show();
                $(".profile").hide();
                type = "every_video";
                break;
            case "my_video":
                if (window.localStorage.getItem("token")) {
                    $(".my_video").show();
                    $(".every_video").hide();
                    $(".login").hide();
                    $('#loading').show();
                    $(".profile").hide();
                    type = "my_video";
                    $.ajax({
                        type: "GET",
                        url: "http://127.0.0.1:2245/myVideoList",
                        async: true,
                        data: "videoId=0&&userId=" + window.localStorage.getItem('userId') + "&&token=" + window.localStorage.getItem('token'),
                        success: function (data) {
                            //console.log(data);
                            var $myVideoList = $('<div class="my_video"></div>');
                            data.data.forEach(function (ele) {
                                my_videoId++;
                                var $myVideoItem = $('<div class="video_item" id=' + ele.id + '></div>');
                                var $myImg = $('<video src="../' + ele.video + '"controls="controls">您的浏览器不支持 video 标签。</video>');                                // var $img = $('<embed src="../'+ele.video+'" style="height:240px;width:320px" type="audio/mpeg" autostart="1" loop="0">');
                                var $myAuthor = $('<p class="author">作者:' + ele.real_name + '</p>');
                                var $myTitle = $('<p class="title">' + ele.title + '</p>');
                                var $myComment = $('<p class="zkpl"><span">展开评论</span><img src="../public/images/xxx.png" alt="error"></p>');
                                $myVideoItem.append($myTitle).append($myImg).append($myAuthor).append($myComment);
                                $myVideoList.append($myVideoItem);
                            });
                            $("section").append($myVideoList);
                            if (data.data.length < 10) {
                                $('#loading').hide();
                                $('#no_more').show();
                            }
                        }
                    });
                } else {
                    $("#login").click();
                }

                break;
            case "login":
                $(".my_video").hide();
                $(".every_video").hide();
                $(".login").show();
                $("#loading").hide();
                $("#no_more").hide();
                type = "login";
                $(".profile").hide();
                break;
            case "profile":
                $(".my_video").hide();
                $(".every_video").hide();
                $(".login").hide();
                $("#loading").hide();
                $("#no_more").hide();
                $(".profile").show();
                refreshProfile();
                break;
        }
    });

    //登录操作
    $("#login-btn").on("click", function () {
        $.ajax({
            type: "GET",
            url: "http://127.0.0.1:2245/login",
            data: "username=" + $("#username").val() + "&&password=" + $("#password").val(),
            async: true,
            beforeSend: function () {
                // console.log("正在登录,请稍候");
                $("#login-btn").val("正在登录,请稍等");
                $("#login-btn").attr('disabled', 'true');
            },
            success: function (data) {
                // console.log(data);
                if (data.code == '200') {
                    // console.log("登录成功");
                    window.localStorage.setItem("userId", data.data[0]);
                    window.localStorage.setItem("token", data.data[1]);
                    window.localStorage.setItem("username", $("#username").val());
                    window.localStorage.setItem("nickname", data.data[2]);
                    $("#login").hide().prev().show().text(data.data[2]);

                    setTimeout(function () {
                        $("#login-btn").val("登录成功");
                        setTimeout(function () {
                            $("#every_video").click();//切换标签页
                        }, 500);
                    }, 500);

                }
            }
        });
    });

    //头像上传
    $("#upload").on("click", function () {
        var url = 'http://localhost:2245/upload';
        var formData = new FormData();
        // console.log($("#inputFile")[0].files[0]);
        // var uploadName = $("#inputFile").attr("name");
        formData.append('file', $("#inputFile")[0].files[0]);
        formData.append('userId', window.localStorage.getItem("userId"));
        formData.append('token', window.localStorage.getItem("token"));
        $.ajax({
            url: url,
            async: true,//是否异步
            dataType: "json",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                // console.log("正在进行,请稍候");
                $("#upload").val("正在上传").attr('disabled', 'true');
                $("#inputFile").attr('disabled', 'true');
            },
            success: function (responseStr) {
                if (responseStr.code === 200) {
                    // console.log("成功", responseStr);
                    $("#upload").val("上传成功").attr('disabled', 'true');
                    $("#inputFile").attr('disabled', 'true');
                    setTimeout(function () {
                        $('.avatar-modal').hide();
                        refreshProfile();
                    },1000);
                } else {
                    // console.log("失败", responseStr);
                    $("#upload").val("上传失败").attr('disabled', 'false');
                    $("#inputFile").attr('disabled', 'false');
                }
            },
            error: function (responseStr) {
                console.log(responseStr);
                console.log("error");
            }
        });
    });

    //视频上传
    $("#upload-v").on("click", function () {
        var url = 'http://localhost:2245/video';
        var formDataVideo = new FormData();
        // console.log($("#inputFile")[0].files[0]);
        // var uploadName = $("#inputFile").attr("name");
        formDataVideo.append('file', $("#upload-video")[0].files[0]);
        formDataVideo.append('userId', userId);
        formDataVideo.append('token', token);
        formDataVideo.append('realName', 'bb');
        formDataVideo.append('title', '题目');
        // formData.append("name",uploadName);
        $.ajax({
            url: url,
            async: true,//是否异步
            dataType: "json",
            type: "POST",
            data: formDataVideo,
            processData: false,
            contentType: false,
            beforeSend: function () {
                // console.log("正在进行,请稍候");
                $("#upload-v").text("正在上传").attr('disabled', 'true');
                $("#upload-video").attr('disabled', 'true');
            },
            success: function (responseStr) {
                if (responseStr.code === 200) {
                    // console.log("成功", responseStr);
                    $("#upload-v").text("上传成功").attr('disabled', 'true');
                    $("#upload-video").attr('disabled', 'true');
                } else {
                    // console.log("失败", responseStr);
                    $("#upload-v").text("上传失败").attr('disabled', 'false');
                    $("#upload-video").attr('disabled', 'false');
                }
            },
            error: function (responseStr) {
                console.log(responseStr);
                console.log("error");
            }
        });
    });

    //注销操作
    $("#logout-btn").on("click", function () {
        window.localStorage.clear();
        $(this).val("正在注销");
        setTimeout(function () {
            setTimeout(function () {
                $(this).val("注销成功");
            }, 500);
            window.location.reload();
        }, 500);

    });

    //更新页面个人信息页
    var refreshProfile = function () {
        if (window.localStorage.getItem("token")){
            $.ajax({
                url: "http://127.0.0.1:2245/getInfo",
                async:true,
                type: "GET",
                dataType:"json",
                data: "userId=" + window.localStorage.getItem("userId") + "&&token=" + window.localStorage.getItem("token"),
                success: function(data){
                    // alert( "Data Saved: " + data );
                    // console.log(data.data);
                    // console.log($("#profileList").next().children().first().children().first());
                    $("#profileList > p").first().text("昵称:"+data.data.realName);
                    $("#profileList > p").first().next().text("性别:"+data.data.gender);
                    $("#profileList > p").first().next().next().text("电话:"+data.data.phone);
                    $("#profileList > p").first().next().next().next().text("邮箱:"+data.data.email);
                    $("#profileList").next().children().first().children().first().attr("src",'.'+data.data.avatar);
                }
            });
        }
    };

    //修改头像
    $(".avatar").on("click",function () {
        $('.avatar-modal').show();
    });
    $("#unUpload").on("click",function () {
        $('.avatar-modal').hide();
    });

    //修改个人信息
    $(".profile-change-btn").on("click",function () {
        $(".profile-modal").show();
        $("#nickname").val($("#profileList > p").first().text().split(":")[1]);
        $("#gender").val($("#profileList > p").first().next().text().split(":")[1]);
        $("#phone").val($("#profileList > p").first().next().next().text().split(":")[1]);
        $("#email").val($("#profileList > p").first().next().next().next().text().split(":")[1]);
    });
    $("#noChange-profile").on("click",function () {
        $(".profile-modal").hide();
    });
    $("#change-profile").on("click",function () {
        console.log(1);
        $.ajax({
            url: "http://127.0.0.1:2245/setInfo",
            async:true,
            type: "GET",
            dataType:"json",
            data: "userId="+window.localStorage.getItem("userId")
            +"&&token="+window.localStorage.getItem("token")
            +"&&realName="+$("#nickname").val()
            +"&&gender="+$("#gender").val()
            +"&&phone="+$("#phone").val()
            +"&&email="+$("#email").val(),
            success: function(data){
                console.log(data);
                $("#change-profile").val("修改成功").attr("disabled", "disabled");
                setTimeout(function () {
                    $(".profile-modal").hide();
                    $("#change-profile").val("确定").removeAttr("disabled");
                    refreshProfile();
                },1000);
            },
            error:function (jqXHR) {
                console.log(jqXHR);
            }
        });
    })
});