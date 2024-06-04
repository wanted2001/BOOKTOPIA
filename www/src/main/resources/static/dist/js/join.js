document.addEventListener('DOMContentLoaded', () => {
  console.log("User register in~~!!");

  let checkIdSuccess = 0;
  let checkPwdSuccess = 0;
  let checkNameSuccess = 0;
  let checkAgreeSuccess = 0;

  // 필요한 DOM 요소 가져오기
  const joinCheckIdBtn = document.getElementById("joinCheckIdBtn");
  const joinId = document.getElementById('joinId');
  const joinUnderlineId = document.getElementById('joinUnderlineId');
  const pwd = document.getElementById('pwd');
  const pwdConfirm = document.getElementById('pwdConfirm');
  const nameCheck = document.getElementById('nameCheck');
  const joinUnderlineName = document.getElementById('joinUnderlineName');
  const joinUnderlinePwd = document.getElementById('joinUnderlinePwd');
  const signUp = document.getElementById('signUp');
  const agreeBox = document.getElementById('agree_box');

  // 모든 요소가 존재하는지 확인
  if (joinCheckIdBtn && joinId && joinUnderlineId && pwd && pwdConfirm && nameCheck && joinUnderlineName && joinUnderlinePwd && signUp && agreeBox) {
    // 체크박스 이벤트 리스너
    agreeBox.addEventListener('change', () => {
      checkAgreeSuccess = agreeBox.checked ? 1 : 0;
      updateSignUpButtonState();
    });

    // 아이디 중복 확인 버튼 클릭 이벤트 리스너
    joinCheckIdBtn.addEventListener('click', () => {
      console.log("클릭");
      let checkId = joinId.value;
      console.log(checkId);
      if (checkId == null || checkId == '') {
        joinUnderlineId.style.color = 'red';
        joinUnderlineId.innerText = "* 아이디를 입력해주세요.";
        console.log("여기 들어옴");
        checkIdSuccess = 0;
        updateSignUpButtonState();
      }
      checkIdToServer(checkId).then(result => {
        if (result === '0') {
          joinUnderlineId.style.color = 'green';
          joinUnderlineId.innerText = "등록 가능한 아이디입니다.";
          console.log("result 1>>{}", result);
          checkIdSuccess = 1;
        } else if (result === '1') {
          joinUnderlineId.style.color = 'red';
          joinUnderlineId.innerText = "존재하는 아이디입니다.";
          console.log("result 0>>{}", result);
          checkIdSuccess = 0;
        }
        updateSignUpButtonState();
      }).catch(error => {
        console.error("Error checking ID:", error);
      });

    });

    // 디바운스 함수: 함수 호출 빈도를 제한하는 유틸리티 함수
    const debounce = (func, wait) => {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    };

    // 실시간 입력 검사를 위한 디바운스 함수
    const debouncedCheckPwd = debounce(() => {
      validatePassword();
      updateSignUpButtonState();
    }, 300);

    const debouncedCheckName = debounce(() => {
      validateName();
      updateSignUpButtonState();
    }, 300);

    // 실시간 입력 검사를 위한 이벤트 리스너
    pwd.addEventListener('keyup', debouncedCheckPwd);
    pwdConfirm.addEventListener('keyup', debouncedCheckPwd);
    nameCheck.addEventListener('keyup', debouncedCheckName);

    // 이름 검사 함수
    function validateName() {
      let name = nameCheck.value;
      if (!name) {
        joinUnderlineName.style.color = 'red';
        joinUnderlineName.innerText = "* 이름을 입력해주세요.";
        checkNameSuccess = 0;
      } else {
        joinUnderlineName.innerText = "";
        checkNameSuccess = 1;
      }
    }

    // 비밀번호 검사 함수
    function validatePassword() {
      let pwdOne = pwd.value;
      let pwdTwo = pwdConfirm.value;
      if (pwdOne !== pwdTwo) {
        joinUnderlinePwd.style.color = 'red';
        joinUnderlinePwd.innerText = "비밀번호가 다릅니다.";
        checkPwdSuccess = 0;
      } else {
        joinUnderlinePwd.style.color = 'green';
        joinUnderlinePwd.innerText = "비밀번호가 같습니다.";
        checkPwdSuccess = 1;
      }
    }

    // 서버로 아이디 검사 요청을 보내는 비동기 함수
    async function checkIdToServer(id) {
      try {
        const url = "/user/checkId/"+id;
        const config ={ method:'GET'}
        const resp = await fetch(url,config);
        const result = await resp.text();
        return result;
      } catch (error) {
        console.error("Error fetching ID check:", error);
      }
    }

    // 회원가입 버튼 상태 업데이트 함수
    function updateSignUpButtonState() {
      console.log("Update button state:", checkIdSuccess, checkPwdSuccess, checkNameSuccess, checkAgreeSuccess);
      signUp.disabled = !(checkIdSuccess && checkPwdSuccess && checkNameSuccess && checkAgreeSuccess);
    }
  } else {
    console.error("One or more elements were not found in the DOM");
  }
});
