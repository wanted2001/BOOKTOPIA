console.log("arr in js");

const phone = document.getElementById('changePhone');
const phoneRegex = /^(010)-?[0-9]{4}-?[0-9]{4}$/; // 휴대폰 유효성

document.getElementById('payGetAddrBtn').addEventListener('click', ()=>{
                    new daum.Postcode({
                        oncomplete: function(data) {
                            document.getElementById('addrInput').value = data.address;
                            document.getElementById('addrDetailInput').focus();
                        }
                    }).open();
                });