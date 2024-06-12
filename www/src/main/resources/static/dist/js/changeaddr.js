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


});

//async function modifyaddr(moddata){
//
//    const url = "/user/"
//
//}
