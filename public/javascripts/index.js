$(function () {
    //测试预设项
    var userId = 1;
    var token = 'f2511b004e7211e8a5a105ea976ed599';
    var videoId = 999;
    //初始视频列表
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:2245/videoList?videoId=0",
        async:true,
        success: function (data) {
            //console.log(data);
            data.data.forEach(function (ele) {
                console.log(ele);
                if(ele.id<videoId){
                    videoId = ele.id;
                }
                console.log(videoId);
                var $videoItem=$('<div class="video_item"></div>');
                var $img = $('<video src="../'+ele.video+'" width="320" height="240" preload="auto">您的浏览器不支持 video 标签。</video>');
                // var $img = $('<embed src="../'+ele.video+'" style="height:240px;width:320px" type="audio/mpeg" autostart="1" loop="0">');
                var $author = $('<p class="author">作者:'+ele.real_name+'</p>');
                var $title = $('<p class="title">'+ele.title+'</p>');
                $videoItem.append($title).append($img).append($author);
                $("section").append($videoItem);
            });
            if(data.data.length<10){
                var $noMore = $('<p class="loading">没有更多了...</p>');
                $("section").append($noMore);
                $('#loading').hide();
            }
        }
    });
    //滚动监听
    $(window).scroll(function(){

        var scrollTop = $(this).scrollTop();    //滚动条距离顶部的高度
        var scrollHeight = $(document).height();   //当前页面的总高度
        var clientHeight = $(window).height();    //当前可视的页面高度
        console.log("top:"+scrollTop+",doc:"+scrollHeight+",client:"+clientHeight);
        if(scrollTop + clientHeight >= scrollHeight){   //距离顶部+当前高度 >=文档总高度 即代表滑动到底部
            //滚动条到达底部
            console.log('底部');
            $.ajax({
                type:"GET",
                url:"http://127.0.0.1:2245/videoList?videoId="+videoId,
                async:true,
                success: function (data) {
                    //console.log(data);
                    data.data.forEach(function (ele) {
                        // console.log(ele);
                        if(ele.id>videoId){
                            videoId = ele.id;
                        }
                        console.log(videoId);
                        var $videoItem=$('<div class="video_item"></div>');
                        var $img = $('<video src="../'+ele.video+'" width="320" height="240" preload="auto">您的浏览器不支持 video 标签。</video>');
                        // var $img = $('<embed src="../'+ele.video+'" style="height:240px;width:320px" type="audio/mpeg" autostart="1" loop="0">');
                        var $author = $('<p class="author">作者:'+ele.real_name+'</p>');
                        var $title = $('<p class="title">'+ele.title+'</p>');
                        $videoItem.append($title).append($img).append($author);
                        $("section").append($videoItem);
                    });
                    if(data.data.length<10){
                        var $noMore = $('<p class="loading">没有更多了...</p>');
                        $("section").append($noMore);
                        $('#loading').hide();
                    }else{

                    }
                }
            });
        }else if(scrollTop<=0){
            //滚动条到达顶部
            // alert(4)
            //滚动条距离顶部的高度小于等于0 TODO
        }
    });

    //活动标签页切换
    $(".choice").click(function () {
        $(".choice").removeClass("active");
        $(this).addClass("active");
        // console.log(this.id);
        switch (this.id) {
            case "every_video":
                break;
            case "my_video":
                break;
        }
    });
    //头像上传
    $("#upload").on("click", function () {//
        var url = 'http://localhost:2245/upload';
        var formData = new FormData();
        // console.log($("#inputFile")[0].files[0]);
        // var uploadName = $("#inputFile").attr("name");
        formData.append('file', $("#inputFile")[0].files[0]);
        formData.append('userId', userId);
        formData.append('token', token);
        $.ajax({
            url: url,
            async: true,//是否异步
            dataType: "json",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                console.log("正在进行,请稍候");
                $("#upload").text("正在上传").attr('disabled', 'true');
                $("#inputFile").attr('disabled', 'true');
            },
            success: function (responseStr) {
                if (responseStr.code === 200) {
                    console.log("成功", responseStr);
                    $("#upload").text("上传成功").attr('disabled', 'true');
                    $("#inputFile").attr('disabled', 'true');
                } else {
                    console.log("失败", responseStr);
                    $("#upload").text("上传失败").attr('disabled', 'false');
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
    $("#upload-v").on("click", function () {//
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
                console.log("正在进行,请稍候");
                $("#upload-v").text("正在上传").attr('disabled', 'true');
                $("#upload-video").attr('disabled', 'true');
            },
            success: function (responseStr) {
                if (responseStr.code === 200) {
                    console.log("成功", responseStr);
                    $("#upload-v").text("上传成功").attr('disabled', 'true');
                    $("#upload-video").attr('disabled', 'true');
                } else {
                    console.log("失败", responseStr);
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
    //end
});