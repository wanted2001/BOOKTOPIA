const changePwd = document.getElementById("changePwd");
const changeNewPwd = document.getElementById("changeNewPwd");
const submitButton = document.getElementById("submitButton");
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
console.log("modify script in");
// 각 입력 필드의 keyup 이벤트를 감지하여 비밀번호 유효성 검사

   // 비밀번호 확인 함수
    function validatePassword() {
        let isOk = 0;
        if (changePwd.value !== changeNewPwd.value) {
            changeNewPwd.style.color = "red";
            console.log("비밀번호 불일치");
            isOk = 0;
        } else {
            console.log("비밀번호 일치");
            changeNewPwd.style.color = "green";
            isOk = 1;
        }
        if(isOk == 0){
            toggleSubmitButton();
        }

    }

    // 비밀번호 강력성 검사 함수
    function strongPassword(str) {
        return passwordRegex.test(str);
    }

    // 비밀번호 일치 여부 검사 함수
    function isMatch(changePwd, changeNewPwd) {
        return changePwd === changeNewPwd;
    }

    // 제출 버튼 활성/비활성화 함수
    function toggleSubmitButton() {
        const isFormValid = strongPassword(changePwd.value) && isMatch(changePwd.value,changeNewPwd.value);
        submitButton.disabled = !isFormValid;
    }

// 입력 필드에 keyup 이벤트 리스너 추가
changeNewPwd.addEventListener("keyup",()=>{
    console.log(changeNewPwd.value);
    validatePassword();
});

changePwd.onkeyup = function () {
    if (changePwd.value.length !== 0) {
         toggleSubmitButton();
         console.log("비밀번호 0이 아님");
    };
    if(changePwd.value.length == 0 && changeNewPwd.value.length == 0){
        submitButton.disabled = false;
    };
};
changeNewPwd.onkeyup = function () {
    if (changeNewPwd.value.length !== 0) {
         toggleSubmitButton();
         console.log("비밀번호 확인 0이 아님");

    };
    if(changeNewPwd.value.length == 0 && changePwd.value.length == 0){
         submitButton.disabled = false;
    };
};
