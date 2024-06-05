document.addEventListener('DOMContentLoaded', () => {
    const id = document.getElementById("myPageUserName");
    const idVal = id.innerText;
    const modifyInfo =  document.getElementById("modiftMyInfo");
    const headBtn = document.getElementById("load-header");
    const moveContainer = document.getElementById("header-container");
    // 쿠폰페이지
    const myPageCoupon = "/user/myPageCoupon";
    // 수정페이지(일반 회원만)
    const myPageModify = "/user/myPageModify";
    // 배송지 수정
    const myPageAddress = "/user/myPageAddress";
    // 결제내역
    const myPagePayment = "/user/myPagePayment";
    // 이용중인 구독권
    const myPageSubscribe = "/user/myPageSub";

    isSocialUser(idVal).then(result=>{
        console.log(result);
        if(result !="일반"){
                modifyInfo.style.display = "none";
            }
    });

    // 마이페이지 실행되면 나오는 페이지 자동 생성
    // pageCall(myPageSubscribe);

    // 페이지 바꿔주는 이벤트
document.addEventListener("click", (e) => {
    let myPageMoveBtn = e.target.id;
    console.log(myPageMoveBtn);
    if (myPageMoveBtn == 'myPageCoupon') {
        console.log("쿠폰 페이지 인")
        moveContainer.innerHTML = "";
        pageCall(myPageCoupon);
    }
    if (myPageMoveBtn == 'myPageModify') {
        console.log("수정 페이지 인")
        moveContainer.innerHTML = "";
        pageCall(myPageModify);
    }
    if(myPageMoveBtn == 'myPageAddress') {
        console.log("주소 페이지 인")
        moveContainer.innerHTML = "";
        pageCall(myPageAddress);
    }
    if(myPageMoveBtn == 'myPagePayment') {
        console.log("결제 페이지 인")
        moveContainer.innerHTML = "";
        pageCall(myPagePayment);
    }
    if(myPageMoveBtn == 'myPageSub'){
        console.log("구독 페이지 인");
        moveContainer.innerHTML = "";
        pageCall(myPageSub);
    }

});





// 페이지 불러오는 메서드
function pageCall(link) {
    var request = new XMLHttpRequest();
    request.open("GET", link, true);
    request.send();
    request.onreadystatechange = function () {
        if (request.status === 200) {
            document.getElementById("header-container").innerHTML = request.responseText;
            console.log("성공");
        }
    }
}

// 가입 유형에 따라 개인정보 수정 활성화 / 비활성화
async function isSocialUser(id) {
    try {
        const resp = await fetch("/user/isSocialUser/" + id);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error);
        }
    }
});