// console.log("payment js in");
//
// $(function (){
//     console.log('큰 함수');
//     $('.payBtn').click(function (){
//         console.log("버튼클릭");
//         $.ajax({
//             url:'http://localhost:8099/pay/kakaoPay',
//             dataType:"json",
//             success:function (data){
//                 console.log("결제성공")
//             },
//             error:function (error) {
//                 console.log(error)
//             }
//         })
//     })
})
document.querySelector('.payBtn').addEventListener('DOMC',()=>{
    console.log("결제버튼클릭");
    $.ajax({
        url:'/pay/kakaoPay',
        dataType:"json",
        success:function (data){
            console.log("결제성공")
        },
        error:function (error) {
            console.log(error)
        }
    })
    // kakaoPay();
});

let i=1;

function kakaoPay() {
    console.log("함수 in");
    const IMP = window.IMP;
    IMP.init("imp42245168");
    IMP.request_pay({
        pg:'kakaopay.TC0ONETIME',
        pay_method:'card',
        merchant_uid : 'payment_'+new Date().getTime()+i, //주문번호
        name:'책 구매',
        amount:1,
        buyer_email:'test1@naver.com',
        buyer_name:'홍길동',
        buyer_tel:'010-1234-5678',
        buyer_addr:'인천광역시 남동구 구월동',
        buyer_postcode:'12345' //우편번호
    },function (rsp) {
        if(rsp.success){
            console.log("결제성공!");
            jQuery.ajax({
                url:"/pay/complete",
                type:'POST',
                contentType:'application/json',
                data:JSON.stringify({
                    tid:rsp.merchant_uid,
                    amount:rsp.amount,
                    payName:rsp.name
                })
            })
        } else {
            console.log("결제실패"+rsp.errorText);
            alert("결제에 실패하였습니다. "+rsp.error_msg);
        }
    }
)
}



