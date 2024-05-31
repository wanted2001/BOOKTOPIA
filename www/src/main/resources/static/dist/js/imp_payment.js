console.log(ordName);
console.log(ordPhone);
console.log(ordMemo);
console.log(payName)
console.log(amount)

let i=1;
let uid = '';
let merchant_uid = 'payment_'+new Date().getTime()+i;
let item_name = '북토피아 '+payName+'개월 구독권';

function request_pay(){
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
            buyer_email:'email',
            buyer_tel:ordPhone,
            buyer_addr:'인천광역시 남동구 구월동',

        },
        function (rsp){
            // callback
            // res.imp_uid 값으로 결제 단건조회 API 호출해서 결제 결과 판단
            if(rsp.success){
                console.log('결제성공 boot!');
                console.log(rsp);
                let registerData ={
                    id:'test1',
                    impUid: rsp.imp_uid,
                    merchantUid: merchant_uid,
                    ordEmail:'',
                    ordName:ordName,
                    itemName:item_name,
                    totalAmount: amount,
                    pg_tid:rsp.pg_tid,
                };

                console.log(registerData);
                postRegisterSuccess(registerData).then(result=>{
                    console.log("result >> "+ result)

                    if(result === '1'){
                        let data ={
                            id:'test1',
                            impUid : rsp.imp_uid,
                            merchantUid: merchant_uid,
                            buyerEmail : 'email',
                            buyerName : ordName,
                            name :item_name,
                            paidAmount : amount,
                        };
                        console.log(data.toString());
                        postStorePaySuccess(data);

                        // window.location.href = "/";

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

function postStorePaySuccess(data){
    try {
        const url = "/pay/successPay";
        const config ={
            method: 'post',
            headers : {
                'content-type':'application/json; charset =utf-8'
            },
            body: JSON.stringify(data)
        };

        fetch(url, config).catch(error =>{
            console.log("error");
        })
    }catch (error){
        console.log("error" + error);
    }
}




//
//
// function getPayUser(){
//     const IMP = window.IMP;
//     IMP.init("imp42245168")
//     IMP.request_pay({
//         pg:'kakaopay.TC0ONETIME',
//         pay_method:'card',
//         merchant_uid : 'payment_'+new Date().getTime()+i, //주문번호
//         name:'북토피아 '+payName+'개월 구독권',
//         amount:totalAmount,
//         buyer_email:'',
//         buyer_name:ordName,
//         buyer_tel:ordPhone,
//         buyer_addr:'인천광역시 남동구 구월동'
//     }, function (rsp){
//             if(rsp.success){
//                 console.log('결제성공');
//                 uid = rsp.imp_uid;
//                 console.log(uid);
//                 $.ajax({
//                     url : '/pay/pay_ing/'+uid,
//                     type:'POST',
//                     dataType:'JSON',
//                     contentType:'application/json; charset=utf-8',
//                     crossDomain:true
//                 }).done(function (data) {
//                     console.log("data in");
//                     data=JSON.stringify({
//                         "orderNo":rsp.merchant_uid,
//                         "ordName":ordName,
//                         "ordPhone":ordPhone,
//                         "ordMemo":ordMemo
//                     });
//                     console.log(data);
//
//                     $.ajax({
//                         url: '/pay/done',
//                         type:'POST',
//                         dataType:'JSON',
//                         contentType:'application/json',
//                         data:data
//                     }).done(function (res) {
//                         if(res>0) {
//                             location.href='/pay/done';
//                             console.log("진짜결제완료");
//                         } else {
//                             alert('주문정보 저장 실패 ! 다시 시도해주세요');
//                         }
//                     })
//                     console.log("결제안됨")
//                 })
//             } else {
//                 alert('결제에 실패하였습니다. 실패 :'+rsp.error_msg)
//             }
//         }
//     )
//     i++;
//
// }