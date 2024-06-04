document.addEventListener('DOMContentLoaded', () => {
    const id = document.getElementById("myPageUserName");
    const idVal = id.innerText;
    const modifyInfo =  document.getElementById("modiftMyInfo");
    const headBtn = document.getElementById("load-header");
    const linkA = "/user/test";

    isSocialUser(idVal).then(result=>{
        console.log(result);
        if(result !="일반"){
                modifyInfo.style.display = "none";
            }
    });

   headBtn.addEventListener("click",() => {
   var request = new XMLHttpRequest();
   request.open("GET",linkA,true);
   request.send();
   request.onreadystatechange = function(){
   if (request.status === 200){
       document.getElementById("header-container").innerHTML = request.responseText;
        console.log("성공");
       }}
    });

// 가입 유형에 따라 개인정보 수정 활성화 / 비활성화
async function isSocialUser(id) {
    try {
        const resp = await fetch("/user/isSocialUser/" + id);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error);
        }
    }
});