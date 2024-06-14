console.log("js in");
console.log(user +">>>>>>>>>>>>> js in");
let score = document.querySelector('.persent').innerText;
console.log(score);

let per = 50;
let downPer = 50;
const upBtn = document.querySelector('.upBtn').value;
const downBtn = document.querySelector('.downBtn').value;

let hasVote = false; // 투표 참여 여부

document.addEventListener('click',(e)=>{
    if(e.target.tagName === "IMG"){
        if (e.target.id === 'upImg'){
            console.log("voteHas >>> ")
            getIdToServer(user).then(result=>{
                console.log("결과값 >>> "+result);
                if(result === '1'){
                    console.log("123456");
                    alert('이미 참여한 이벤트입니다.')
                } else if(user === 'anonymousUser'){
                    alert('로그인 후 참여가능합니다.');
                    // e.target.disabled = true;
                } else {
                    console.log(upBtn);
                    per +=3;
                    downPer = 100-per;
                    document.querySelector('.persent').style.width = `${per}%`;

                    let data ={
                        id:user,
                        voteResult:'찬성'
                    };

                    push(data).then(result=>{
                        console.log(result);
                    });

                    console.log("per >> "+per)
                    console.log("downper >> "+downPer);
                }
            })
        } else if(e.target.id === 'downImg'){
            getIdToServer(user).then(result=>{
                console.log("결과값 >>> "+result);
                if(result === '1'){
                    console.log("123456");
                    alert('이미 참여한 이벤트입니다.')
                } else if(user === 'anonymousUser'){
                    alert('로그인 후 참여가능합니다.');
                    // e.target.disabled = true;
                } else {
                    console.log(downBtn);
                    per -=3;
                    downPer = 100-per;
                    document.querySelector('.persent').style.width = `${per}%`;
                    let data ={
                        id:user,
                        voteResult:'반대'
                    };

                    push(data).then(result=>{
                        console.log(result);
                    });
                    console.log("per >> "+per)
                    console.log("downper >> "+downPer);
                }

            })
        }
    }
})
console.log("user >> " +user);


async function push(data){
    const url ="/community/push";
    const config = {
        method : "POST",
        headers : {
            "Content-type":"application/json; charset=UTF-8"
        },
        body:JSON.stringify(data)
    };

    const resp = await fetch(url, config);
    const result = await resp.text();
    return result;
}

async function getIdToServer(user) {

    try {
        const url = "/community/"+user;
        const config = {
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        };

        const resp = await fetch(url, config)
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// 누적 점수를 가져오는 비동기
async function getScoreToServer(){
    try{
        const url ="/system/getScore";
        const config = {
            method : "GET",
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        };
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    }catch (error){
        console.log(error);
    }
}