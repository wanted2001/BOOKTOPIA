document.addEventListener('DOMContentLoaded', () => {
const inquiryId= document.getElementById("inquiryId");
console.log("js in~~!");

const inquiryIdVal = inquiryId.innerText;
console.log(inquiryIdVal);

getAnsList(inquiryIdVal).then(result=>{
    console.log(result);

    const ul = document.getElementById("QnaResult");
    if(result.length == 0){
        ul.innerHTML = `<div class="QnaResultListDiv">현재 문의하신 내역이 없습니다.`;
    }else{
        result.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML =
            `<div class="qnaWrap">
                <div class="qnatitlediv">
                    ${item.qnaTitle}
                </div>
                <div class="qnacontentdiv">
                    ${item.qnaContent}
                </div>
                ${item.qnaAnswer == null ?
                   '<div class="qnaanswerdiv">아직 답변을 받지 못했습니다.</div>'
                   : `<div class="qnaanswerdiv">${item.qnaAnswer}</div>`
                   }

                <div class="qnaregatdiv">
                    ${item.qnaRegAt}
                </div>
                <div class="qnamogatdiv">
                     ${item.qnaMogAt}
                </div>
            </div>`;
        ul.appendChild(li);
        });
    }
});





});

async function getAnsList(id){
    const resp = await fetch("/qna/oneInquirylist/"+id);
    const result = resp.json();
    return result;
}