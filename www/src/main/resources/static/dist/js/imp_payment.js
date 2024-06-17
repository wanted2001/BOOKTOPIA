console.log(ordName);
console.log(ordId);
console.log(ordEmail);
console.log(ordMemo);
console.log(payName)
console.log(amount)

let i=1;
let uid = '';
let merchant_uid = 'payment_'+new Date().getTime()+i;
let item_name = '북토피아 '+payName+'개월 구독권';
const regPhone = new RegExp(/[09]/);

function request_pay(){
    let ordaddr = document.getElementById('addrInput').value;
    let ordaddrdetail = document.getElementById('addrDetailInput').value;
    let ordPhone = document.getElementById('ordPhone').value;

    console.log("테스트으으으으으"+ ordaddr);
    console.log("디테이이이일 테스트으으으으으"+  ordaddrdetail);
    console.log(ordName);
    if(ordPhone==null||ordPhone===''){
        alert("전화번호를 입력해주세요.");
        ordPhone.focus();
    } else if(!regPhone.test(ordPhone)){
        ordPhone='';
        // ordPhone.focus();
        alert("숫자만 입력해주세요.");
    } else if(ordaddr==null||ordaddr===''||ordaddrdetail==null||ordaddrdetail===''){
        alert("주소를 입력해주세요.");
        ordaddr.focus();
    } else {
        //쿠폰
        let coupon = document.getElementById('coupon').value;
        let couponValue = coupon.options[selectedIndex].value;
        console.log(couponValue);

        const IMP = window.IMP;
        IMP.init("imp42245168")
        IMP.request_pay(
            {
                pg:'kakaopay.TC0ONETIME',
                pay_method:'card',
                merchant_uid : merchant_uid , //주문번호
                name: item_name,
                amount:amount,
                buyer_name:ordName,
                buyer_email:ordName,
                buyer_tel:ordPhone,
                buyer_addr:ordaddr+"/"+ordaddrdetail,
                buyer_addrDetail : ordaddrdetail,
            },
            function (rsp){
                // callback
                // res.imp_uid 값으로 결제 단건조회 API 호출해서 결제 결과 판단
                if(rsp.success){
                    console.log('결제성공 boot!');
                    console.log(rsp);
                    let registerData ={
                        id:ordId,
                        impUid: rsp.imp_uid,
                        merchantUid: merchant_uid,
                        ordEmail:ordEmail,
                        ordName:ordName,
                        ordPhone: ordPhone,
                        ordAddr:ordaddr+"/"+ordaddrdetail,
                        itemName:item_name,
                        totalAmount: amount,
                        pg_tid:rsp.pg_tid,
                    };

                    console.log(registerData);
                    postRegisterSuccess(registerData).then(result=>{
                        console.log("result >> "+ result)

                        if(result === '1'){
                            let data ={
                                id:ordId,
                                impUid : rsp.imp_uid,
                                merchantUid: merchant_uid,
                                ordEmail:ordEmail,
                                buyerName : ordName,
                                ordPhone:ordPhone,
                                address: ordaddr,
                                name :item_name,
                                paidAmount : amount,
                            };
                            console.log(data);
                            console.log("주문정보 저장")
                            getToken();
                            console.log(registerData.totalAmount);
                            console.log(data.paidAmount);

                            // 결제금액 검증
                            if (registerData.totalAmount == data.paidAmount){
                                console.log("결제 검증 및 결제 완료! >>>> ")
                                postStorePaySuccess(data).then(result=>{
                                    console.log(result);
                                 window.location.href = "/pay/done/"+result.merchantUid;

                                });
                            } else {
                                console.log("결제 실패!!!!!!!! ")
                                alert("결제 실패")
                            }
                        } else {
                            console.log("data 안들어옴")
                        }
                    } )
                } else {
                    alert('실패' + rsp.error_msg);
                }
            }
        );
        i++;
    }
}

async function postRegisterSuccess(registerData){
    try {
        const url = "/pay/savePayinfo";
        const config = {
            method : 'post',
            headers : {
                'content-type':'application/json; charset =utf-8'
            },
            body :JSON.stringify(registerData)
        };

        const resp = await fetch(url, config);
        const result = await resp.text();
        console.log("result >>> "+ result);
        return result;
        console.log("registerData >>> " + registerData);

    } catch (error){
        console.log(error);
    }
}

async function postStorePaySuccess(data){
    try {
        const url = "/pay/done";
        const config ={
            method: 'POST',
            headers : {
                'content-type':'application/json; charset =utf-8'
            },
            body: JSON.stringify(data)
        };
        const resp = await fetch(url, config);
        const result = await resp.json();
        return result;


        console.log("결제 완료 정보 >>> ");
    }catch (error){
        console.log("error" + error);
    }
}

// token 가져오는...
async function getToken(){
    try{
        const resp = await fetch('/pay/getToken', {
            method : 'POST'
        });
        const result = await resp.json();
        return result;
    }catch (error){
        console.log(error);
    }
}