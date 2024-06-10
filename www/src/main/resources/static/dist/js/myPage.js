document.addEventListener('DOMContentLoaded', () => {
    const idElement = document.getElementById("myPageUserName");
    const modifyInfo = document.getElementById("modifyMyInfo");
    const moveContainer = document.getElementById("myPageInfoRightWrapId");
    const moveContainerUserDelete = document.getElementById("deleteMemberType");
    const comDelete = document.getElementById("comUser");

    // 필요한 요소가 모두 있는지 확인
    if (!idElement || !modifyInfo || !moveContainer || !moveContainerUserDelete) {
        console.log(idElement);
        console.log(modifyInfo);
        console.log(moveContainer);
        console.log(moveContainerUserDelete);
        console.error("필요한 요소 중 하나 이상이 DOM에 없습니다.");
        return;
    }

    const idVal = idElement.innerText;
    const myPageCoupon = "/mypage/couponlist";
    const myPageModify = "/mypage/modify";
    const myPageAddress = "/mypage/changeaddr";
    const myPageAddressSocial = "/mypage/changeaddrsocial";
    const myPagePayment = "/mypage/payinfo";
    const myPageSubscribe = "/mypage/subinfo";
    const isSocial = "/user/deleteUser";

    // 유저 타입 확인 후 페이지 호출
    isSocialUser(idVal).then(result => {
        console.log(result);
        if (result !== "일반") {
            pageCall(isSocial, moveContainerUserDelete);
            comDelete.style.display = "none";
            modifyInfo.style.display = "none";
        }
    });

    pageCall(myPageSubscribe, moveContainer);

    // 수정 완료 메시지 처리
    const msg = /*[[${msg}]]*/ '';
    if (msg) {
        alert("수정이 완료 되었습니다.");
    }

    // 버튼 클릭 이벤트 설정
    document.querySelectorAll('#myPageCoupon, #myPageModify, #myPageAddress, #myPagePayment, #myPageSub').forEach(button => {
        button.addEventListener('click', (e) => {
            const myPageMoveBtn = e.target.id;
            console.log(myPageMoveBtn);
            moveContainer.innerHTML = "";

            switch (myPageMoveBtn) {
                case 'myPageCoupon':
                    pageCall(myPageCoupon, moveContainer);
                    break;
                case 'myPageModify':
                    pageCall(myPageModify, moveContainer);
                    break;
                case 'myPageAddress':
                    isSocialUser(idVal).then(result => {
                        console.log(result);
                        if (result !== "일반") {
                            pageCall(myPageAddressSocial, moveContainer);
                        }
                         if(result == "일반"){
                            pageCall(myPageAddress, moveContainer);
                        }
                    })
                    break;
                case 'myPagePayment':
                    pageCall(myPagePayment, moveContainer);
                    break;
                case 'myPageSub':
                    pageCall(myPageSubscribe, moveContainer);
                    break;
            }
        });
    });

    document.getElementById("comUserDelete").addEventListener("click",()=>{
         deleteComUser(idVal).then(result =>{
            if(result == 1){
                alert("회원탈퇴 하셨습니다.");
            }else if(result ==0){
                alert("회원탈퇴 실패 ");
            }
        })

    });
});

// 페이지 호출 함수
function pageCall(link, callBox) {
    const request = new XMLHttpRequest();
    request.open("GET", link, true);
    request.send();
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                if (callBox) {
                    callBox.innerHTML = request.responseText;
                    // 스크립트 파일을 조건에 따라 추가
                    switch (link) {
                        case '/mypage/modify':
                            loadScript('/dist/js/myPageModify.js');
                            break;
                        case '/mypage/changeaddr':
                        case '/myPage/changeaddrsocial':
                            loadScript('/dist/js/changeaddr.js');
                            break;
                        case '/mypage/couponlist':
                            loadScript('/dist/js/couponlist.js');
                            break;
                        case '/mypage/payinfo':
                            loadScript('/dist/js/payinfo.js');
                            break;
                        case '/mypage/subinfo':
                            loadScript('/dist/js/subinfo.js');
                            break;
                    }
                }
            } else {
                console.error("요청 실패, 상태 코드: " + request.status);
            }
        }
    }
}

// 스크립트가 이미 포함되어 있는지 확인하고 추가하는 함수
function loadScript(src) {
    removeAllScriptsExcept(src)
    if (!isScriptAlreadyIncluded(src)) {
        const script = document.createElement('script');
        script.src = src;
        document.body.appendChild(script);
    }
}

// 스크립트가 이미 포함되어 있는지 확인하는 함수
function isScriptAlreadyIncluded(src) {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes(src)) {
            return true;
        }
    }
    return false;
}

// 특정 스크립트들을 제외하고 모든 스크립트를 제거하는 함수
function removeAllScriptsExcept(dynamicSrc) {
    const srcToKeep = [
        "/dist/js/myPage.js",
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js",
        dynamicSrc // 동적으로 들어오는 src 값을 추가
    ];

    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length - 1; i >= 0; i--) { // script 태그를 달고있는 전체 태그 개수
        let keepScript = false;
        for (let j = 0; j < srcToKeep.length; j++) { // script 태그를 달고있는 필수요소의 개수만큼
            if (scripts[i].src.includes(srcToKeep[j])) { // json 형식에 있는 js 링크들
                keepScript = true;
                break;
            }
        }
        if (!keepScript) {
            scripts[i].parentNode.removeChild(scripts[i]);
        }
    }
}

// 유저 타입을 확인하는 비동기 함수
async function isSocialUser(id) {
    try {
        const resp = await fetch("/user/isSocialUser/" + id);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error);
    }
}

async function deleteComUser(id){
    const url = "/user/deleteUser"+id;
    const resp = await fetch(url);
    const result =  resp.text();
    return result;
}

