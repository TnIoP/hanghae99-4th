AOS.init();

function is_nickname(asValue) {
    let regExp = /^(?=.*[a-zA-Z])[-a-zA-Z0-9_.]{2,20}$/;
    return regExp.test(asValue);
}

function is_password(asValue) {
    let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{6,20}$/;
    return regExp.test(asValue);
}

$('#join').click(function () {
        $.ajax({
            type: "GET",
            url: "/signup",
            data: {},
            success: function (response) {
                let bookReview = response['bookReview']
                let id = $('#id>input').val();
                let pw = $('#pw>input').val();
                let pw_chk = $('#pw_again>input').val();
                let pw_chk_regEx = is_password(pw_chk);
                let id_regEx = is_nickname(id)

                if (id_regEx) {
                    for (let i = 0; i < bookReview.length; i++) {
                        if (id === bookReview[i]['id']) {
                            return swal('이미 존재하는 아이디입니다.')
                        }
                    }
                } else {
                    if (id == 0) {
                        return swal('아이디를 입력해주세요.', '영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-20자 길이', 'error', {
                            button: '확인'
                        })
                    }
                    return swal('아이디 형식을 확인해주세요.', '영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-20자 길이', 'error', {
                        button: '확인'
                    })
                }
                if (pw == 0) {
                    return swal('비밀번호를 입력해주세요.', '영문과 숫자 필수 포함, 특수문자 사용 가능 8-20자 길이', 'error', {
                        button: '확인'
                    })
                } else if (pw_chk == 0) {
                    return swal('비밀번호 확인칸을 입력해주세요.', '영문과 숫자 필수 포함, 특수문자 사용 가능 8-20자 길이', 'error', {
                        button: '확인'
                    })
                } else if (pw != pw_chk) {
                    return swal('비밀번호가 일치하지 않습니다.', '다시한번 확인해주세요!', 'error', {
                        button: '확인'
                    })
                } else if (!(pw_chk_regEx)) {
                    return swal('비밀번호 형식이 올바르지 않습니다.', '영문과 숫자 필수 포함, 특수문자 사용 가능 8-20자 길이', 'error', {
                        button: '확인'
                    })
                } else {
                    $.ajax({
                        type: "POST",
                        url: "/join_info",
                        data: {
                            id_give: id, pw_give: pw
                        },
                        success: function (response) {
                            swal({
                                title: '모두의 책 리뷰 회원이 되셨습니다.',
                                text: '메인 페이지로 이동합니다.',
                                icon: "success",
                                buttons: false,
                                timer: 2500
                            }).then(function () {
                                window.location.replace('/');
                            })
                        }
                    })
                }
            }
        })
    }
)


$('#user_id').keyup(function () {
    $.ajax({
        type: "GET",
        url: "/signup",
        data: {},
        success: function (response) {
            let bookReview = response['bookReview']
            let id = $('#id>input').val();
            let id_regEx = is_nickname(id);
            if (id_regEx) {
                for (let i = 0; i < bookReview.length; i++) {
                    if (id === bookReview[i]['id']) {
                        return $('#wrongId').text('- 이미 존재하는 아이디입니다.'), $('#wrongId').css('color', 'red')
                    } else if (id !== bookReview[i]['id']) {
                        $('#wrongId').text('- 사용 가능한 아이디입니다.')
                        $('#wrongId').css('color', '#fed')
                    }
                }
            } else {
                $('#wrongId').text('- 영문과 숫자, 일부 특수문자(._-) 사용 가능. 2-20자 길이'), $('#wrongId').css('color', 'red')
            }
            if ($('#user_id').val() == 0) {
                $('#wrongId').text('- 아이디를 입력해주세요.')
            }
        }
    })
})


// ==실시간 비밀번호 일치-불일치 검사==
// 비밀번호 란에 키보드를 입력할 때 마다 user_pw 속성을 가진 id값을 체크하는 함수
$('#user_pw').keyup(function () {
    let pw = $('#pw>input').val();  // 비밀번호 값을 불러온다
    let pw_regEx = is_password(pw); // 정규식으로 비밀번호가 맞는지 체크
    let pw_chk = $('#pw_again>input').val(); // 비밀번호 확인

    if (!(pw_regEx)) {  // 비밀번호가 정규식이 아닐때
        $('#wrongPw').text('- 비밀번호의 형식을 확인해주세요. 영문과 숫자 필수 포함, 특수문자(!@#$%^&*) 사용가능 8-20자')
        $('#wrongPw').css('color', 'red')
    } else if (pw_regEx && (pw_chk == 0)) {  // 비밀번호가 정규식이면서 비밀번호 확인란이 비어있을때
        $('#wrongPw').text('- 비밀번호 확인칸을 입력해주세요')
        $('#wrongPw').css('color', '#fed')
    }
    if (pw_regEx) {  // 비밀번호가 정규식일때
        if ((pw !== pw_chk) && (pw_chk != 0)) {  // 비밀번호가 정규식이 아니면서 비밀번호 확인란이 비어있지 않을 때
            $('#wrongPw').text('- 비밀번호가 일치하지 않습니다.')
            $('#wrongPw').css('color', 'red')
        } else if (pw === pw_chk) {  // 비밀번호가 비밀번호확인과 일치할때
            $('#wrongPw').text('- 비밀번호가 일치합니다.')
            $('#wrongPw').css('color', '#fed')
        }
    }
    if (pw == 0) {  // 비밀번호 란이 비어있을때
        $('#wrongPw').text('- 비밀번호를 입력해주세요 ')
        $('#wrongPw').css('color', '#fed')
    }
})

// 비밀번호 확인란에 키보드를 입력할 때 마다 user_pw_chk 속성을 가진 id값을 체크하는 함수
$('#user_pw_chk').keyup(function () {
    let pw = $('#pw>input').val(); // 비밀번호
    let pw_chk = $('#pw_again>input').val(); // 비밀번호 확인
    let pw_regEx = is_password(pw); // 비밀번호 정규식 확인
    let pw_chk_regEx = is_password(pw_chk); // 비밀번호 확인란의 값이 정규식 확인

    if (pw_regEx && pw_chk_regEx) {  // 비밀번호가 정규식을 따르면서 비밀번호 확인도 정규식을 따를 때
        if (pw !== pw_chk) { // 비밀번호와 비밀번호 확인이 일치하지 않을 때
            $('#wrongPw').text('- 비밀번호가 일치하지 않습니다.')
            $('#wrongPw').css('color', 'red')
        } else if (pw === pw_chk) { // 비밀번호와 비밀번호 확인이 일치할 때
            $('#wrongPw').text('- 비밀번호가 일치합니다.')
            $('#wrongPw').css('color', '#fed')
        }
    }
    // 비밀번호와 비밀번호 확인이 정규식을 따르지 않으면서 비밀번호와 비밀번호 확인이 같을때
    if (!(pw_regEx) && !(pw_chk_regEx) && (pw === pw_chk)) {
        $('#wrongPw').text('- 비밀번호의 형식을 확인해주세요. 영문과 숫자 필수 포함, 특수문자(!@#$%^&*) 사용가능 8-20자')
    }
    if (pw_chk == 0) { // 비밀번호 확인란이 비어있을 때
        $('#wrongPw').text('- 비밀번호를 입력해주세요 ')
        $('#wrongPw').css('color', '#fed')
    }
    if ((pw !== pw_chk) && (pw_chk != 0)) { // 비밀번호와 비밀번호 확인이 같지 않으면서, 비밀번호 확인란이 비어있지 않을 때
        $('#wrongPw').text('- 비밀번호가 일치하지 않습니다.')
        $('#wrongPw').css('color', 'red')
    }
})
