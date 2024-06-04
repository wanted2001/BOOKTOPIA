document.addEventListener("DOMContentLoaded", () => {
    // DOM이 완전히 로드된 후에 코드를 실행합니다.
    const form = document.querySelector("#form__wrap"); // 폼 요소를 선택합니다.
    const checkAll = document.querySelector(".terms__check__all input"); // "전체 동의" 체크박스를 선택합니다.
    const checkBoxes = document.querySelectorAll(".input__check input"); // 모든 개별 체크박스를 선택합니다.
    const submitButton = document.getElementById("submitButton"); // 제출 버튼을 선택합니다.
    const conPwd = document.getElementById('pwdConfirm'); // 비밀번호 확인 입력 요소를 선택합니다.
    const pwd = document.getElementById('pwd'); // 비밀번호 입력 요소를 선택합니다.
    const inputId = document.getElementById('id'); // 아이디 입력 요소를 선택합니다.
    const joinCheckIdBtn = document.getElementById('joinCheckIdBtn'); // 아이디 중복 확인 버튼을 선택합니다.
    const userName = document.getElementById('userName');
    // 2. 성공 메시지 정보 가져오기
    let elSuccessMessage = document.querySelector('.success-message'); // div.success-message.hide
    // 4. 실패 메시지2 정보 가져오기 (영어 또는 숫자)
    let elFailureMessageTwo = document.querySelector('.failure-message2'); // div.failure-message2.hide
    // 3. 실패 메시지 정보 가져오기 (비밀번호 불일치)
    let elMismatchMessage = document.querySelector('.mismatch-message'); // div.mismatch-message.hide
    // 4. 실패 메시지 정보 가져오기 (8글자 이상, 영문, 숫자, 특수문자 미사용)
    let elStrongPasswordMessage = document.querySelector('.strongPassword-message'); // div.strongPassword-message.hide

    // 각 요소가 존재하는지 확인합니다.
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

    // 각 동의 항목의 초기 상태를 설정합니다.
    const agreements = {
      termsOfService: false, // 서비스 약관 동의 상태
      privacyPolicy: false, // 개인정보 처리방침 동의 상태
      allowPromotions: false // 프로모션 수신 동의 상태
    };


    // 정규식 패턴을 정의합니다.
    // id > 6~13자 사이의 영문, 숫자 조합
    const idRegex = /^[A-Za-z0-9]{6,13}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    function isIdOk(str) {
        return idRegex.test(str);
      }
    function strongPassword (str) {
        return passwordRegex.test(str);
      }
    function isMatch (pwd, conPwd) {
        return pwd === conPwd;
        //입력 비밀번호가 일치할 경우 true, 아닐 경우 false 리턴
      }

        function toggleSubmitButton() {
            const { termsOfService, privacyPolicy } = agreements;
            const isFormValid = termsOfService && privacyPolicy && (isIdOk(id.value)) && isMatch(pwd.value, conPwd.value) && strongPassword(pwd.value);
            submitButton.disabled = !isFormValid;
          }


    // 초기 상태에서 제출 버튼을 비활성화
    toggleSubmitButton();


    // 각 체크박스에 이벤트 리스너 추가
    checkBoxes.forEach((item) => item.addEventListener("input", toggleCheckbox));

    // 개별 체크박스의 상태
    function toggleCheckbox(e) {
      const { checked, id } = e.target;
      agreements[id] = checked
      e.target.parentNode.classList.toggle("active");
      checkAllStatus();
      toggleSubmitButton();
    }

    // 전체 동의 체크박스의 상태를 확인하고 업데이트하는 함수
    function checkAllStatus() {
      const { termsOfService, privacyPolicy, allowPromotions } = agreements;
      checkAll.checked = termsOfService && privacyPolicy && allowPromotions;
    }


    // 전체 동의 체크박스의 클릭 이벤트 리스너
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

    id.onkeyup = function () {
    if (id.value.length !== 0) {

        if(isIdOk(id.value) === false) {
          elSuccessMessage.classList.add('hide');
          elFailureMessageTwo.classList.remove('hide'); // 영어 또는 숫자만 가능합니다
        }

        else if(isIdOk(id.value)) {
          elSuccessMessage.classList.remove('hide'); // 사용할 수 있는 아이디입니다
          elFailureMessageTwo.classList.add('hide'); // 실패 메시지2가 가려져야 함
        }
      }
      else {
        elSuccessMessage.classList.add('hide');
        elFailureMessageTwo.classList.add('hide');
      }
    }

     // 아이디 중복 확인 비동기 함수
    async function checkId(inputIdVal) {
           try {
             const url = '/user/check';
             const config = {
                method : "POST",
                headers : {
                    "Content-Type" : "text/plain; charset=UTF-8"
                },
                body : inputIdVal
             };
             const resp = await fetch(url,config);
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
        console.log("result >>>>>" , result);
         if (result === '0') {
           alert("사용 가능한 아이디입니다.");
           joinCheckIdBtn.disabled = true;
           inputId.setAttribute("readonly", true);
         } else if(result === '1'){
           alert("사용 불가능한 아이디입니다.");
           inputId.value = "";
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
          if(strongPassword(pwd.value)) {
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
          if(isMatch(pwd.value, conPwd.value)) {
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

      userName.onkeyup = function() {
        if(userName.value.length !== 0){
            toggleSubmitButton();
        }else{
            submitButton.disabled = true;
        }
      }

  });
