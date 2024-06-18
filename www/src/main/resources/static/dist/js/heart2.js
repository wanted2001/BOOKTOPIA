console.log("heart js in");

const heartBtn = document.querySelector('.hrtBtn');
const userId = document.querySelector('.commDeUserId').value;
console.log(userId);
let hasHeart = false;

document.querySelector('.hrtBtn').addEventListener('click',()=>{
    console.log("하트버튼 누름");
    getUserBno(bnoVal,userId).then(result=>{
        if(result==='1'){
            console.log("이미 누른 사람")
            // alert("이미 좋아요를 눌렀습니다.");
            deleteHeart(bnoVal, userId).then(result=>{
                console.log("좋아요 취소함");
                heartBtn.innerHTML='';
                heartBtn.innerHTML=`<img src="/image/heart_white.png" class="whiteHeart">`;
            })
        } else {
            console.log("하트 가능")
            let data={
                id:userId,
                bno:bnoVal,
                heartYn:1
            };

            clickHeart(data).then(result=>{
                heartBtn.innerHTML='';
                heartBtn.innerHTML=`<img src="/image/heart.png" class="redHeart">`
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

async function deleteHeart(bnoVal,id){
    try{
        const url="/board/heart/delete/"+bnoVal+"/"+id;
        const config = {
            method:"delete"
        }

        const resp = await fetch(url, config)
        const result = await resp.text();
        console.log(result);
        return result;
    }catch(error){
        console.log("delete error "+error);
    }
}

//bno 떼오는 함수
async function getUserBno(bnoVal,id){
    try{
        const url = "/board/heart/"+bnoVal+"/"+id;
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
