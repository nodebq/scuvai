$(function () {
    var userId = 1;
    var token = '6ca5a6b04b5c11e8ab5e6dded1f3e7b7';
    $("#upload").on("click", function () {//
        var url = 'http://localhost:2245/upload';
        var formData = new FormData();
        // console.log($("#inputFile")[0].files[0]);
        // var uploadName = $("#inputFile").attr("name");
        formData.append('file', $("#inputFile")[0].files[0]);
        formData.append('userId', userId);
        formData.append('token',token);
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
    $("#upload-v").on("click", function () {//
        var url = 'http://localhost:2245/video';
        var formDataVideo = new FormData();
        // console.log($("#inputFile")[0].files[0]);
        // var uploadName = $("#inputFile").attr("name");
        formDataVideo.append('file', $("#upload-video")[0].files[0]);
        formDataVideo.append('userId', userId);
        formDataVideo.append('token',token);
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
});