/*消息*/
function showMsg(elementId, msg) {
    var msgbox = $('#' + elementId);
    msgbox.html(msg);
    setTimeout(function () { msgbox.html('') }, 3000);
}
/*评论*/
function loadComment(id, forid, ctype, page) {
    var contentBox = $('#' + id);
    $.ajax({
        type: "get",
        url: '/Ajax/GetComment/',
        data: { ForId: forid, ctype: ctype, page: page },
        dataType: "html",
        cache: true,
        async: true,
        success: function (data) {
            var content = $('#box', $(data));
            if (content.length > 0) {
                contentBox.html(content.html());
                changeUrl();
            }
            else {
                contentBox.html('<span class="loaderror">内容加载失败！</span>');
            }
        },
        error: function () { contentBox.html('<span class="loaderror">内容加载失败！</span>'); }
    });
}
function backTo(uname) {
    $('#txtcomment').html('回复:' + uname + ' ').focus();

}
function PostComment() {
    var bodycontent = $('#txtcomment');
    var username = $('#txtusername').val();
    var email = $('#txtemail').val();
    var ctype = parseInt($('#txtCommentType').val());
    var forid = parseInt($('#txtForId').val());
    if (username.length <= 0 || username == '称呼(必填)') {
        showMsg('postcommentmsg', '称呼为必填项！');
        return;
    }
    var ismail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (email.length <= 0 || email == '邮箱(不会被公开,必填)') {
        showMsg('postcommentmsg', '邮箱为必填项！');
        return;
    }
    if (!ismail.test(email)) {
        showMsg('postcommentmsg', '邮箱格式不正确！');
        return;
    }

    var content = bodycontent.val();
    if (content.length > 0 && content.length < 500 && content != '评论内容...(最多500字)') {
        $.ajax({
            type: "POST",
            url: '/Ajax/PostComment/',
            data: { ForId: forid, ctype: ctype, content: bodycontent.val(), uname: username, email: email },
            dataType: "json",
            cache: false,
            async: false,
            success: function (data) {
                if (data) {
                    if (data.Success) {
                        showMsg('postcommentmsg', '操作成功！');
                        loadComment('commentbox', forid, ctype, 1); //重新加载
                    }
                    else {
                        showMsg('postcommentmsg', data.Msg);
                    }
                }
            },
            error: function () { showMsg('postcommentmsg', '网络异常！'); }
        });
    }
    else {
        showMsg('postcommentmsg', '确认字数！');
    }
}

function changeUrl() {
    var ctype = parseInt($('#txtCommentType').val());
    var forid = parseInt($('#txtForId').val());
    $('.pageul a').each(function (i, n) {
        var mya = $(n);
        var oldHref = mya.attr('href');
        var newHref = oldHref.split('page=')[1];
        var hrefs = 'javascript' + ':loadComment("commentbox",' + forid + ',' + ctype + ',' + newHref + ')'
        mya.attr('href', hrefs);
    });
}