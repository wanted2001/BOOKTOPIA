// console.log("boardComment 들어옴!");
// console.log("cmtWriter: ",cmtWriter);
console.log("bnoVal: ",bnoVal);
const commDeUserId = document.querySelector('.commDeUserId').value;
console.log(commDeUserId);

document.getElementById('cmtAddBtn').addEventListener('click',()=>{
    const cContent  = document.getElementById('cmtContent').value;

    if(cContent==null||cContent=='') {
        alert("댓글을 입력해주세요.");
        document.getElementById('cmtContent').focus();
        return false;
    } else {
        let cmtData = {
            bno:bnoVal,
            cWriter:commDeUserId,
            cContent:cContent
        }
        console.log(cmtData);
        postComment(cmtData).then(result=>{
            console.log(result);
            if(result=="1") {
                console.log("댓글 등록 성공");
                document.getElementById('cmtContent').value='';
                spreadCommentList(bnoVal);
                // spreadReCommentList(bnoVal);
            }
        })
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
        console.log(rc)
        if(result.cmtList.length>0) {
            if(page==1) {
                ul.innerHTML='';
            }
            for(let cvo of result.cmtList){
                let li = `<div class="commDeCommentArea" data-cno="${cvo.cno}" value="${cvo.cno}" id="commDeCommentAreaId">`;
                li+=`<div class="commDe-Writer">${cvo.cwriter}</div>${cvo.cregDate.substring(0,16)}`;
                li+=`<div class="commDe-Content" id="commentContent">${cvo.ccontent}</div>`
                li+=`<div class="commDe-ReComment"><button type="button" id="recommendBtn">답댓글</button></div>`;
                // li+=`<div class="commDe-ReComment"><button type="button" id="showRecommendBtn">답댓글보기</button></div>`;
                li+=`<div class="recomm" data-cno="${cvo.cno}"></div>`
                //수정, 삭제 버튼
                if(commDeUserId===cvo.cwriter){
                    li+=`<div class="cmtBtn">`
                    li+=`&nbsp;<button type="button" id="cmtModBtn" class="commComModBtn">수정</button>`;
                    li+=`&nbsp;<button type="button" id="comDelBtn" data-cno="${cvo.cno}" class="commComDelBtn">삭제</button>`;
                    li+=`</div>`
                }
                li+=`</div>`;
                ul.innerHTML+=li;
                console.log("11");
                let cNum= 0;
                let printArea=document.querySelectorAll('.recomm');
                //let c = printArea.dataset.cno;
                printArea.forEach((c)=>{
                    console.log(c);
                   cNum= c.dataset.cno;
                    console.log(cNum);
                    console.log(cvo.cno);
                    if(cNum == cvo.cno ) {
                        console.log("ok");
                        //spreadReCommentList(c, cNum, page);
                        getReCommentList(cvo.cno,page=1).then(result=>{
                            // console.log(result);
                            // document.getElementById('recomment').innerHTML='';
                            //let printArea=document.querySelector('.recomm');
                            console.log(c);
                            console.log(result.rcmtList)
                            let plusPrint="";
                            for(let rcvo of result.rcmtList) {
                                console.log(rcvo.rcCno);
                                // printArea.setAttribute("data-cno",rcvo.rcCno)
                                // console.log(printArea.dataset.cno)
                                // if(printArea.dataset.cno===rcvo.cno){
                                //     console.log("cno일치");
                                // } else {
                                //     console.log("불일치")
                                // }
                                plusPrint += `<div class="commDeReCommentArea" data-cno="${rcvo.cno}">`;
                                plusPrint+=`<div class="commDe-Writer">${rcvo.rcWriter}-${rcvo.cno}</div>${rcvo.rcRegDate}`;
                                plusPrint+=`<div class="commDe-Content" id="commentContent">${rcvo.rcContent}</div>`
                                //console.log(printArea);
                                //수정, 삭제 버튼
                                if(commDeUserId===rcvo.rcwriter){
                                    plusPrint+=`<div class="cmtBtn">`
                                    plusPrint+=`&nbsp;<button type="button" id="cmtModBtn" class="commComModBtn">수정</button>`;
                                    plusPrint+=`&nbsp;<button type="button" id="comDelBtn" data-cno="${rcvo.cno}" class="commComDelBtn">삭제</button>`;
                                    plusPrint+=`</div>`
                                }
                                plusPrint+=`</div>`;


                            }
                            console.log(plusPrint);
                            c.innerHTML=plusPrint;
                        })
                    }

                });



                console.log("2222");
            }
        } else {
            ul.innerHTML=`<div class="commDeNon"></div>`;
        }
    })
}

document.addEventListener('click',(e)=>{
    if(e.target.id==='recommendBtn'){
        console.log("답댓버튼클릭");
        const cContent = e.target.closest('.commDeCommentArea');
        const cno = cContent.getAttribute('value');
        console.log(cno);
        let plusData = `<div class="reCommentArea" id="recomment">`
        plusData+=`<input type=text placeholder="댓글을 입력해주세요!" id="recommContent">`;
        plusData+=`<button type="button" id="recommBtn">등록</button>`;
        plusData+=`</div>`
        cContent.innerHTML+=plusData;
        document.getElementById('recommBtn').addEventListener('click',()=>{
            console.log("답댓글 등록버튼 클릭")
            let reCmtData = {
                cno:cno,
                bno:bnoVal,
                rcWriter:commDeUserId,
                rcContent:document.getElementById('recommContent').value
            }
            postReCommentToServer(reCmtData).then(result=>{
                if(result==='1'){
                    console.log("대댓 등록완료");
                }
            })
        })
            // document.getElementById('showRecommendBtn').addEventListener('click',()=>{
            //     spreadReCommentList(cno,page=1);
            // });
        }
    // } else if(e.target.id==='showRecommendBtn'){
    //     const cContent = e.target.closest('.commDeCommentArea');
    //     const cno = cContent.getAttribute('value');
    //     spreadReCommentList(cno,page=1)
    // }
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

function spreadReCommentList(c, cno,page=1) {
    getReCommentList(cno,page).then(result=>{
        // console.log(result);
        // document.getElementById('recomment').innerHTML='';
        //let printArea=document.querySelector('.recomm');
        console.log(c);
        console.log(result.rcmtList)
        let plusPrint="";
        for(let rcvo of result.rcmtList) {
            console.log(rcvo.rcCno);
            // printArea.setAttribute("data-cno",rcvo.rcCno)
            // console.log(printArea.dataset.cno)
            // if(printArea.dataset.cno===rcvo.cno){
            //     console.log("cno일치");
            // } else {
            //     console.log("불일치")
            // }
            plusPrint += `<div class="commDeReCommentArea" data-cno="${rcvo.cno}">`;
            plusPrint+=`<div class="commDe-Writer">${rcvo.rcWriter}-${rcvo.cno}</div>${rcvo.rcRegDate}`;
            plusPrint+=`<div class="commDe-Content" id="commentContent">${rcvo.rcContent}</div>`
            //console.log(printArea);
            //수정, 삭제 버튼
            if(commDeUserId===rcvo.rcwriter){
                plusPrint+=`<div class="cmtBtn">`
                plusPrint+=`&nbsp;<button type="button" id="cmtModBtn" class="commComModBtn">수정</button>`;
                plusPrint+=`&nbsp;<button type="button" id="comDelBtn" data-cno="${rcvo.cno}" class="commComDelBtn">삭제</button>`;
                plusPrint+=`</div>`
            }
            plusPrint+=`</div>`;


        }
        console.log(plusPrint);
        c.innerHTML=plusPrint;
        console.log(c);
    })
}

async function getReCommentList(cno,page){
    try{
        const resp = await fetch("/comment/rc/"+cno+"/"+page);
        const result = await resp.json();
        // console.log(result);
        return result;
    } catch (error) {
        console.log("getReCommentList error : "+error);
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
            if(result==='1'){
                console.log("댓글삭제성공");
                spreadCommentList(bnoVal);
            } else {
                console.log("댓글삭제실패")
            }
        })
    }
})