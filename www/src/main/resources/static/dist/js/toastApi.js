console.log("toastApi js in")

let bMainImg='';

const editor = new toastui.Editor({
    el: document.querySelector('#editor'),
    height: '500px',
    previewStyle: 'vertical',
    initialEditType:'markdown',
    toolbarItems:[
        ['heading','bold','italic','strike'],
        ['hr','quote'],
        ['ul', 'ol'],
        ['image']
    ],
    hooks:{
        addImageBlobHook:async (blob,callback)=> {
            try{
                const formData = new FormData();
                formData.append("image",blob);

                const response = await fetch("/file/file-upload",{
                    method:"POST",
                    body:formData
                });
                const fileName = await response.text();
                console.log("서버에 저장된 파일명 :"+ fileName);
                if(bMainImg==='') {
                    bMainImg=fileName;
                }

                const imageUrl = `/file/filePrint?fileName=${fileName}`;
                callback(imageUrl,"image print success");
            } catch (error){
                console.log("이미지 업로드 실패");
            }
        }
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const ul = document.querySelector('.commul');
    // console.log(ul)
    ul.addEventListener("click", (e)=> {
        console.log(e)
        if (e.target.tagName === "LI") {
            // console.log(e.target.dataset.value);
            // console.log(e.target.getAttribute("data-value"));
            // console.log(e.target);
        }
    });

    const idElement = document.getElementById('commID');

    const idVal = idElement.innerText;
    console.log(idVal);

    const socialId ="/board/socialId";
    const userId = "/board/userId";

    isSocialUser(idVal).then(result => {
        console.log(result);
        if (result != "일반") {
            pageCall(socialId);
        } else {
            pageCall(userId);
        }
    });

    function pageCall(link) {
        const request = new XMLHttpRequest();
        request.open("GET", link, true);
        request.send();
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    const moveContainer = document.getElementById("deleteMemberType2");
                    if (moveContainer) {
                        moveContainer.innerHTML = request.responseText;
                        console.log("성공");
                    } else {
                        console.error("요소 'myPageInfoRigthWrap'을 찾을 수 없습니다.");
                    }
                } else {
                    console.error("요청 실패, 상태 코드: " + request.status);
                }
            }
        };
    }

    async function isSocialUser(id) {
        try {
            const resp = await fetch("/user/isSocialUser/" + id);
            const result = await resp.text();
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const cateBtn = document.querySelector('.cateBtn');
    const commul = document.getElementById('commSelID');
    let selectedText = document.getElementById('selectedText');

    cateBtn.addEventListener('click', function () {
        // console.log('cateBtn clicked');
        commul.classList.toggle('show');
    });

    const commliItems = document.querySelectorAll('.commli');
    commliItems.forEach(li=>{
        li.addEventListener('click',function (event){
            const bCate = event.target.textContent;
            selectedText.textContent = bCate;
            commul.classList.remove('show');
        });
    })

});



async function handleEditor(event) {
    console.log("handle 이벤트 들어옴!");

    try {
        const selectedText = document.getElementById('selectedText');
        let bCate = selectedText.innerText;
        const commSaveId = document.querySelector('.commSaveId').innerText;

        let postData = {};

        function updatePostData() {
            const bContent = editor.getMarkdown();
            const bTitle = document.getElementById('commTitleID').value
            const bWriter = document.querySelector('.IDspan').innerHTML;

            postData = {
                id: commSaveId,
                bTitle: bTitle,
                bWriter: bWriter,
                bContent: bContent,
                bCate: bCate,
                bMainImg: bMainImg
            };

            console.log(postData);
        }

        let isValid = true;

        if(bCate =='게시판 선택') {
            alert("게시판을 선택해주세요.");
            isValid = false;
        } else if (document.getElementById('commTitleID').value == '' || document.getElementById('commTitleID').value == null) {
            alert("제목을 입력해주세요.");
            document.getElementById('commTitleID').focus();
            isValid = false;
        } else if (editor.getMarkdown() < 1) {
            alert("내용을 입력해주세요.");
            isValid = false;
        }

        if(isValid) {
            updatePostData();
            try{
                await submitPostData(postData).then(result=>{

                console.log(result);
                window.location.href = "/community/communityList";
                });
            } catch (error) {
                console.log("isValid error : ", error);
            }
        }
    } catch (error) {
        console.error("handleEditor error : ", error);
    }
}

async function submitPostData(postData) {
    try {
        const url = "/board/register";
        const config = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json; charset=utf8'
            },
            body: JSON.stringify(postData)
        };

        const resp = await fetch(url, config);
        const result = await resp.text();
        return result;
    } catch (error) {
        console.log(error)
    }
}