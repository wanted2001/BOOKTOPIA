document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form__wrap");
  const checkAll = document.querySelector(".terms__check__all input");
  const checkBoxes = document.querySelectorAll(".input__check input");
  const submitButton = document.getElementById("submitButton");
  const conPwd = document.getElementById('pwdConfirm');
  const pwd = document.getElementById('pwd');
  const inputId = document.getElementById('id');
  const joinCheckIdBtn = document.getElementById('joinCheckIdBtn');
  const userName = document.getElementById('userName');

  // 메시지 정보 가져오기
  let elSuccessMessage = document.querySelector('.success-message');
  let elFailureMessageTwo = document.querySelector('.failure-message2');
  let elMismatchMessage = document.querySelector('.mismatch-message');
  let elStrongPasswordMessage = document.querySelector('.strongPassword-message');

  if (!form) console.error("Form element not found");
  if (!checkAll) console.error("Check all element not found");
  if (!submitButton) console.error("Submit button element not found");
  if (!conPwd) console.error("Password confirm element not found");
  if (!pwd) console.error("Password element not found");
  if (!inputId) console.error("ID input element not found");
  if (!joinCheckIdBtn) console.error("Join check ID button element not found");

  checkBoxes.forEach((item, index) => {
    if (!item) console.error(`Checkbox element at index ${index} not found`);
  });

  const agreements = {
    termsOfService: false, // 서비스 약관 동의 상태
    privacyPolicy: false, // 개인정보 처리방침 동의 상태
    allowPromotions: false // 프로모션 수신 동의 상태
  };

  // 정규식 패턴
  const idRegex = /^[A-Za-z0-9]{6,13}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  function isIdOk(str) {
    return idRegex.test(str);
  }
  function strongPassword(str) {
    return passwordRegex.test(str);
  }
  function isMatch(pwd, conPwd) {
    return pwd === conPwd;
    //입력 비밀번호가 일치할 경우 true, 아닐 경우 false 리턴
  }

  function toggleSubmitButton() {
    const { termsOfService, privacyPolicy } = agreements;
    const isFormValid = termsOfService
      && privacyPolicy
      && isIdOk(inputId.value)
      && isMatch(pwd.value, conPwd.value)
      && strongPassword(pwd.value);

    joinCheckIdBtn.disabled = !isIdOk(inputId.value);

    submitButton.disabled = !isFormValid;
  }


  toggleSubmitButton();

  checkBoxes.forEach((item) => item.addEventListener("input", toggleCheckbox));

  function toggleCheckbox(e) {
    const { checked, id } = e.target;
    agreements[id] = checked
    e.target.parentNode.classList.toggle("active");
    checkAllStatus();
    toggleSubmitButton();
  }

  function checkAllStatus() {
    const { termsOfService, privacyPolicy, allowPromotions } = agreements;
    checkAll.checked = termsOfService && privacyPolicy && allowPromotions;
  }

  checkAll.addEventListener("click", (e) => {
    const { checked } = e.target;
    checkBoxes.forEach((item) => {
      item.checked = checked;
      agreements[item.id] = checked;
      if (checked) {
        item.parentNode.classList.add("active");
      } else {
        item.parentNode.classList.remove("active");
      }
    });
    toggleSubmitButton();
  });

  inputId.onkeyup = function () {
    if (inputId.value.length !== 0) {
      if (isIdOk(inputId.value) === false) {
        elSuccessMessage.classList.add('hide');
        elFailureMessageTwo.classList.remove('hide');
      }
      else if (isIdOk(inputId.value)) {
        elSuccessMessage.classList.remove('hide');
        elFailureMessageTwo.classList.add('hide');
      }
      joinCheckIdBtn.disabled = false;
    }
    else {
      elSuccessMessage.classList.add('hide');
      elFailureMessageTwo.classList.add('hide');
      joinCheckIdBtn.disabled = true;
    }
    toggleSubmitButton();
  }

  // 아이디 중복 확인 비동기 함수
  async function checkId(inputIdVal) {
    try {
      const url = '/user/check';
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "text/plain; charset=UTF-8"
        },
        body: inputIdVal
      };
      const resp = await fetch(url, config);
      const result = await resp.text();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  // 아이디 중복 확인 버튼 클릭 이벤트 리스너
  joinCheckIdBtn.addEventListener('click', () => {
    const inputIdVal = inputId.value;
    checkId(inputIdVal).then(result => {
      console.log("result >>>>>", result);
      if (result === '0') {
        alert("사용 가능한 아이디입니다.");
        joinCheckIdBtn.disabled = true;
        inputId.setAttribute("readonly", true);
      } else if (result === '1') {
        alert("사용 불가능한 아이디입니다.");
        inputId.value = "";
        joinCheckIdBtn.disabled = false;
        inputId.removeAttribute("readonly");
      }
      toggleSubmitButton();
    });
  });

  // 비밀번호 확인 입력 시 유효성 검사
  conPwd.addEventListener('keyup', () => {
    validatePassword();
    toggleSubmitButton();
  });

  // 비밀번호와 비밀번호 확인 일치 여부 검사
  function validatePassword() {
    if (pwd.value !== conPwd.value) {
      conPwd.style.color = "red";
      console.log("비밀번호 틀림");
    } else {
      console.log("비밀번호 맞음");
      conPwd.style.color = "green";
    }
  }

  pwd.onkeyup = function () {
    if (pwd.value.length !== 0) {
      if (strongPassword(pwd.value)) {
        elStrongPasswordMessage.classList.add('hide');
      }
      else {
        elStrongPasswordMessage.classList.remove('hide');
      }
    }
    else {
      elStrongPasswordMessage.classList.add('hide');
      toggleSubmitButton();
    }
  };

  conPwd.onkeyup = function () {
    if (conPwd.value.length !== 0) {
      if (isMatch(pwd.value, conPwd.value)) {
        elMismatchMessage.classList.add('hide');
      }
      else {
        elMismatchMessage.classList.remove('hide');
      }
    }
    else {
      elMismatchMessage.classList.add('hide');
      toggleSubmitButton();
    }
  };

  userName.onkeyup = function () {
    if (userName.value.length !== 0) {
      toggleSubmitButton();
    } else {
      submitButton.disabled = true;
    }
  }
});
