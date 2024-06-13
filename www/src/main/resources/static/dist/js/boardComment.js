// console.log("boardComment 들어옴!");
// console.log("cmtWriter: ",cmtWriter);
console.log("bnoVal: ",bnoVal);
const commDeUserId = document.querySelector('.commDeUserId').value;
const commDeUserEmail = document.querySelector('.commDeUserEmail').value;
console.log(commDeUserId);
console.log(commDeUserEmail);

document.getElementById('cmtAddBtn').addEventListener('click',()=>{
    const cContent  = document.getElementById('cmtContent').value;

    if(cContent==null||cContent=='') {
        alert("댓글을 입력해주세요.");
        document.getElementById('cmtContent').focus();
        return false;
    } else {
        if(commDeUserEmail==null || commDeUserEmail===''){
            let cmtData = {
                bno:bnoVal,
                cWriter:commDeUserId,
                cContent:cContent
            }
            console.log(cmtData);
            postComment(cmtData).then(result=>{
                console.log(result);
                if(result=="1") {
                    console.log("일반 유저 댓글 등록 성공");
                    document.getElementById('cmtContent').value='';
                    spreadCommentList(bnoVal);
                    // spreadReCommentList(bnoVal);
                }
            })
        } else {
            let cmtData = {
                bno:bnoVal,
                cWriter: commDeUserEmail,
                cContent:cContent
            }
            console.log(cmtData);
            postComment(cmtData).then(result=>{
                console.log(result);
                if(result=="1") {
                    console.log("소셜 유저 댓글 등록 성공");
                    document.getElementById('cmtContent').value='';
                    spreadCommentList(bnoVal);
                    // spreadReCommentList(bnoVal);
                }
            })
        }

    }
})

async function postComment(cmtData) {
    try {
        const url = "/comment/post";
        const config={
            method:"POST",
            headers:{
                'Content-Type': 'application/json; charset=utf8'
            },
            body:JSON.stringify(cmtData)
        };
        const resp = await fetch(url,config);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log("postComment error: "+error);
    }
}

async function getCommentList(bno,page){
    try{
        const resp = await fetch("/comment/"+bno+"/"+page);
        const result = await resp.json();
        return result;
    } catch (error) {
        console.log("getCommentList error : "+error);
    }
}

function spreadCommentList(bno,page=1) {
    getCommentList(bno,page).then(result=>{
        console.log(result);
        const ul=document.querySelector(".commDeOneComment");
        const rc = document.querySelector('.commDe-ReComment');
        if(result.cmtList.length>0) {
            console.log(result.cmtList);
            if(page==1) {
                ul.innerHTML='';
            }
            for(let obj of result.cmtList){
                console.log(obj.cvo.cno);

                let li = `<div class="commDeCommentArea" data-cno="${obj.cvo.cno}" value="${obj.cvo.cno}" id="commDeCommentAreaId">`;
                li+=`<div class="commImg"><img src="/image/profile2.png"></div>`;
                li+=`<div class="commComInfo"><span class="commDe-Writer">${obj.cvo.cwriter}&nbsp</span><span>${obj.cvo.cregDate.substring(0,16)}</span>`;
                li+=`<div class="commDe-ReComment"><button type="button" id="recommendBtn">대댓글 달기</button></div>`;
                li+=`<div class="commDe-Content" id="commentContent">${obj.cvo.ccontent}</div></div>`
                li+=`<div class="recomm" data-cno="${obj.cvo.cno}"></div>`
                //수정, 삭제 버튼
                if(commDeUserId===obj.cvo.cwriter || commDeUserEmail==obj.cvo.cwriter){
                    li+=`<div class="cmtBtn">`
                    li+=`&nbsp;<button type="button" id="cmtModBtn" class="commComModBtn">수정</button>`;
                    li+=`&nbsp;<button type="button" id="comDelBtn" data-cno="${obj.cvo.cno}" class="commComDelBtn">삭제</button>`;
                    li+=`</div>`
                }
                for(let rcvo of obj.rclist){
                    li+=`<div class="commDeReCommentArea" data-cno="${rcvo.cno}">`;
                    li+=`<div class="commImg2"><img src="/image/profile2.png"></div>`;
                    li+=`<div class="commDeReInfo"><span class="commDe-Writer">${rcvo.rcWriter}&nbsp</span><span>${rcvo.rcRegDate.substring(0,16)}</span>`;
                    li+=`<div class="commDe-Content" id="commentContent">${rcvo.rcContent}</div></div>`
                }
                li+=`</div>`;
                ul.innerHTML+=li;
            }
        } else {
            ul.innerHTML=`<div class="commDeNon"></div>`;
        }
    }).catch(error => {
        console.error("Error fetching comments:", error);
    });
}

document.addEventListener('click',(e)=>{
    if(e.target.id==='recommendBtn'){
        console.log("답댓버튼클릭");
        const cContent = e.target.closest('.commDeCommentArea');
        const cno = cContent.getAttribute('value');
        console.log(cno);
        let plusData = `<div class="reCommentArea" id="recomment">`
        plusData+=`<textarea type=text placeholder="댓글을 입력해주세요" id="recommContent"></textarea>`;
        plusData+=`<button type="button" id="recommBtn">등록</button>`;
        plusData+=`</div>`
        cContent.innerHTML+=plusData;
        document.getElementById('recommBtn').addEventListener('click',()=>{
            console.log("답댓글 등록버튼 클릭")
            if(document.getElementById('recommContent').value==null || document.getElementById('recommContent').value==''){
                alert("댓글을 입력해주세요.")
                document.getElementById('recommContent').focus();
            } else {
                let reCmtData = {
                    cno:cno,
                    bno:bnoVal,
                    rcWriter:commDeUserId,
                    rcContent:document.getElementById('recommContent').value
                }
                postReCommentToServer(reCmtData).then(result=>{
                    if(result==='1'){
                        console.log("대댓 등록완료");
                        spreadCommentList(bnoVal)
                    }
                })
            }
        })
    }
})

async function postReCommentToServer(reCmtData) {
    try {
        const url = "/comment/post/comment";
        const config ={
            method:"post",
            headers:{
                "content-type":"application/json; charset=utf-8"
            },
            body:JSON.stringify(reCmtData)
        };

        const resp = await fetch(url, config);
        const result = await resp.text(); //return=>isOk
        return result;
    } catch (error) {
        console.log(error);
    }
}

//수정
async function getModComment(cmtModData) {
    try{
        const url="/comment/modify";
        const config = {
            method:"PUT",
            headers:{
                'Content-Type': 'application/json; charset=utf8'
            },
            body:JSON.stringify(cmtModData)
        };

        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log("mod error : "+error);
    }
}

//삭제
async function removeComment(cnoVal){
    try{
        const url = "/comment/"+cnoVal;
        const config ={
            method:"delete"
        }
        const resp = await fetch(url,config);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log("remove error : "+error);
    }
}

document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('commComModBtn')){
        console.log("수정버튼 누름")

        const cContent = e.target.closest('.commDeCommentArea');
        console.log(cContent);
        const cvArea = cContent.querySelector('.commDe-Content');
        let cv = cContent.querySelector('.commDe-Content').innerHTML;
        console.log(cv);
        cvArea.innerHTML='';

        // let cno = document.querySelector('.commDeCommentArea').getAttribute('value');
        let cno = cContent.getAttribute('value');
        console.log(cno);

        let modComment = `<input type="text" id="cmtModContent" value="${cv}" data-cno="${cno}">`;
        console.log(modComment)
        cContent.innerHTML+=modComment;

        cContent.querySelector('.cmtBtn').innerHTML='';
        cContent.innerHTML+=`<button type="button" id="commModBtn">수정하기</button>`;

    } else if(e.target.id==='commModBtn'){
        const cContent = e.target.closest('.commDeCommentArea');
        let cmtModData ={
            cno:cContent.getAttribute('value'),
            cContent: document.getElementById('cmtModContent').value
        };
        console.log(cmtModData);

        getModComment(cmtModData).then(result=>{
            if(result==='1'){
                console.log("댓글수정완료");
            }else {
                console.log("댓글수정실패");
            }
            spreadCommentList(bnoVal);
        })
    }
    //삭제
    else if(e.target.classList.contains('commComDelBtn')){
        let cnoVal = e.target.dataset.cno;
        removeComment(cnoVal).then(result=>{
            console.log(result)
            if(result==='1'){
                console.log("댓글삭제성공");
                spreadCommentList(bnoVal);
            } else {
                console.log("댓글삭제실패")
            }
        })
    }
})