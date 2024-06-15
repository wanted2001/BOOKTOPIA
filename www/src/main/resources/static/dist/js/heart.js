console.log("heart js in");

const heart = document.querySelector('.hrtBtn');
const id = document.querySelector('.commDeUserId').value;
console.log(id);
let hasHeart = false;

document.querySelector('.hrtBtn').addEventListener('click',()=>{
    console.log("하트버튼 누름");
    getUserId(bnoVal,id).then(result=>{
        if(result==='1'){
            console.log("이미 누른 사람")
            alert("이미 좋아요를 눌렀습니다.");
        } else {
            console.log("하트 가능")
            let data={
                id:id,
                bno:bnoVal,
                heartYn:1
            };

            clickHeart(data).then(result=>{
                document.querySelector('.whiteHeartA').innerHTML='';
                document.querySelector('.hrtBtn').innerHTML=`<div><img src="/image/heart.png" class="redHeart"></div>`
                console.log(result)
            })
        }
    })
})

async function clickHeart(data){
    try {
        const url = "/board/heart/" + bnoVal;
        const config = {
            method: "POST",
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(data)
        };

        const resp = await fetch(url, config)
        const result = await resp.text();
        console.log(result);
        return result;
    } catch(error) {
        console.log(error)
    }
}

// 아이디 떼오는 함수
async function getUserId(bno,id){
    try{
        const url = "/board/heart/"+bno+"/"+id;
        const config ={
            method:"GET",
            headers:{
                'content-type':'application/json; charset=UTF-8'
            }
        };

        const resp = await fetch(url,config);
        const result = await resp.text();
        console.log(result);
        return result;
    }catch(error) {
        console.log(error);
    }
}