const idRegex = /^[A-Za-z0-9]{6,13}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
document.addEventListener('click', (e) => {

    const inputId = document.getElementById('id');
    const joinCheckIdBtn = document.getElementById('joinCheckIdBtn');
    console.log(e.target.id);
    if (e.target.id == 'joinCheckIdBtn') {
        let inputIdVal = inputId.value;
        checkId(inputIdVal).then(result=>{
            if (result == '0') {
                alert("사용가능한 아이디 입니다.");
                joinCheckIdBtn.disabled = true;
                inputId.setAttribute("readonly", true);
            } else {
                alert("사용불가능한 아이디 입니다.");
                inputId.value = "";
            }
        })

    }

});

async function checkId(inputIdVal) {
    try {
        const resp = await fetch('/user/check/' + inputIdVal);
        const result = await resp.text();
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }


}