document.addEventListener('DOMContentLoaded', () => {
    const idElement = document.getElementById("myPageUserName");
    const modifyInfo = document.getElementById("modifyMyInfo");
    const moveContainer = document.getElementById("myPageInfoRightWrapId");

    if (!idElement || !modifyInfo || !moveContainer) {
        console.log(idElement);
        console.log(modifyMyInfo);
        console.log(moveContainer);
        console.error("필요한 요소 중 하나 이상이 DOM에 없습니다.");
        return;
    }

    const idVal = idElement.innerText;

    const myPageCoupon = "/mypage/couponlist";
    const myPageModify = "/mypage/modify";
    const myPageAddress = "/mypage/changeaddr";
    const myPagePayment = "/mypage/payinfo";
    const myPageSubscribe = "/mypage/subinfo";

    isSocialUser(idVal).then(result => {
        console.log(result);
        if (result !== "일반") {
            modifyInfo.style.display = "none";
        }
    });

    pageCall(myPageSubscribe);

    document.querySelectorAll('#myPageCoupon, #myPageModify, #myPageAddress, #myPagePayment, #myPageSub').forEach(button => {
        button.addEventListener('click', (e) => {
            const myPageMoveBtn = e.target.id;
            console.log(myPageMoveBtn);
            moveContainer.innerHTML = "";

            switch (myPageMoveBtn) {
                case 'myPageCoupon':
                    console.log("쿠폰 페이지로 이동");
                    pageCall(myPageCoupon);
                    break;
                case 'myPageModify':
                    console.log("수정 페이지로 이동");
                    pageCall(myPageModify);
                    break;
                case 'myPageAddress':
                    console.log("주소 페이지로 이동");
                    pageCall(myPageAddress);
                    break;
                case 'myPagePayment':
                    console.log("결제 페이지로 이동");
                    pageCall(myPagePayment);
                    break;
                case 'myPageSub':
                    console.log("구독 페이지로 이동");
                    pageCall(myPageSubscribe);
                    break;
            }
        });
    });

    function pageCall(link) {
        const request = new XMLHttpRequest();
        request.open("GET", link, true);
        request.send();
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    const moveContainer = document.getElementById("myPageInfoRightWrapId");
                    if (moveContainer) {
                        moveContainer.innerHTML = request.responseText;
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
});
