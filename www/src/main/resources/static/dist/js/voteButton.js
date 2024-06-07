console.log("js in");
console.log(user +">>>>>>>>>>>>> js in");

let per = 50;
let downPer = 50;
const upBtn = document.querySelector('.upBtn').value;
const downBtn = document.querySelector('.downBtn').value;


document.addEventListener('click',(e)=>{
    if(e.target.tagName === "IMG"){
        if (e.target.id === 'upImg'){
            console.log(upBtn);
            votePush(data).then(result=>{
                console.log("data >>> "+data);
            });
            document.querySelector('.upBtn').type = 'submit'
            per +=3;
            downPer = 100-per;
            document.querySelector('.persent').style.width = `${per}%`;
            console.log("per >> "+per)
            console.log("downper >> "+downPer);

        } else if(e.target.id === 'downImg'){
            console.log(downBtn);
            per -=3;
            downPer = 100-per;
            document.querySelector('.persent').style.width = `${per}%`;
            console.log("per >> "+per)
            console.log("downper >> "+downPer);
        }
    }
})
console.log("user >> " +user);

let data ={
    voteBno:'0',
    id:user,
    voteResult:upBtn
}
console.log("data >>>>>"+data);
// post 비동기 함수로 많든 다음 up / down 버튼 클릭 시 작동할 수 있도록  onclick
async function votePush(data){
    try{

        const url = "/community/push";
        const config = {
            method : "POST",
            headers :{
                "Content-type":"application/json; charset=UTF-8"
            },
            body:JSON.stringify(data)
        };

        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error){
        console.log(error);
    }
}