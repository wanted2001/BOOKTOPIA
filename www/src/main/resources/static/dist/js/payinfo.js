const payId = document.getElementById("realId");
const idVal = payId.innerText;
console.log(idVal);
callPayInfo(idVal).then(result => {
    console.log(result);
    const ul = document.getElementById("payInforesult");
    ul.innerHTML = ""; // ul 내용 초기화
    result.reverse();
    result.forEach(item => {
        // 새로운 리스트 아이템 생성
        const li = document.createElement("li");
        // 각 필드 값을 리스트 아이템에 추가
        li.innerHTML = `
         <div id="payInfoWrap">
                         <div class="payInfomerchantUid">${item.merchantUid}</div>
                         <div class="payInfoLeft">
                             <div id="payInfoTitle">${item.itemName}</div>
                             <div id="payInfoAmount">${item.approvedAt}</div>
                         </div>
                         <div class="payInfoRight">
                             <div id="payInfoName">${item.totalAmount}</div>
                             <div id="payInfoRegiAt">${item.approvedAt}</div>
                         </div>
                     </div>`;
        // ul에 리스트 아이템 추가
        ul.appendChild(li);
    });
});

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