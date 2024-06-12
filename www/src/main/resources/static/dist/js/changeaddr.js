console.log("arr in js");

var phone = document.getElementById('changePhone');
var phoneRegex = /^(010)-?[0-9]{4}-?[0-9]{4}$/;// 휴대폰 유효성
var modid = document.getElementById("modaddrname");

document.getElementById('payGetAddrBtn').addEventListener('click', ()=>{
                    new daum.Postcode({
                        oncomplete: function(data) {
                            document.getElementById('changeAddr').value = data.address;
                            document.getElementById('addrDetailInput').value = "";
                            document.getElementById('addrDetailInput').focus();
                        }
                    }).open();
                });


document.getElementById("submitAddrButton").addEventListener("click",()=>{
        let modidVal = modid.value;
        let addr = document.getElementById('changeAddr').value;
        let addrdetail = document.getElementById("addrDetailInput").value;
        let addall = addr + "/"+ addrdetail;
        let modphone = document.getElementById("changePhone").value;
        const moddata ={
            id : modidVal,
            address : addall,
            phone : modphone
        };
        modifyaddr(moddata).then(result =>{
            console.log(result);
            if(result == 1){
                alert("수정이 완료되었습니다.");
                logout();
            }else{
                alert("수정을 하지 못했습니다.");
            }
        })


});

function logout() {
    // 로그아웃 요청을 서버로 보냄
    fetch('/user/logout')
    .then(response => {
        if (response.ok) {
            window.location.href = '/login'; // 로그아웃 후 로그인 페이지로 리디렉션
        } else {
            console.error('Failed to log out.');
            alert('로그아웃에 실패했습니다.');
        }
    })
    .catch(error => {
        console.error('Logout error:', error);
        alert('로그아웃 중 오류가 발생했습니다.');
    });
}

async function modifyaddr(moddata){

    const url = "/user/moddata";
    const config = {
                method : 'POST',
                headers : {
                    'content-type':'application/json; charset =utf-8'
                },
                body :JSON.stringify(moddata)
            };
    const resp = await fetch(url,config);
    const result = await resp.text();
    return result;
}
