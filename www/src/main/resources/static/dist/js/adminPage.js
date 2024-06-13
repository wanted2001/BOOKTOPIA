
document.addEventListener('click', (e) => {
    const target = e.target;
    console.log(e.target);
    if (target.classList.contains('admin-btn')) {
        e.preventDefault();

        const btnId = target.id
        handleButtonClick(btnId);
    } else if(e.target.id === 'adminapproval'){
        // 배송현황 > 결제승인 버튼을 클릭 했을 때...
        // let status = document.getElementById('adminapproval').value;
        // console.log(status);
        // status = '결제승인/배송중';
        // console.log(status);
        // postStatus(status).then(result =>{
        //     console.log(result);
        // })
    } else if (e.target.classList.contains('boardDel')){
        // 게시글 삭제 버튼을 눌렀을 때...
        const tr = e.target.closest('tr');
        console.log(tr);
        let bno = tr.querySelector(".adbbno").innerText;
        console.log(bno);

        boardDelToServer(bno).then(result =>{
            if(result == 1){
                console.log(result);
                alert('게시글 삭제 완료되었습니다.');
                tr.parentNode.removeChild(tr);
            }
        })
    } else if(e.target.classList.contains('commentDel')){
        const tr = e.target.closest('tr');
        console.log(tr);
        let bno = tr.querySelector(".adcbno").innerText;
        console.log(bno);

        CommentDelToServer(bno).then(result =>{
            if(result == 1){
                console.log(result);
                alert('댓글 삭제 되었습니다.');
                tr.parentNode.removeChild(tr);
            }
        })
    }
});

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

// 게시글 관리 > 삭제
async function boardDelToServer(bno){
    try {
        const url = "/admin/boardDel/"+bno;
        const config = {
            method : 'delete',
        };

        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error){
        console.log(error);
    }
}

async function CommentDelToServer(bno){
    try {
        const url = "/admin/commentDel/"+bno;
        const config = {
            method : 'delete',
        };

        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error){
        console.log(error);
    }
}

// 댓글 관리 > 삭제

// 배송현황 버튼 처리

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

// async function postStatus (){
//     try {
//         const url = "/admin/postStatus";
//         const config = {
//             method : "POST",
//             headers : {
//                 "Content-type":"application/json; charset=UTF-8"
//             },
//             body : JSON.stringify()
//         };
//
//         const resp = await fetch(url, config);
//         const result = await resp.text();
//         return result;
//
//     }catch (error){
//         console.log(error);
//     }
// }