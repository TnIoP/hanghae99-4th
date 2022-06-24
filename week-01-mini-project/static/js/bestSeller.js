$(document).ready(function () {
    show_bestseller();
    check_login();
});

//로그아웃 기능
$('.join_mem').click(function () {
    $.removeCookie('mytoken', {path: '/'}); // = > true
})

$('.userbook-close-btn').click(function () {
    $('.modal-hide').toggleClass('opacity-off')
    $('.book-box-bg').toggleClass('opacity-on')
})

function input_bookreview(clicked_id) {
    let title = document.getElementById("modal_title").innerHTML;
}

function show_bestseller() {
    $.ajax({
        type: 'GET',
        url: '/insert_bookinfo',
        data: {},
        success: function (response) {
            let bestseller = response['bestseller']
            for (let i = 0; i < bestseller.length; i++) {
                let title = bestseller[i]['title'];
                let author = bestseller[i]['author'];
                let publisher = bestseller[i]['publisher'];
                let publish_date = bestseller[i]['publish_date'];
                let img_url = bestseller[i]['image_url'];

                let temp_html = `<div onclick="select_book(this.id)" id="book${i}" class="book-box">
                                    <img src="${img_url}" >
                                    <p>${title}<p>
                                    <p>${author}</p>
                                    <p>${publisher}</p>
                                    <p>${publish_date}</p>
                                 </div>`;
                $('#books').append(temp_html);
            }
        }
    })
}


//로그인중인지 확인
function check_login() {
    let value = $.cookie('mytoken');

    if (value) {
        $('.login_no').addClass("hidden");
        $('.login_yes').removeClass("hidden");
    } else {
        $('.login_no').removeClass("hidden");
        $('.login_yes').addClass("hidden");
        $('#review_text').addClass('opacity-on');
        $('#send_review').addClass('opacity-on');
    }
}


function select_book(clicked_id) {
    $('#modal').toggleClass('opacity-off')
    $('.book-box-bg').toggleClass('opacity-on')

    let curr_Element = document.getElementById(clicked_id);
    let child_Elements = curr_Element.childNodes;

    let img_url = child_Elements[1]['src'];
    let title = child_Elements[3].innerHTML;
    let author = child_Elements[5].innerHTML;
    let publisher = child_Elements[7].innerHTML;
    let publish_date = child_Elements[9].innerHTML;

    document.getElementById("modal_img_url").src = img_url;
    document.getElementById("modal_title").innerHTML = title;
    document.getElementById("modal_author").innerHTML = author;
    document.getElementById("modal_publisher").innerHTML = publisher;
    document.getElementById("modal_publishdate").innerHTML = publish_date;

    $.ajax({
        type: 'POST',
        url: '/get_reviews',
        data: {
            title_give: title,
        },
        success: function (response) {
            $('#modal-reviews').empty();

            let reviews = response['reviews']
            for (let i = 0; i < reviews.length; i++) {
                let user_id = reviews[i]['user_id'];
                let review = reviews[i]['review'];
                let comment_key = reviews[i]['comment_key'];
                let temp_html = `
                        <div class="modal-review-textbox">
                            <td>${user_id}</td><span>: ${review}</span><span id="id-comment${i}" style="visibility:hidden;">${comment_key}</span><button class="delete_button_comment" id="id-comment${i}" onclick="delete_comment(this.id)">삭제</button></td>
                        </div>
                 `;
                $('#modal-reviews').append(temp_html);
            }
        }
    })
}

function modal_close() {
    document.getElementById("modal").style.display = 'none'
}



//=======================================================================
//                             리뷰 구현
//=======================================================================
function send_review() {
    //login_id를 가진 <div>안의 <span>태그 값을 가져오기위해 childNodes 값을 읽어서 login_id에 저장
    let login_id = document.getElementById("login_id").childNodes[0]['nodeValue'];
    //리뷰 입력 모달창의 input 박스에서 입력 받은 값 저장
    let review_text = document.getElementById("review_text").value;
    let title = document.getElementById("modal_title").innerText;
    //모달창 input 박스 비룸
    document.getElementById("review_text").value = '';

    $.ajax({
        type: 'POST',
        url: '/send_review',
        data: {
            id_give: login_id,
            title_give: title, //책 구별 변수
            review_give: review_text,
        },
        success: function (response) {
            //기존에 작성되어있던 리뷰를 지움
            $('#modal-reviews').empty();
            let reviews = response['reviews'] //책 타이틀을 키 값으로 얻어온 review 정보들

            //리뷰 수 만큼 반복 실행
            for (let i = 0; i < reviews.length; i++) {
                let user_id = reviews[i]['user_id'];
                let review = reviews[i]['review'];
                let comment_key = reviews[i]['comment_key']
                //user_id 출력,
                //i 값을 이용하여 각 리뷰들을 구분하는 id 값을 넣어줌
                //리뷰를 삭제할 때 이 아이디 값을 key 값으로 사용하게 됨.
                let temp_html = `
                        <div class="modal-review-textbox">
                            <td>${user_id}</td> 
                            <span>: ${review}</span><span id="id-comment${i}" style="visibility:hidden;">${comment_key}</span>
                            <button class="delete_button_comment" id="id-comment${i}" onclick="delete_comment(this.id)">삭제</button>
                        </div>
                 `;
                $('#modal-reviews').append(temp_html);
            }
        }
    })
}


// 추천 책 삭제
function delete_comment(id) {
    let comment_key = $('#' + id).text();

    swal("정말 삭제하시겠어요?", {
        dangerMode: true,
        icon: 'warning',
        buttons: ['취소','삭제'],
    }).then(function (value) {
        if (value) {
            $.ajax({
                type: "POST",
                url: "/delete_comment",
                data: {
                    comment_key_give: comment_key
                }, success: function (response) {
                    swal({
                        title: '댓글이 삭제 되었습니다.',
                        icon: 'info',
                        buttons: false,
                        timer: 2000
                    }).then(function () {
                        window.location.reload();
                    })
                }
            })
        } else {
            $('.swal-modal').close();
        }
    })
}