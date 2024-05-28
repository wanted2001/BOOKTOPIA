const idRegex = /^[A-Za-z0-9]{6,13}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const conPwd = document.getElementById('pwdConfirm');
const pwd = document.getElementById('pwd');
const inputId = document.getElementById('id');
const joinCheckIdBtn = document.getElementById('joinCheckIdBtn');

inputId.addEventListener('keyup', () => {
    if (idRegex.test(inputId.value)) {
        console.log("유효성 맞음");

    } else {
        console.log("유효성 안맞음");
    }
})



joinCheckIdBtn.addEventListener('click', () => {

    let inputIdVal = inputId.value;
    checkId(inputIdVal).then(result => {
        if (result == '0') {
            alert("사용가능한 아이디 입니다.");
            joinCheckIdBtn.disabled = true;
            inputId.setAttribute("readonly", true);
        } else {
            alert("사용불가능한 아이디 입니다.");
            inputId.value = "";
        }
    });
});

async function checkId(inputIdVal) {
    try {
        const resp = await fetch('/user/check/' + inputIdVal);
        const result = await resp.text();

    } catch (error) {
        console.log(error);
    }
}
conPwd.addEventListener('keyup', () => {
    validatePassword();
});

function validatePassword() {
    if (pwd.value != conPwd.value) {
        conPwd.style.color = "red";
        console.log("비밀번호 틀림");

    } else {
        console.log("비밀번호 맞음");
        conPwd.style.color = "green";

    }
}

