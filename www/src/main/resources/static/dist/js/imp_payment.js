console.log(ordName);
console.log(ordPhone);
console.log(ordMemo);
console.log(payName)
console.log(totalAmount)

let i=1;
let uid = '';

function getPayUser(){
    const IMP = window.IMP;
    IMP.init("imp42245168")
    IMP.request_pay({
        pg:'kakaopay.TC0ONETIME',
        pay_method:'card',
        merchant_uid : 'payment_'+new Date().getTime()+i, //주문번호
        name:'북토피아 '+payName+'개월 구독권',
        amount:totalAmount,
        buyer_email:'',
        buyer_name:ordName,
        buyer_tel:ordPhone,
        buyer_addr:'인천광역시 남동구 구월동'
    }, function (rsp){
            if(rsp.success){
                console.log('결제성공');
                uid = rsp.imp_uid;
                console.log(uid);
                $.ajax({
                    url : '/pay/pay_ing/'+uid,
                    type:'POST',
                    dataType:'JSON',
                    contentType:'application/json; charset=utf-8',
                    crossDomain:true
                }).done(function (data) {
                    console.log("data in");
                    data=JSON.stringify({
                        "orderNo":rsp.merchant_uid,
                        "ordName":ordName,
                        "ordPhone":ordPhone,
                        "ordMemo":ordMemo
                    });
                    console.log(data);

                    $.ajax({
                        url: '/pay/done',
                        type:'POST',
                        dataType:'JSON',
                        contentType:'application/json',
                        data:data
                    }).done(function (res) {
                        if(res>0) {
                            location.href='/pay/done';
                            console.log("진짜결제완료");
                        } else {
                            alert('주문정보 저장 실패 ! 다시 시도해주세요');
                        }
                    })
                    console.log("결제안됨")
                })
            } else {
                alert('결제에 실패하였습니다. 실패 :'+rsp.error_msg)
            }
        }
    )
    i++;

}