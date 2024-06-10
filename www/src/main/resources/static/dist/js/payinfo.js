console.log("pay in js");

document.getElementById('payGetAddrBtn').addEventListener('click', ()=>{
                    new daum.Postcode({
                        oncomplete: function(data) {
                            document.getElementById('addrInput').value = data.address;
                            document.getElementById('addrDetailInput').focus();
                        }
                    }).open();
                });

document.addEventListener('DOMContentLoaded', () => {
      const id = document.getElementById("realId");
      const idVal = id.innerText;
      calladdrInfo(idVal).then(result=>{
        if(result == 0){
            console.log("결제내역이 없습니다.");
        }else if(result == 1){
            console.log("결제내역이 있습니다.");
        }
      });
});

async function callPayInfo(id){
    const url = "/user/myPagePayInfo"+id;
    const resp = await fetch(url);
    const result = resp.text();
    return result;
}

