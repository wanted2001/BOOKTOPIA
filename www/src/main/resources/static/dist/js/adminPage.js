document.addEventListener('click', (e) => {
    const target = e.target;
    console.log(e.target);
    if (target.classList.contains('admin-btn')) {
        e.preventDefault();

        const btnId = target.id
        handleButtonClick(btnId);
    } else if(e.target.id === 'adminapproval'){
        // 배송현황 > 결제승인 버튼을 클릭 했을 때...
        let status = document.getElementById('adminapproval').value;
        console.log(status);
        status = '결제승인/배송중';
        console.log(status);
        postStatus(status).then(result =>{
            console.log(result);
        })
    }
});

// function changeStatus(){
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', '/changeStaatus');
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.onload = function (){
//         if(xhr.status === 200){
//             console.log('상태변경 성공');
//         } else {
//             console.log('상태변경 실패');
//         }
//     };
//     xhr.send(JSON.stringify({merchant_uid:merchant_uid}));
// }

async function postStatus (){
    try {
        const url = "/admin/postStatus";
        const config = {
            method : "POST",
            headers : {
                "Content-type":"application/json; charset=UTF-8"
            },
            body : JSON.stringify()
        };

        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;

    }catch (error){
        console.log(error);
    }
}


function handleButtonClick(btnId) {
        console.log(btnId);
    const sections = ['.admin-UserList', '.bookTopia-user', '.subUser', '.delivery', '.commuBoard','.commuComment'];
        let index = sections[btnId.slice(-1)-1];
        console.log(index);
    sections.forEach(section => {
        const displayStyle = section.includes(index) ? 'block' : 'none';
        console.log(section);
        console.log(displayStyle);
        document.querySelector(section).style.display = displayStyle;
    });

    const buttons = document.querySelectorAll('.admin-btn');
    buttons.forEach(button => {
        button.style.backgroundColor = button.id === btnId ? '#ffb1b0' : '';
    });
}












//
// const buttonsData = [
//     {id:'aBtn1', targetClass:'admin-UserList'}, //회원리스트
//     {id:'aBtn2', targetClass:'bookTopia-user'}, //취향검사 리스트
//     {id:'aBtn3', targetClass:'subUser'}, //구독자 리스트
//     {id:'aBtn4', targetClass:'delivery'}, //배송현황
//     {id:'aBtn7', targetClass:'adminCommuDiv'}, //커뮤니티 관리
//     {id:'adcommuBtn1', targetClass:'commuBoard'}, //게시판 관리
//     {id:'adcommuBtn2', targetClass:'commuCommen'}, //댓글 관리
// ];
//
// document.addEventListener('click',(e)=>{
//     if(e.target.tagName.toLowerCase() === 'button') {
//         const clickButton = buttonsData.find(button => button.id === e.target.id);
//         if (clickButton) {
//             // 버튼 스타일 변경
//             e.target.style.backgroundColor = '#ffb1b0';
//             console.log(e.target);
//
//             // 다름 버튼들 스타일 초기화
//             buttonsData.forEach(button => {
//                 document.querySelector('.${button.targetClass}').style.backgroundColor = '';
//             });
//
//             // 컨텐츠 숨김처리
//             showTarget(clickButton.targetClass);
//         }
//     }
// });
//
// function showTarget(targetClass){
//     document.querySelector('.${targetClass}').style.display = 'block';
// }
//




// document.addEventListener('click',(e)=>{
//     const taget = e.target;
//     taget.style.backgroundColor = '#ffb1b0';
//     console.log(taget);
//
//     const buttons = document.querySelectorAll('.admin-btn');
//     for(const button of buttons){
//         if(button !== taget){
//             button.style.backgroundColor = '';
//         }
//     }
//
//     if(e.target.id === 'aBtn1'){
//         document.querySelector('.admin-UserList').style.display = 'block';
//         document.querySelector('.bookTopia-user').style.display = 'none';
//         document.querySelector('.subUser').style.display = 'none';
//         document.querySelector('.delivery').style.display = 'none';
//         document.querySelector('.adminCommuDiv').style.display = 'none'
//     }
//     else if (e.target.id === 'aBtn2'){
//         document.querySelector('.admin-UserList').style.display = 'none';
//         document.querySelector('.bookTopia-user').style.display = 'block';
//         document.querySelector('.subUser').style.display = 'none';
//         document.querySelector('.delivery').style.display = 'none';
//         document.querySelector('.adminCommuDiv').style.display = 'none'
//     } else if(e.target.id === 'aBtn3') {
//         document.querySelector('.admin-UserList').style.display = 'none';
//         document.querySelector('.bookTopia-user').style.display = 'none';
//         document.querySelector('.subUser').style.display = 'block';
//         document.querySelector('.delivery').style.display = 'none';
//         document.querySelector('.adminCommuDiv').style.display = 'none'
//     } else if(e.target.id === 'aBtn4'){
//         document.querySelector('.admin-UserList').style.display = 'none';
//         document.querySelector('.bookTopia-user').style.display = 'none';
//         document.querySelector('.subUser').style.display = 'none';
//         document.querySelector('.delivery').style.display = 'block';
//         document.querySelector('.adminCommuDiv').style.display = 'none'
//     } else if(e.target.id === 'aBtn7'){
//         document.querySelector('.admin-UserList').style.display = 'none';
//         document.querySelector('.bookTopia-user').style.display = 'none';
//         document.querySelector('.subUser').style.display = 'none';
//         document.querySelector('.delivery').style.display = 'none';
//         document.querySelector('.adminCommuDiv').style.display = 'block';
//         document.querySelector('.commuBoard').style.display = 'block';
//         document.getElementById('adcommuBtn1').style.backgroundColor = '#ffb1b0';
//         document.getElementById('adcommuBtn2').style.backgroundColor = 'white';
//
//     } else if (e.target.id === 'adcommuBtn2'){
//         document.querySelector('.admin-UserList').style.display = 'none';
//         document.querySelector('.bookTopia-user').style.display = 'none';
//         document.querySelector('.subUser').style.display = 'none';
//         document.querySelector('.delivery').style.display = 'none';
//         document.querySelector('.adminCommuDiv').style.display = 'block';
//         document.querySelector('.commuBoard').style.display = 'none';
//         document.querySelector('.commuCommen').style.display = 'block';
//         document.getElementById('aBtn7').style.backgroundColor = '#ffb1b0'
//         document.getElementById('adcommuBtn1').style.backgroundColor = 'white';
//         document.getElementById('adcommuBtn2').style.backgroundColor = '#ffb1b0';
//     }
// })



