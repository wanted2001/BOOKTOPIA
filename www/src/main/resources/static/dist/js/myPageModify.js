const changePwd = document.getElementById("changePwd");
const changeNewPwd = document.getElementById("changeNewPwd");
const submitButton = document.getElementById("submitButton");
const phone = document.getElementById("modifyPhone");

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
const phoneRegex = /^(010)-?[0-9]{4}-?[0-9]{4}$/;

console.log("modify script in");

// 비밀번호 유효성 검사 함수
function validatePassword() {
    if (changePwd.value !== changeNewPwd.value) {
        changeNewPwd.style.color = "red";
        console.log("비밀번호 불일치");
    } else {
        console.log("비밀번호 일치");
        changeNewPwd.style.color = "green";
    }
    toggleSubmitButton();
}

// 비밀번호 강력성 검사 함수
function strongPassword(str) {
    return passwordRegex.test(str);
}

// 전화번호 유효성 검사 함수
function strongPhone(str) {
    return phoneRegex.test(str);
}

// 제출 버튼 활성/비활성화 함수
function toggleSubmitButton() {
    const arePasswordsEmpty = changePwd.value.length === 0 && changeNewPwd.value.length === 0;
    const isPasswordValid = strongPassword(changePwd.value) && changePwd.value === changeNewPwd.value;
    const isPhoneValid = strongPhone(phone.value);

    // 비밀번호가 비어 있고 전화번호가 유효한 경우, 혹은 비밀번호가 유효하고 전화번호가 유효한 경우
    submitButton.disabled = !(isPhoneValid && (arePasswordsEmpty || isPasswordValid));
}

// 입력 필드에 keyup 이벤트 리스너 추가
changePwd.addEventListener("keyup", () => {
    console.log(changePwd.value);
    toggleSubmitButton();
});

changeNewPwd.addEventListener("keyup", () => {
    console.log(changeNewPwd.value);
    validatePassword();
});

phone.addEventListener("keyup", () => {
    console.log(phone.value);
    toggleSubmitButton();
});
