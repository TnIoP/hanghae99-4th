$('#login').click(function () {
    let id = $('#id>input').val();
    let pw = $('#pw>input').val();

    $.ajax({
        type: "POST",
        url: "/logins",
        data: {
            id_give: id, pw_give: pw
        },
        success: function (response) {
            if (response['result'] == 'success') {
                $.cookie('mytoken', response['token']);
                swal({
                    title: '로그인에 성공하셨습니다.',
                    text: '메인 페이지로 이동합니다.',
                    icon: "success",
                    buttons: false,
                    timer: 2500
                }).then(function () {
                    window.location.replace('/');
                })
            } else {
                swal({
                    text: '아이디 비밀번호를 정확히 입력해주세요.',
                    icon: "error",
                    button: '확인',
                })
            }
        }
    })
})