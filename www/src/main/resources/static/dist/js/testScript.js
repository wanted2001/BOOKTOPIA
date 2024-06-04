const question = document.getElementById('question');
const btn1 =  document.getElementById('btn1');
const btn2 = document.getElementById('btn2');

const result = document.getElementById('resultBtn');
const home = document.getElementById('home');

document.getElementById('next').addEventListener('click',()=>{
    document.getElementById('questionInfo').style.display = "none";
    document.getElementById('questionDiv').style.display = "block";
    question.innerText = testListaArry[0].question
    btn1.innerText = testListaArry[0].answer1
    btn2.innerText = testListaArry[0].answer2
       
});

const testListaArry =[
    {
        question : '나는 책을 읽을 때,',
        answer1 : '문학(소설, 시, 에세이)이 더 좋다',
        answer2 : '비문학(정보 위주의 글)이 더 좋다'
    },
    {
        question : '독서 할 때 선호하는 환경은,',
        answer1 : '사람들과 카페에서 함께',
        answer2 : '혼자 집에서'
    },
    {
        question : '독서 중 누군가 말을 건다면, ',
        answer1 : '독서를 멈추고 이야기를 들어준다',
        answer2 : '잠시 기다려달라고 한다'
    },
    {
        question : '최근 베스트셀러를 볼 때,',
        answer1 : '국내 작가에게 더 흥미가 간다',
        answer2 : '해외 작가에게 더 흥미가 간다'
    },
    {
        question : '지인에게 책을 추천 할 때는, ',
        answer1 : '감상, 느낌 위주로 추천',
        answer2 : '줄거리, 소재 위주로 추천'
    },
    {
        question : '책에서 집중해서 읽게 되는 부분은?',
        answer1 : '인문의 감정과 서사',
        answer2 : '사건의 전개와 흐름'
    },
    {
        question : '한 달에 책을 몇권 읽으시나요?',
        answer1 : '매번 바뀌지만 최대한 자주 읽으려 한다',
        answer2 : '항상 책을 읽고 있어 세보지 않았다'
    },
    {
        question : '책갈피로 쓰는 건?',
        answer1 : '손에 잡히는 물건 아무거나',
        answer2 : '책갈피를 쓰지 않는다'
    },
    {
        question : '당신의 독서기록 유형은?',
        answer1 : '꾸준히 기록',
        answer2 : '책은 읽지만 따로 기록하지는 않는다'
    },
    {
        question : '독서모임 전날 나의 모습은?',
        answer1 : '함께 나눌 이야기에 대해 검토한다',
        answer2 : '그저 설레뿐, 아무런 생각이 없다'
    }
];


let i = 1;
let btnResult = 0;
let per = 0
document.addEventListener('click',(e)=>{
    if(e.target.id == 'btn1' || e.target.id == 'btn2') {
        per += 10;
        document.querySelector('.percent').style.width = `${per}%`;
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

            console.log(btnResult);
        }
        else if(i == testListaArry.length){
            if(e.target.id == 'btn1'){
                btnResult += 1;
            } else if(e.target.id == 'btn2'){
                btnResult += 2;
            }
            document.getElementById('questionDiv').style.display = "none";
            document.getElementById('resultDiv').style.display = 'block';

        }
        
    }
    else if(e.target.classList.contains('result')){
        console.log(e.target.classList);
        location.href=`/booktopiaTest/bookList?btnResult=${btnResult}`;
    }
    else if(e.target.id == 'home'){
        location.href = `/`;
    }
});



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