const question = document.getElementById('question');
const btn1 =  document.getElementById('btn1');
const btn2 = document.getElementById('btn2');

document.getElementById('next').addEventListener('click',()=>{
    document.getElementById('questionInfo').style.display = "none";
    document.getElementById('questionDiv').style.display = "block";
    question.innerText = testListaArry[0].question
    btn1.innerText = testListaArry[0].answer1
    btn2.innerText = testListaArry[0].answer2
       
});

const testListaArry =[
    {
        question : '질문1',
        answer1 : '질문1-선택1',
        answer2 : '질문1-선택2'
    },
    {
        question : '질문2',
        answer1 : '질문2-선택1',
        answer2 : '질문2-선택2'
    },
    {
        question : '질문3',
        answer1 : '질문3-선택1',
        answer2 : '질문3-선택2'
    },
    {
        question : '질문4',
        answer1 : '질문4-선택1',
        answer2 : '질문4-선택2'
    },
    {
        question : '질문5',
        answer1 : '질문5-선택1',
        answer2 : '질문5-선택2'
    },
    {
        question : '질문6',
        answer1 : '질문6-선택1',
        answer2 : '질문6-선택2'
    },
    {
        question : '질문7',
        answer1 : '질문7-선택1',
        answer2 : '질문7-선택2'
    },
    {
        question : '질문8',
        answer1 : '질문8-선택1',
        answer2 : '질문8-선택2'
    },
    {
        question : '질문9',
        answer1 : '질문9-선택1',
        answer2 : '질문9-선택2'
    },
    {
        question : '질문10',
        answer1 : '질문10-선택1',
        answer2 : '질문10-선택2'
    }
];


let i = 1;
let btnResult = 0;
document.addEventListener('click',(e)=>{
    if(e.target.id == 'btn1' || e.target.id == 'btn2') {
        if(i<testListaArry.length){
            question.innerText = testListaArry[i].question
            btn1.innerText = testListaArry[i].answer1
            btn2.innerText = testListaArry[i].answer2        
            i++;
            if(e.target.id == 'btn1'){
                btnResult += 1;
            } else if(e.target.id == 'btn2'){
                btnResult += 2;
            }
        }
        else if(i == testListaArry.length){
            document.getElementById('questionDiv').style.display = "none";
            document.getElementById('resultDiv').style.display = 'block';
        }
    }
    console.log(btnResult);
});


async function btnResultToServer(btnResult){
    try {
        const url = "/booktopiaTest/result";
        const config={
            method : 'post',
            headers : {'Content-type':'application/json; charset=UTF-8'
            },
            body:JSON.stringify(btnResult)
        };

        const resp = await feach(url, config);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// document.addEventListener('click',(e)=>{
//     if(e.target.id == 'btn1' || e.target.id == 'btn2'){
//         position = Math.floor((e.pageX-offset.left)/innerWidth()*100)+1;
//         document.querySelector('.percent').classList('transform', 'translateX('+position+'%)');
//     }
// });


//  progressBar > width: 400px;

const progressBar = document.querySelector('.percent');

let scrollNum = 0;
let documentHeight=0;

const getPercent = (scroll, total)=>{
    return (scroll/total)*100;
}

document.addEventListener('click',(e)=>{
    if(e.target.tagName == 'button'){
        scrollNum = document.documentElement.scrollTop;

        documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        progressBar.style.width = getPercent(scrollNum, documentHeight) + '%';
    }
})