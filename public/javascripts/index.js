$(function () {
    $("#upload").on("click",function () {//
        var url = 'http://localhost:2245/upload';
        $.ajax({
            url:url,
            async:true,//是否异步
            dataType:"json",
            type:"POST",
            

        });
    });
});