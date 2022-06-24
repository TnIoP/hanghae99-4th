$(document).ready(function () {
    check_login();
});

$('.review_close').click(function () {
    $('.review').toggleClass('opacity-off')
    $('.book-review').toggleClass('opacity-on')
    $('.review_button').toggleClass('opacity-on')
})

$('.userSelect').click(function () {
    $('.modal-hide').toggleClass('opacity-off')
    $('.book-review').toggleClass('opacity-on')
    $('.review_button').toggleClass('opacity-on')
})

$('.userbook-close-btn').click(function () {
    $('.modal-hide').toggleClass('opacity-off')
    $('.book-review').toggleClass('opacity-on')
    $('.review_button').toggleClass('opacity-on')
})

$('.upload_review').click(function () {
    let url = $('#reviewURL').val()
    let reviewMemo = $('#reviewMemo').val()
    let reviewTitle = $('#reviewTitle').val()

    if (url == 0) {
        swal({
            title: 'url을 입력해주세요.',
            icon: 'error',
            buttons: false,
            timer: 1000
        })
    } else {
        swal({
            title: '등록중입니다. 잠시만 기다려주세요.',
            icon: 'info',
            buttons: false,
            timer: 1500,
        }).then(function () {
            $.ajax({
                type: "POST",
                url: "/viewList",
                data: {url_give: url, reviewMemo_give: reviewMemo, reviewTitle_give: reviewTitle},
                success: function (response) {
                    swal({
                        title: '등록되었습니다!',
                        text: '소중한 리뷰를 남겨주셔서 감사합니다.',
                        icon: 'success',
                        button: '확인'
                    }).then(function () {
                        window.location.reload();
                    })
                }
            })
        })
    }


})

$('.userSelect').click(function () {
    $('#userSelect_click').toggleClass('hide-out');
})


//모달창 클릭
$('.select_close').click(function () {
    $('#userSelect_click').removeClass('hide-out');
})


$('.join_mem').click(function () {
    $.removeCookie('mytoken', {path: '/'}); // = > true
})

// 로그인 상태 유무에 따른 상황
function check_login() {
    let value = $.cookie('mytoken');

    if (value) {
        $('.login_no').addClass("hidden");
        $('.login_yes').removeClass("hidden");
        $('.review_button').click(function () {
            $('.review').toggleClass('opacity-off')
            $('.book-review').toggleClass('opacity-on')
            $('.review_button').toggleClass('opacity-on')
            swal({
                title: '꼭 참고해주세요!',
                text: '등록하실 책은 교보문고에서 상세 URL을 가져와주세요.',
                button: '확인',
                icon: 'info'
            })
        })
    } else {
        $('.login_no').removeClass("hidden");
        $('.login_yes').addClass("hidden");
        $('.review_button').click(function () {
            swal({
                title: '로그인을 해주세요.',
                icon: 'info',
                button: '확인'
            })
        })
    }
}

function select_userbook(clicked_id) {
    document.getElementById("modal").style.display = 'block';

    let curr_Element = document.getElementById(clicked_id);
    let child_Elements = curr_Element.childNodes;
    console.log(curr_Element);
    console.log(child_Elements);

    let title = child_Elements[3].innerHTML;
    let img_url = child_Elements[1]['currentSrc'];

    document.getElementById("modal_img_url").src = img_url;
    document.getElementById("modal_title").innerText = title;

    $.ajax({
        type: "POST",
        url: "/get_user_review",
        data: {
            title_give: title,
        },
        success: function (response) {
            let user_review = response['user_review'];
            let review_title = user_review[0]['reviewTitle'];
            let review_content = user_review[0]['reviewMemo'];
            let review_author = user_review[0]['author'];
            // let review_ = user_review[0]['reviewMemo'];
            // let review_content = user_review[0]['reviewMemo'];


            console.log(user_review)
            console.log(review_title, review_content);

            document.getElementById('review_title').innerText = review_title;
            document.getElementById('review_content').innerText = review_content;
            document.getElementById('modal_author').innerText = review_author;
            // document.getElementById('modal_publisher').innerText = review_content;
            // document.getElementById('modal_publishdate').innerText = review_content;
        }
    })
}

// 추천 책 삭제
function delete_book() {
    let img_url = $('#modal_img_url').attr("src");
    swal({
        dangerMode: true,
        title: '정말 삭제하시겠습니까?',
        icon: 'warning',
        buttons: ['취소', '삭제']
    }).then(function (value) {
            if (value) {
                $.ajax({
                    type: "POST", url: "/delete", data: {img_url_give: img_url}, success: function (response) {
                        swal({})
                        window.location.reload();
                    }
                })
            } else {
                $('.swal-modal').close();
            }
        }
    )
}