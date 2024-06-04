document.getElementById('btn').addEventListener('click',()=>{
    console.log('상담 start')
    document.querySelector('.chatBotText').style.display = 'block';


    document.addEventListener('click',(e)=> {
        console.log(e.target.className);
        if (e.target.classList.contains('txtF')) {
            let btn = e.target.id;
            console.log(btn);
            btn = btn.substring(3);
            console.log(btn);
            chatBot(btn); // controller로 btn 전달
        }

        });
});

document.querySelector('.textBody').innerText =
    '안녕하세요. BookTopia 입니다!💫\n' +
    '어떤 도움이 필요하신가요?\n' +
    '아래에서 궁금하신 내용을 선택해주세요!';

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