console.log("js in");

let per = 50;
let downPer = 50;

document.addEventListener('click',(e)=>{
    if(e.target.tagName === "IMG"){
        if (e.target.id === 'upImg'){
            per +=3;
            downPer = 100-per;
            document.querySelector('.persent').style.width = `${per}%`;
            console.log("per >> "+per)
            console.log("downper >> "+downPer);

        } else if(e.target.id === 'downImg'){
            per -=3;
            downPer = 100-per;
            document.querySelector('.persent').style.width = `${per}%`;
            console.log("per >> "+per)
            console.log("downper >> "+downPer);
        }
    }
})

