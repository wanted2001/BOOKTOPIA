document.addEventListener('DOMContentLoaded', () => {
    const idElement = document.getElementById("myPageUserName");
    const modifyInfo = document.getElementById("modifyMyInfo");
    const moveContainer = document.getElementById("myPageInfoRightWrapId");
    const moveContainerUserDelete = document.getElementById("deleteMemberType");
    const socialDelete = document.getElementById("socialUser");
    const comDelete = document.getElementById("comUser");


    if (!idElement || !modifyInfo || !moveContainer || !moveContainerUserDelete) {
        console.log(idElement);
        console.log(modifyMyInfo);
        console.log(moveContainer);
        console.log(moveContainerUserDelete);
        console.error("필요한 요소 중 하나 이상이 DOM에 없습니다.");
        return;
    }

    const idVal = idElement.innerText;
    const myPageCoupon = "/mypage/couponlist";
    const myPageModify = "/mypage/modify";
    const myPageAddress = "/mypage/changeaddr";
    const myPagePayment = "/mypage/payinfo";
    const myPageSubscribe = "/mypage/subinfo";
    const isSocial = "/user/test";

    isSocialUser(idVal).then(result => {
            console.log(result);
            if (result != "일반") {
                pageCall(isSocial,moveContainerUserDelete);
                comDelete.style.display = "none";
                modifyInfo.style.display = "none";
            }
        });
    pageCall(myPageSubscribe,moveContainer);

    document.querySelectorAll('#myPageCoupon, #myPageModify, #myPageAddress, #myPagePayment, #myPageSub').forEach(button => {
        button.addEventListener('click', (e) => {
            const myPageMoveBtn = e.target.id;
            console.log(myPageMoveBtn);
            moveContainer.innerHTML = "";

            switch (myPageMoveBtn) {
                case 'myPageCoupon':
                    console.log("쿠폰 페이지로 이동");
                    pageCall(myPageCoupon,moveContainer);
                    break;
                case 'myPageModify':
                    console.log("수정 페이지로 이동");
                    pageCall(myPageModify,moveContainer);

                    break;
                case 'myPageAddress':
                    console.log("주소 페이지로 이동");
                    pageCall(myPageAddress,moveContainer);
                    break;
                case 'myPagePayment':
                    console.log("결제 페이지로 이동");
                    pageCall(myPagePayment,moveContainer);
                    break;
                case 'myPageSub':
                    console.log("구독 페이지로 이동");
                    pageCall(myPageSubscribe,moveContainer);
                    break;
            }
        });
    });

    function pageCall(link,callBox) {
        const request = new XMLHttpRequest();
        request.open("GET", link, true);
        request.send();
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    if (callBox) {
                                callBox.innerHTML = request.responseText;
                        console.log("성공");
                    } else {
                        console.error("요소 'myPageInfoRigthWrap'을 찾을 수 없습니다.");
                    }
                } else {
                    console.error("요청 실패, 상태 코드: " + request.status);
                }
            }
        };
    }

    async function isSocialUser(id) {
        try {
            const resp = await fetch("/user/isSocialUser/" + id);
            const result = await resp.text();
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    async function modifyInfo(){
        const url = "/user/modify";
        const config = {
            method : "POST",
        }

    }


});
