var payId = document.getElementById("realId");
var idVal = payId.innerText;
console.log(idVal);
callPayInfo(idVal).then(result => {
    console.log(result);
    const ul = document.getElementById("payInforesult");
    ul.innerHTML = ""; // ul 내용 초기화

    if(result.length == 0){
            ul.innerHTML = `<div class ="noPayinfo">결제 내역이 없습니다.</div>`;
        }
   else{
    result.reverse();
    result.forEach(item => {
        // 새로운 리스트 아이템 생성
        const li = document.createElement("li");
        // 각 필드 값을 리스트 아이템에 추가
        li.innerHTML = `
         <div id="payInfoWrap">
                         <div class="payInfomerchantUid">주문번호 : ${item.merchantUid}</div>
                         <div class="payInfoLeft">
                             <div id="payInfoTitle">${item.itemName}</div>
                             <div id="payInfoapprovedAt">${item.approvedAt}</div>
                         </div>
                         <div class="payInfoRight">
                             <button type="button" id="payInfoDelivery" value="배송준비중" onclick="postStatus()">배송준비중</button>
                             <div id="payInfoAmount">${item.totalAmount}</div>
                             <button type="button" id="payInfoDelivery" onclick="deliSuccess()">${item.deliStatus}</button>
                         </div>
                     </div>`;
        // ul에 리스트 아이템 추가
        ul.appendChild(li);
        // let deli = document.getElementById('payInfoDelivery');
        // console.log(deli.value);
    });
    }
});

// 구매확정 버튼 클릭 시...
function deliSuccess() {
    let merchantUid = (document.querySelector('.payInfomerchantUid').innerText).substring(7);
    console.log(merchantUid);

    deliToServer(merchantUid).then(result =>{
        console.log(result);
        if(result == 1){
            alert("구매확정되었습니다.")
        }
    })
}

// 구매확정 DB update 구문
async function deliToServer(merchantUid){
    console.log(merchantUid)
    try {
        const url = "/mypage/deliSuccess";
        const config = {
            method : "POST",
            headers : {
                "Content-type":"application/json; charset=UTF-8"
            },
            body : JSON.stringify(merchantUid)
        };

        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error){
        console.log(error);
    }
}

async function callPayInfo(id) {
    try {
        const response = await fetch("/user/myPagePayInfo/" + id);
        if (!response.ok) {
            throw new Error("HTTP error, status = " + response.status);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // 오류 발생 시 null 반환 또는 적절한 오류 처리 수행
    }
}