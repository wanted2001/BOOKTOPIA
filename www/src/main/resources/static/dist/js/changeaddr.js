console.log("arr in js");

var phone = document.getElementById('changePhone');
var phoneRegex = /^(010)-?[0-9]{4}-?[0-9]{4}$/; // 휴대폰 유효성

document.getElementById('payGetAddrBtn').addEventListener('click', ()=>{
                    new daum.Postcode({
                        oncomplete: function(data) {
                            document.getElementById('changeAddr').value = data.address;
                            document.getElementById('addrDetailInput').focus();
                        }
                    }).open();
                });


document.getElementById("submitAddrButton").addEventListener("click",()=>{
        let addr = document.getElementById('changeAddr').value;
        let addrdetail = document.getElementById("addrDetailInput").value;
        let addall = addr + "/"+ addrdetail;
        let modphone = document.getElementById("changePhone").value;
        const moddata ={
            address : addall,
            phone : modphone
        };
        modifyaddr(moddata).then(result =>{
            if(result == 1){
                alert("수정이 완료되었습니다.");
                
            }else{
                alert("수정을 하지 못했습니다.");
            }
        })


});

async function modifyaddr(moddata){

    const url = "/user/moddata";
    const config = {
                method : 'post',
                headers : {
                    'content-type':'application/json; charset =utf-8'
                },
                body :JSON.stringify(moddata)
            };
    const resp = await fetch(url,config);
    const result = await resp.text();
    return result;
}
