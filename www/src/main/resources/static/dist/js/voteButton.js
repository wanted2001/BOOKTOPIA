console.log("js in");

let upresult = 0;
let downresult = 0;
let TotalClick = 0; //총 클릭 수

let per = 50;
let downPer =50;


document.addEventListener('click',(e)=>{
    // console.log(e.target.tagName);
    if(e.target.tagName === "IMG"){
        TotalClick += 1;
        console.log(TotalClick);


        if (e.target.id === 'upImg'){
            upresult +=1;
            per +=3;
            downPer = 100-per;
            // document.querySelector('.upPersentbox').style.width = `${per}%`;
            document.querySelector('.downPerbox').style.width = `${per}%`;
            // console.log("upBtn >>>> "+upresult);
            console.log("per >> "+per)
            console.log("downper >> "+downPer);

        } else if(e.target.id === 'downImg'){
            downresult +=1;
            per -=3;
            downPer = 100-per;
            document.querySelector('.downPerbox').style.width = `${per}%`;
            // document.querySelector('.upPersentbox').style.width = `${downPer}%`;
            // console.log("downBtn >>>> "+downresult);
            console.log("per >> "+per)
            console.log("downper >> "+downPer);
        }
    }





})

