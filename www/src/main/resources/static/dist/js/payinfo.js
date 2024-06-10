console.log("pay in js");


      const payId = document.getElementById("realId");
      const idVal = payId.innerText;
      console.log(idVal);
      callPayInfo(idVal).then(result=>{
        if(result == 0){
            console.log("결제내역이 없습니다.");
        }else if(result == 1){
            console.log("결제내역이 있습니다.");
        }
      });

async function callPayInfo(id){
    const url = await fetch("/user/myPagePayInfo/"+id);
    const result = url.text();
    return result;
}

