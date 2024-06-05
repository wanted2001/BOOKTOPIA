console.log("toastApi js in")

let bMainImg='';

const editor = new toastui.Editor({
    el: document.querySelector('#editor'),
    height: '500px',
    initialValue: '내용을 입력해주세요',
    initialEditType:'markdown',
    toolbarItems:[
        ['heading','bold','italic','strike'],
        ['hr','quote'],
        ['link','image']
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
    console.log(ul)
    ul.addEventListener("click", (e)=> {
        console.log(e)
        if (e.target.tagName === "LI") {
            console.log(e.target.dataset.value);
            console.log(e.target.getAttribute("data-value"));
            console.log(e.target);
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
});


async function handleEditor(event) {
    console.log("handle 이벤트 들어옴!");
    event.preventDefault();

    const cateBtn = document.querySelector('.cateBtn');
    const commul = document.getElementById('commSelID');
    let selectedText = document.getElementById('selectedText');
    let bCate = selectedText.innerText;
    const commSocialId= document.querySelector('.commSocialId').value;
    console.log(commSocialId);

    cateBtn.addEventListener('click', function () {
        console.log('cateBtn clicked');
        commul.classList.toggle('show');
    });

    let postData = {};

    function updatePostData(){
        const bContent = editor.getMarkdown();
        const bTitle = document.getElementById('commTitleID').value
        const bWriter = document.querySelector('.IDspan').innerHTML;

        postData = {
            bTitle: bTitle,
            bWriter: bWriter,
            bContent: bContent,
            bCate: bCate,
            bMainImg:bMainImg
        };

        console.log(postData);
    }

    const commliItems = document.querySelectorAll('.commli');
    commliItems.forEach(li => {
        li.addEventListener('click', async function () {
            bCate = this.textContent;
            selectedText.textContent = bCate;
            commul.classList.remove('show');
            console.log('commli item clicked', bCate);
            updatePostData();
            console.log(postData)
            submitPostData(postData).then(result=>{
                console.log(result);
                if(result==="1") {
                    alert("게시물이 등록되었습니다.")
                }
            })
        });
    });

}

async function submitPostData(postData){
    try{
        const url = "/board/register";
        const config = {
            method:"POST",
                headers:{
                    'Content-Type':'application/json; charset=utf8'
                },
                body:JSON.stringify(postData)
        };

        const resp = await fetch(url, config);
        const result = await resp.text();
        return  result;
    } catch(error) {
        console.log(error)
    }
}





// ------------------------------------------------------------------------
//     console.log("hi editor js")
// const Editor = toastui.Editor;
//
// let mainImage = "";
//
// const editor = new Editor({
//     el: document.querySelector('#editor'),
//     height: '600px',
//     initialEditType:"wysiwyg",
//     hideModeSwitch: true,
//     initialValue: content,
//     placeholder: '내용을 입력해주세요.',
//     language:"ko-KR",
//     hooks: {
//         addImageBlobHook: async (blob, callback) => {
//             try {
//                 const formData = new FormData();
//                 formData.append('image', blob);
//
//                 const response = await fetch('/file/image-upload', {
//                     method: 'POST',
//                     body: formData
//                 });
//                 const filename = await response.text();
//                 console.log('서버에 저장된 파일명: ', filename);
//                 if(mainImage === ""){
//                     mainImage = filename;
//                 }
//
//                 const imageUrl = `/file/image-print?filename=${filename}`;
//                 callback(imageUrl, 'image alt attribute');
//             } catch (error) {
//                 console.log('업로드 실패...', error);
//             }
//         }
//     }
// });
//
// async function savePost(event) {
//     event.preventDefault(); // 폼의 기본 제출 동작을 방지
//
//     const title = document.getElementById("title").value;
//     const email = document.getElementById("email").value;
//     const content = editor.getMarkdown();
//
//     const postData = {
//         title: title,
//         email: email,
//         content: content,
//         mainImage: mainImage
//     };
//
//     try {
//         const response = await fetch('/board/register', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(postData)
//         });
//         if(response.ok) {
//             const result = await response.text();
//             alert("게시글이 저장 되었습니다.");
//             window.location.href = '/board/list';
//         } else {
//             // 오류 처리
//             console.error('서버 오류:', response.statusText);
//         }
//     } catch (error) {
//         console.error('저장 실패:', error);
//     }
// }
// 4:35
// package ezen.bizqr.file;
//
// import lombok.RequiredArgsConstructor;
// import org.apache.ibatis.logging.Log;
// import org.slf4j.Logger;
// import org.springframework.http.MediaType;
// import org.springframework.ui.Model;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;
//
// import java.io.File;
// import java.io.IOException;
// import java.nio.file.Files;
// import java.nio.file.Paths;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.UUID;
//
// @RequiredArgsConstructor
// @RestController
// @RequestMapping("/file")
// public class FileController {
//     // 파일을 업로드할 디렉터리 경로 C:\_bizqr_fileUpload\tui-editor
//     private final String UP_DIR = "C:\\_bizqr_fileUpload\\tui-editor\\"; //경로
//     private final  FileMapper mapper;
//
//     /**
//      * 에디터 이미지 업로드
//      * @param image 파일 객체
//      * @return 업로드된 파일명
//      */
//     @PostMapping("/image-upload")
//     public String uploadEditorImage(@RequestParam("image") final MultipartFile image, Model m) {
//
//     if (image.isEmpty()) {
//     return "";
// }
//
// String orgFilename = image.getOriginalFilename();
// String onlyFileName = orgFilename.substring(
//     orgFilename.lastIndexOf(File.separator)+1);// 원본 파일명
// String uuid = UUID.randomUUID().toString().replaceAll("-", "");           // 32자리 랜덤 문자열
// String extension = orgFilename.substring(orgFilename.lastIndexOf(".") + 1);  // 확장자
// String saveFilename = uuid + "." + extension;                                             // 디스크에 저장할 파일명
// String fileFullPath = Paths.get(UP_DIR, saveFilename).toString();
//
//
// //DB 저장하기
// FileVO fvo = new FileVO();
//
// fvo.setUuid(uuid);
// fvo.setSaveDir("/board");
// fvo.setFileSize(image.getSize());
// fvo.setFileName(saveFilename);
// fvo.setFileType(1);
//
// mapper.insertFile(fvo);
//
//
//
//
//
// // uploadDir에 해당되는 디렉터리가 없으면, uploadDir에 포함되는 전체 디렉터리 생성
// File dir = new File(UP_DIR);
// if (!dir.exists()) {
//     dir.mkdirs();
// }
//
// try {
//     // 파일 저장 (write to disk)
//     File uploadFile = new File(fileFullPath);
//     image.transferTo(uploadFile);
//     return saveFilename;
//
// } catch (IOException e) {
//     // 예외 처리는 따로 해주는 게 좋습니다.
//     throw new RuntimeException(e);
// }
//
//
// }
//
// /**
//  * 디스크에 업로드된 파일을 byte[]로 반환
//  * @param filename 디스크에 업로드된 파일명
//  * @return image byte array
//  */
// @GetMapping(value = "/image-print", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE })
// public byte[] printEditorImage(@RequestParam("filename") final String filename) {
//     // 업로드된 파일의 전체 경로
//     String fileFullPath = Paths.get(UP_DIR, filename).toString();
//
//     // 파일이 없는 경우 예외 throw
//     File uploadedFile = new File(fileFullPath);
//     if (!uploadedFile.exists()) {
//         throw new RuntimeException();
//     }
//
//     try {
//         // 이미지 파일을 byte[]로 변환 후 반환
//         return Files.readAllBytes(uploadedFile.toPath());
//
//     } catch (IOException e) {
//         // 예외 처리는 따로 해주는 게 좋습니다.
//         throw new RuntimeException(e);
//     }
// }
// }
