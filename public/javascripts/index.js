$(function () {
    $("#upload").on("click", function () {//
        var url = 'http://localhost:2245/upload';
        var formData = new FormData();
        console.log($("#inputFile")[0].files[0]);
        formData.append('file', $("#inputFile")[0].files[0]);
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
                $("upload").text("正在上传").attr('disabled','true');
            },
            success: function (responseStr) {
                if (responseStr.status === 0) {
                    console.log("成功" + responseStr);
                    $("upload").text("上传成功").attr('disabled','true');
                } else {
                    console.log("失败");
                    $("upload").text("上传失败").attr('disabled','false');
                }
            },
            error: function (responseStr) {
                console.log("error");
            }
        });
    });
});