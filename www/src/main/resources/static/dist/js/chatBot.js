document.getElementById('btn').addEventListener('click',()=>{
    console.log('상담 start')
    document.querySelector('.chatBotText').style.display = 'block';

    let AnsText = document.querySelector('.AnserText');
    AnsText.innerText =
        '안녕하세요. BookTopia 입니다!💫\n' +
        '어떤 도움이 필요하신가요?\n' +
        '아래에서 궁금하신 내용을 선택해주세요!';

    document.addEventListener('click',(e)=> {
        console.log(e.target.className);
        if (e.target.classList.contains('txtF')) {
            let btn = e.target.id;
            console.log(btn);
            btn = btn.substring(7);
            console.log(btn);
            chatBot(btn).then(result =>{
                if(result == "1"){
                    switch (btn){
                        case "1":
                            AnsText.innerText =`북토피아 문의 답변`; break;
                        case "2":
                            AnsText.innerText = `구독상품 문의 답변`; break;
                        case "3":
                            AnsText.innerText = `홈페이지 오류 문의 답변`; break;
                        case "4":
                            AnsText.innerText = `회원가입/로그인 문의 답변`; break;
                        case "5":
                            AnsText.innerText = `커뮤니티 문의 답변`; break;
                        case "6":
                            AnsText.innerText = `배송문의 문의 답변`; break;
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
        console.log(data);
        console.log(config);
        const resp = await fetch(url, config);
        const result = await resp.json();
        console.log(result);
        return result;
    }catch (error){
        console.log(error);
    }
}