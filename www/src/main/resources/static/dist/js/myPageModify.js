document.addEventListener('DOMContentLoaded', () => {
    const changePwd = document.getElementById("changePwd");
    const changeNewPwd = document.getElementById("changeNewPwd");
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    let elMismatchMessage = document.querySelector('.mismatch-message'); // div.mismatch-message.hide
    let elStrongPasswordMessage = document.querySelector('.strongPassword-message'); // div.strongPassword-message.hide
    console.log("modify script in");
    // 각 입력 필드의 keyup 이벤트를 감지하여 비밀번호 유효성 검사
    function handleKeyUp(event) {
        const target = event.target;
        if (target.id === "changePwd") {
            // changePwd 입력 필드에서 keyup 이벤트 감지 시
            if (target.value.length !== 0) {
                if (strongPassword(target.value)) {
                    elStrongPasswordMessage.classList.add('hide');
                } else {
                    elStrongPasswordMessage.classList.remove('hide');
                }
            } else {
                elStrongPasswordMessage.classList.add('hide');
                toggleSubmitButton();
            }
        } else if (target.id === "changeNewPwd") {
            // changeNewPwd 입력 필드에서 keyup 이벤트 감지 시
            if (target.value.length !== 0) {
                if (isMatch(changePwd.value, target.value)) {
                    elMismatchMessage.classList.add('hide');
                } else {
                    elMismatchMessage.classList.remove('hide');
                }
            } else {
                elMismatchMessage.classList.add('hide');
                toggleSubmitButton();
            }
        }
    }

    console.log(changePwd.value);
    console.log(changeNewPwd.value);
    // 입력 필드에 keyup 이벤트 리스너 추가
//    changePwd.addEventListener("keyup", handleKeyUp);
//    changeNewPwd.addEventListener("keyup", handleKeyUp);

    // 비밀번호 확인 함수
    function validatePassword() {
        if (changePwd.value !== changeNewPwd.value) {
            changeNewPwd.style.color = "red";
            console.log("비밀번호 불일치");
        } else {
            console.log("비밀번호 일치");
            changeNewPwd.style.color = "green";
        }
    }

    // 비밀번호 강력성 검사 함수
    function strongPassword(str) {
        return passwordRegex.test(str);
    }

    // 비밀번호 일치 여부 검사 함수
    function isMatch(pwd, conPwd) {
        return pwd === conPwd;
    }

    // 제출 버튼 활성/비활성화 함수
    function toggleSubmitButton() {
        const isFormValid = isMatch(changePwd.value, changeNewPwd.value) && strongPassword(changePwd.value);
        submitButton.disabled = !isFormValid;
    }
});
