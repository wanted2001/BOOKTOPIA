
document.addEventListener('click',(e)=>{
    if(e.target.tagName.toLowerCase() === 'button'){
        const taget = e.target;
        taget.style.backgroundColor = '#ffb1b0';
        console.log(taget);

        const buttons = document.querySelectorAll('.admin-btn');
        for(const button of buttons){
            if(button !== taget){
                button.style.backgroundColor = '';
            }
        }
    }
    
})