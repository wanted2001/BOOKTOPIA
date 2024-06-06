console.log("login in");
document.querySelectorAll('.test')[0].addEventListener('click', () => {
            setCookie('login', 'sns', '1');
        });
document.getElementById('fi_btn').addEventListener('click', ()=>{
    const name = doucument.getElementById('fi_name');
    const nameVal = name.value;
    console.log("아이디 찾는 user의 이름 >> ", name);
    let resArea = document.getElementById('resArea');
    resArea.style.display = '';
    resArea.innerText = '';

    findUser(nameVal).then(result =>{
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
        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error);
    }
}

        function setCookie(cookie_name, value, miuntes) {
            var exdate = new Date();
            exdate.setDate(exdate.getMinutes() + miuntes);
            // 설정 일수만큼 현재시간에 만료값으로 지정
            var cookie_value = escape(value) + ((miuntes == null) ? '' : '; expires=' + exdate.toUTCString());
            document.cookie = cookie_name + '=' + cookie_value;
        }


