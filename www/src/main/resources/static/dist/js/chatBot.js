document.getElementById('btn').addEventListener('click',()=>{
    document.querySelector('.chatBotText').style.display = 'block';

    let AnsText = document.querySelector('.AnserText');
    AnsText.innerText =
        '안녕하세요. BookTopia 입니다!💫\n' +
        '어떤 도움이 필요하신가요?\n' +
        '아래에서 궁금하신 내용을 선택해주세요!';

    document.addEventListener('click',(e)=> {
        if (e.target.classList.contains('txtF')) {
            let btn = e.target.id;
            btn = btn.substring(7);
            chatBot(btn).then(result =>{
                if(result == "1"){
                    switch (btn){
                        case "1":
                            AnsText.innerText =`북토피아는 책 취향을 알 수 있는 간단한 심리 검사를 통해
                            내 독서 스타일을 파악할 수 있고, 그에 따른 퍼스널 도서 추천을 받을 수 있는 서비스입니다.
                            자세한 경험은 취향검사 탭이나 구독상품 탭을 눌러 확인해보세요!`; break;
                        case "2":
                            AnsText.innerText = `북토피아는 1개월 구독, 3개월 구독, 6개월 구독 총 3가지 구독권을 
                            이용하실 수 있습니다. 아직 책읽기가 습관화 되지 않은 독서 초보 분들에게는 맛보기 형식으로 1개월 구독을 추천드리고
                            독서가 익숙하신 분들에게는 3개월 혹은 6개월 구독권을 추천드려요. 6개월 구독권이 조금 더 경제적으로 이득인 건 안 비밀!`; break;
                        case "3":
                            AnsText.innerText = `홈페이지에서 오류를 발견하셨나요? 불편을 끼쳐드려 죄송합니다 ㅠ_ㅠ
                            'booktopia@email.com' 으로 메일 보내주시면 확인 후 빠른 조치 취하도록 하겠습니다 :)`; break;
                        case "4":
                            AnsText.innerText = `북토피아는 일반 회원/소셜 회원 두 가지 방법으로 가입 가능합니다.
                            가입 후 회원으로서 누릴 수 있는 서비스에는 차이가 없으니 편하신 방법으로 가입하시면 됩니다.
                            단, 소셜 회원은 개인정보 수정이 불가능한 점 참고 부탁드립니다!`; break;
                        case "5":
                            AnsText.innerText =`북토피아 커뮤니티는 책과 관련된 모든 이야기를 나눌 수 있는 곳입니다,
                            감명깊었던 책을 공유하는 독서기록장이 될 수도 있고 주인공의 시점과 다른 시점을 공유하는 토론의 장이 될수도
                            있습니다. 서로를 배려하는 북토피아 커뮤니티 문화를 준수해주시고, 어떤 글이든 자유롭게 남겨주세요.` ; break;
                        case "6":
                            AnsText.innerText = `북토피아는 모든 구독권 결제 후 영업일 기준 3일 이내에 배송이 시작됩니다.
                            배송시작 알림이 떴는데도 배송이 계속 오지 않는다면 택배사 문의 부탁드립니다! :) `; break;
                    }
                }
            });
        }
    });
});

document.getElementById('textBtn').addEventListener('click',()=>{
    document.querySelector('.chatBotText').style.display = 'none';
});

async function chatBot(data){
    try{
        const url = "/chatbot/get";
        const config = {
            method : 'POST',
            headers : {
                'Content-type':'text/plain; charset=UTF-8'
            },
            body : data
        };

        const resp = await fetch(url, config);
        const result = await resp.json();
        return result;
    }catch (error){
        console.log(error);
    }
}