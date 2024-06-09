console.log("boardComment 들어옴!");
console.log("cmtWriter: ",cmtWriter);
console.log("bnoVal: ",bnoVal);

document.getElementById('cmtAddBtn').addEventListener('click',()=>{
    const cWriter = cmtWriter.substring(1,cmtWriter.length-1);
    const cContent  = document.getElementById('cmtContent').value;

    if(cContent==null||cContent=='') {
        alert("댓글을 입력해주세요.");
        document.getElementById('cmtContent').focus();
        return false;
    } else {
        let cmtData = {
            bno:bnoVal,
            cWriter:cWriter,
            cContent:cContent
        }
        console.log(cmtData);
        postComment(cmtData).then(result=>{
            console.log(result);
            if(result=="1") {
                console.log("댓글 등록 성공");
                document.getElementById('cmtContent').value='';
                spreadCommentList(bnoVal);
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
        const ul=document.querySelector(".commDeComment");
        if(result.cmtList.length>0) {
            if(page==1) {
                ul.innerHTML='';
            }
            for(let cvo of result.cmtList){
                let li = `<li class="list-group-item" data-cno="${cvo.cno}">`;
                li+=`<div class="mb-3">no.${cvo.cno} | &nbsp;`;
                li+=`<div class="fw-bold">${cvo.cwriter}</div>${cvo.ccontent}</div>`;
                li+=`<span class="badge rounded-pill text-bg-primary">${cvo.cregDate}</span>`
                //수정, 삭제 버튼
                li+=`&nbsp;<button type="button" class="btn btn-sm btn-outline-warning mod" data-bs-toggle="modal" data-bs-target="#myModal">수정</button>`;
                li+=`&nbsp;<button type="button" data-cno="${cvo.cno}" class="btn btn-sm btn-outline-danger del">삭제</button>`;
                li+=`</li>`;
                ul.innerHTML+=li;
            }

            //더보기 버튼
            let moreBtn = document.getElementById('moreBtn');
            if(result.realEndPage>result.pgvo.pageNo){
                moreBtn.style.visibility='visible';
                moreBtn.dataset.page=page+1;
            } else {
                moreBtn.style.visibility='hidden';
            }
        } else {
            let li = `<li>Comment List Empty</li>`
            ul.innerHTML=li;
        }
    })
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
    if(e.target.id=='moreBtn'){
        let page = parseInt(e.target.dataset.page);
        spreadCommentList(bnoVal,page)
    } else if(e.target.classList.contains('mod')){
        let li = e.target.closest('li');
        let cContent = li.querySelector('.fw-bold').nextSibling;
        console.log(cContent);
        document.getElementById('cmtModContent').value = cContent.nodeValue;
        document.getElementById('cmtModBtn').setAttribute("data-cno",li.dataset.cno);
    } else if(e.target.id=='cmtModBtn'){
        let cmtModData ={
            cno:e.target.dataset.cno,
            cContent: document.getElementById('cmtModContent').value
        };
        console.log(cmtModData);
        
        getModComment(cmtModData).then(result=>{
            if(result=='1'){
                console.log("댓글수정완료");
            }else {
                console.log("댓글수정실패");
            }
            spreadCommentList(bnoVal);
        })
    }
    //삭제
    else if(e.target.classList.contains('del')){
        let cnoVal = e.target.dataset.cno;
        removeComment(cnoVal).then(result=>{
            if(result=='1'){
                console.log("댓글삭제성공");
                spreadCommentList(bnoVal);
            } else {
                console.log("댓글삭제실패")
            }
        })
    }
})