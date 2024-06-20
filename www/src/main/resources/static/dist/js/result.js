document.addEventListener('DOMContentLoaded', () => {
    console.log("result js in");
    let user = document.getElementById('commuUser');


    getIdToServer(user.value).then(result => {
        console.log('전달 완료');
        console.log(result);

        const ul = document.getElementById("testResult");
        ul.innerHTML = ""; // ul 내용 초기화

        if (result == null) {
            ul.innerHTML = `
                    <div class="msg">
                    <div class="noResInfo">검사를 먼저 시도해주세요. </div>
                    <a href="/booktopiaTest/test">검사하러가기</a>
                                    </div>`;
        } else {
            // 결과가 있는 경우 각 항목을 ul에 추가
            result.forEach(list => {
                // 새로운 리스트 아이템 생성
                const li = document.createElement("li");
                // 각 필드 값을 리스트 아이템에 추가
                li.innerHTML = `
                <div class="bookWrap">
         
                <img class="bookImg" src="/image/book2/book${list.bookCode}.jpg">
        
                    <div class=bookName">${list.bookTitle}</div>
                     <div class=bookWriter">${list.bookWriter}</div>
                   </div>`;
                // ul에 리스트 아이템 추가
                ul.appendChild(li);
            });
        }
    });

});

async function getIdToServer(user) {
    try {
        const resp = await fetch("/booktopiaTest/resultTest/"+user);
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log(error);
    }
}
