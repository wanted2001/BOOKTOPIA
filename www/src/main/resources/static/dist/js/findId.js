document.getElementById('findbtn').addEventListener('click', ()=>{
    let name = doucument.getElementById('fi_name').value;
    console.log("아이디 찾는 user의 이름 >> ", name);
    let resArea = document.getElementById('resArea');

    resArea.style.display = '';
    resArea.innerText = '';

    findUser(name).then(result =>{
        if(!result){
            resArea.innerText = "가입된 유저가 아니거나 아이디 정보가 없습니다."
        }else{
            resArea.innerText = "아이디는 < "+result+" > 입니다.";
        }
    })


})

//이름으로 유저 찾기
async function findUser(userName){
    try {
        const url = '/user/findId/'+userName;
        const config = {
            method : 'GET'
        };

        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;

    } catch (error) {
        console.log(error);
    }
}