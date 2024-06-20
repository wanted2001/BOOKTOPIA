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
const amountInput = document.querySelector('.amountInput').value;

const kakaoPayBtn = document.getElementById('kakaoPayBtn');
const tossBtn = document.getElementById('tossBtn');
const paycoBtn = document.getElementById('paycoBtn');
const kgBtn = document.getElementById('kgBtn');
const tossCss = document.querySelector('.tossM');
const kakaoCss = document.querySelector('.kakaoPayM');
const paycoCss = document.querySelector('.paycoM');
const kgCss = document.querySelector('.kgM');
let btn;
/*css 변경하는 이벤트*/
document.addEventListener('click',(e)=>{
    if(e.target.id==='kakaoPayBtn'){
        changeCss(kakaoCss);
        changeNonCss(tossCss,paycoCss,kgCss);
        // e.target.closest('.payM').className+='kakao';
        e.target.closest('.payM').setAttribute("data-btn","kakao");
    } else if(e.target.id==='tossBtn'){
        changeCss(tossCss);
        changeNonCss(kakaoCss,paycoCss,kgCss);
        e.target.closest('.payM').setAttribute("data-btn","toss");
    } else if(e.target.id==='paycoBtn') {
        changeCss(paycoCss);
        changeNonCss(kakaoCss,tossCss,kgCss);
        e.target.closest('.payM').setAttribute("data-btn","kg");
    } else if(e.target.id==='kgBtn'){
        changeCss(kgCss);
        changeNonCss(kakaoCss,paycoCss,tossCss);
        e.target.closest('.payM').setAttribute("data-btn","kg");
    }
})


function changeCss(payM){
    payM.style.cssText="border:2px solid #a7cdff; box-shadow:0px 0px 12px gainsboro; font-weight:bold;";
}
function changeNonCss(payM1,payM2,payM3){
    payM1.style.cssText="border:1px solid gainsboro; padding10px; border-radius:10px; font-weight:none;" +
        "margin-top:14px; text-align:center; line-height:23px; width:437px; box-shadow:none";
    payM2.style.cssText="border:1px solid gainsboro; padding10px; border-radius:10px; font-weight:none;" +
        "margin-top:14px; text-align:center; line-height:23px; width:437px; box-shadow:none";
    payM3.style.cssText="border:1px solid gainsboro; padding10px; border-radius:10px; font-weight:none;" +
        "margin-top:14px; text-align:center; line-height:23px; width:437px; box-shadow:none";
}

function request_pay(){
    let ordaddr = document.getElementById('addrInput').value;
    let ordaddrdetail = document.getElementById('addrDetailInput').value;
    let ordPhone = document.getElementById('ordPhone').value;
    const coupon = $('select#coupon').val();
    console.log(coupon)
    console.log("테스트으으으으으"+ ordaddr);
    console.log("디테이이이일 테스트으으으으으"+  ordaddrdetail);
    console.log(ordName);

    // $(function (){
    //     let i = document.querySelectorAll('.payM').length;
    //     for(j=0; j=i; j++){
    //         $('payMethodInner').children();
    //     }
    //
    // })


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
        if(coupon!=='choiceCoupon'){
            amount = discountAmount(amount);
        }
        console.log(amount);
        console.log(amountInput);
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
                    let registerData;
                    if(coupon==='신규가입 구독권 10% 할인') {
                        console.log("신규가입 쿠폰 결제 생성")
                        registerData ={
                            id:ordId,
                            impUid: rsp.imp_uid,
                            merchantUid: merchant_uid,
                            ordEmail:ordEmail,
                            ordName:ordName,
                            ordPhone: ordPhone,
                            ordAddr:ordaddr+"/"+ordaddrdetail,
                            itemName:item_name,
                            totalAmount: amount,
                            saleAmount:amountInput*0.1,
                            couNo:couNo,
                            pg_tid:rsp.pg_tid,
                        };
                    } else if(coupon==='신규회원 1개월 구독권 100% 할인'){
                        console.log("신규가입 쿠폰 결제 생성")
                        registerData ={
                            id:ordId,
                            impUid: rsp.imp_uid,
                            merchantUid: merchant_uid,
                            ordEmail:ordEmail,
                            ordName:ordName,
                            ordPhone: ordPhone,
                            ordAddr:ordaddr+"/"+ordaddrdetail,
                            itemName:item_name,
                            totalAmount: 0,
                            saleAmount:amountInput,
                            couNo:couNo,
                            pg_tid:rsp.pg_tid,
                        };
                    } else if(coupon==='6월 내 구독권 결제 시, 10% 할인'){
                        console.log("신규가입 쿠폰 결제 생성")
                        registerData ={
                            id:ordId,
                            impUid: rsp.imp_uid,
                            merchantUid: merchant_uid,
                            ordEmail:ordEmail,
                            ordName:ordName,
                            ordPhone: ordPhone,
                            ordAddr:ordaddr+"/"+ordaddrdetail,
                            itemName:item_name,
                            totalAmount: amount,
                            saleAmount:amountInput*0.1,
                            couNo:couNo,
                            pg_tid:rsp.pg_tid,
                        };
                    } else if(coupon==='북토피아 창립기념 30% 할인'){
                        console.log("신규가입 쿠폰 결제 생성")
                        registerData ={
                            id:ordId,
                            impUid: rsp.imp_uid,
                            merchantUid: merchant_uid,
                            ordEmail:ordEmail,
                            ordName:ordName,
                            ordPhone: ordPhone,
                            ordAddr:ordaddr+"/"+ordaddrdetail,
                            itemName:item_name,
                            totalAmount: amount,
                            saleAmount:amountInput*0.3,
                            couNo:couNo,
                            pg_tid:rsp.pg_tid,
                        };
                    }
                    else {
                        registerData ={
                            id:ordId,
                            impUid: rsp.imp_uid,
                            merchantUid: merchant_uid,
                            ordEmail:ordEmail,
                            ordName:ordName,
                            ordPhone: ordPhone,
                            ordAddr:ordaddr+"/"+ordaddrdetail,
                            itemName:item_name,
                            totalAmount: amount,
                            saleAmount:0,
                            couNo:0,
                            pg_tid:rsp.pg_tid,
                        };
                    }
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
                                    // window.location.href = "/pay/done/"+result.merchantUid;
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
let salePercent=0;
let couNo=0;
function discountAmount(amount){
    const coupon = $('select#coupon').val();
    console.log(coupon)

    if(coupon==='신규가입 구독권 10% 할인'){
        amount=amount-(amount*0.1);
        console.log(amount);
        couNo=2;
        return amount;
    } else if(coupon==='1년 이상 누적 구독시, 구독권 50% 할인 쿠폰'){
        couNo=1;
        return amount;
    } else if(coupon==='신규회원 1개월 구독권 100% 할인') {
        amount=amount-(amount*1);
        couNo=3;
        return amount;
    } else if(coupon==='6월 내 구독권 결제 시, 10% 할인'){
        amount = amount-(amount*0.1);
        couNo=4;
        return amount;
    } else if(coupon==='북토피아 창립기념 30% 할인'){
        amount = amount-(amount*0.3);
        couNo=5;
        return amount;
    }
}

document.getElementById('coupon').addEventListener('change',()=>{
    const couponName = $('select#coupon').val();
    console.log(couponName);
    const payAmount = document.querySelector('.priceDiv').value;
    const discountDiv = document.querySelector('.discountAmount');
    const amountDiv = document.querySelector('.amountDiv');
    // let totalAmount = discountAmount(payAmount);
    if(couponName==='신규가입 구독권 10% 할인'){
        console.log("웰컴 쿠폰 선택함.")
        couNo=1;
        discountCoupon(couNo,ordId).then(result=>{
            result.forEach(item=>{
                if(item.couUse==='N'){
                    console.log(amount)
                    discountDiv.innerHTML='';
                    discountDiv.innerHTML+=payAmount*0.1+"원";
                    amountDiv.innerHTML='';
                    amountDiv.innerHTML+=payAmount-(payAmount*0.1)+"원";
                } else {
                    alert("이미 사용한 쿠폰입니다.");
                    console.log("이미 사용한 쿠폰");
                    $('#coupon').val('choiceCoupon').prop('selected', true);
                    discountDiv.innerHTML = '';
                    discountDiv.innerHTML = '0원';
                    amountDiv.innerHTML='';
                    amountDiv.innerHTML=payAmount+"원";
                }
            })
        })

    } else if(couponName==='신규회원 1개월 구독권 100% 할인'){
        console.log("0원 쿠폰 선택함.")
        couNo=3;
        discountCoupon(couNo,ordId).then(result=>{
            result.forEach(item=>{
                if(item.couUse==='N'){
                    console.log(amount)
                    discountDiv.innerHTML='';
                    discountDiv.innerHTML+=payAmount+"원";
                    amountDiv.innerHTML='';
                    amountDiv.innerHTML+="0원";
                } else {
                    alert("이미 사용한 쿠폰입니다.");
                    console.log("이미 사용한 쿠폰");
                    $('#coupon').val('choiceCoupon').prop('selected', true);
                    discountDiv.innerHTML = '';
                    discountDiv.innerHTML = '0원';
                    amountDiv.innerHTML='';
                    amountDiv.innerHTML=payAmount+"원";
                }
            })
        })

    } else if(couponName==='6월 내 구독권 결제 시, 10% 할인'){
        console.log("6월쿠폰 선택함.")
        couNo=4;
        discountCoupon(couNo,ordId).then(result=>{
            result.forEach(item=>{
                if(item.couUse==='N'){
                    console.log(amount)
                    discountDiv.innerHTML='';
                    discountDiv.innerHTML+=payAmount*0.1+"원";
                    amountDiv.innerHTML='';
                    amountDiv.innerHTML+=payAmount-(payAmount*0.1)+"원";
                } else {
                    alert("이미 사용한 쿠폰입니다.");
                    console.log("이미 사용한 쿠폰");
                    $('#coupon').val('choiceCoupon').prop('selected', true);
                    discountDiv.innerHTML = '';
                    discountDiv.innerHTML = '0원';
                    amountDiv.innerHTML='';
                    amountDiv.innerHTML=payAmount+"원";
                }
            })
        })
    } else if(couponName==='북토피아 창립기념 30% 할인'){
        console.log("창립기념 쿠폰 선택함.")
        couNo=5;
        discountCoupon(couNo,ordId).then(result=>{
            result.forEach(item=>{
                if(item.couUse==='N'){
                    console.log(amount)
                    discountDiv.innerHTML='';
                    discountDiv.innerHTML+=payAmount*0.3+"원";
                    amountDiv.innerHTML='';
                    amountDiv.innerHTML+=payAmount-(payAmount*0.3)+"원";
                } else {
                    alert("이미 사용한 쿠폰입니다.");
                    console.log("이미 사용한 쿠폰");
                    $('#coupon').val('choiceCoupon').prop('selected', true);
                    discountDiv.innerHTML = '';
                    discountDiv.innerHTML = '0원';
                    amountDiv.innerHTML='';
                    amountDiv.innerHTML=payAmount+"원";
                }
            })
        })
    } else if(couponName==='1년 이상 누적 구독시, 구독권 50% 할인 쿠폰'){
        alert('현재 사용할 수 없는 쿠폰입니다.');
        $('#coupon').val('choiceCoupon').prop('selected',true);
        discountDiv.innerHTML='';
        discountDiv.innerHTML+="0원";
        amountDiv.innerHTML='';
        amountDiv.innerHTML+=payAmount+"원";
    } else if(couponName==='choiceCoupon'){
        $('#coupon').val('choiceCoupon').prop('selected',true);
        discountDiv.innerHTML='';
        discountDiv.innerHTML+="0원";
        amountDiv.innerHTML='';
        amountDiv.innerHTML+=payAmount+"원";
    }
})

async function discountCoupon(couNo,id){
    try{
        const url = "/coupon/sale/"+couNo+"/"+id;
        const config = {
            method:"POST",
            headers:{
                'content-type':'application/json; charset=UTF-8'
            }
        }
        const resp = await fetch(url,config);
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log("discount error"+error);
    }
}