var social = "";

document.getElementById("kakao-loginbtn").addEventListener('click',()=>{
   social = 'kakao';
   socialLogin(social).then(result =>{
    console.log(result);
   });
})

async function socialLogin(sns){
    if(sns == 'kakao'){
        const uri = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=e016056bd7835ec895f24271a1b07c41&redirect_uri=http://localhost:8099/user/callback"
        const config = {
            method : "GET"
        };
        const resp = await fetch(uri,config);
        const result = await resp.text();
        return result;
    }
}