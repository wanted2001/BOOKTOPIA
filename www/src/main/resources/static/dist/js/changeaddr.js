console.log("arr in js");

const phone = document.getElementById('changePhone');
const phoneRegex = /^(010)-?[0-9]{4}-?[0-9]{4}$/;

document.getElementById('payGetAddrBtn').addEventListener('click', ()=>{
                    new daum.Postcode({
                        oncomplete: function(data) {
                            document.getElementById('addrInput').value = data.address;
                            document.getElementById('addrDetailInput').focus();
                        }
                    }).open();

                })

function strongPhone(str) {
    return phoneRegex.test(str);
}

phone.onkeyup = function() {
    if(phone.value.length != 0){
        if(strongPhone(phone.value)){

        }

    }
}