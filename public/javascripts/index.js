$(function () {
    $("#upload").on("click", function () {//
        var url = 'http://localhost:2245/upload';
        var formData = new FormData();
        // console.log($("#inputFile")[0].files[0]);
        // var uploadName = $("#inputFile").attr("name");
        formData.append('file', $("#inputFile")[0].files[0]);
        // formData.append("name",uploadName);
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
                $("#upload").text("正在上传").attr('disabled','true');
                $("#inputFile").attr('disabled','true');
            },
            success: function (responseStr) {
                if (responseStr.code === 200) {
                    console.log("成功" , responseStr);
                    $("#upload").text("上传成功").attr('disabled','true');
                    $("#inputFile").attr('disabled','true');
                } else {
                    console.log("失败" , responseStr);
                    $("#upload").text("上传失败").attr('disabled','false');
                    $("#inputFile").attr('disabled','false');
                }
            },
            error: function (responseStr) {
                console.log(responseStr);
                console.log("error");
            }
        });
    });
});