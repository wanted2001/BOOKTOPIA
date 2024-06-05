console.log("toastApi js in")

let mainImage='';

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
                console.log("파일명 :"+ fileName);
                if(mainImage==='') {
                    mainImage=fileName;
                }

                const imageUrl = `/file/filePrint?fileName=${fileName}`;
                callback(imageUrl,"image print success");
            } catch (error){
                console.log("이미지 업로드 실패");
            }
        }
    }
});

// document.addEventListener('DOMContentLoaded', function () {
//     const cateBtn = document.querySelector('.cateBtn');
//     const commul = document.getElementById('commSelID');
//     const selectedText = document.getElementById('selectedText');
//
//     cateBtn.addEventListener('click', function () {
//         console.log('cateBtn clicked');
//         commul.classList.toggle('show');
//     });
//
//     const commliItems = document.querySelectorAll('.commli');
//     commliItems.forEach(li => {
//         li.addEventListener('click', function () {
//             selectedText.textContent = this.textContent;
//             commul.classList.remove('show');
//             console.log('commli item clicked', this.textContent);
//         });
//     });
//     let bCate = this.textContent;
//
// });

/*selected*/
$(document).ready(function (){
    $('.commseaUl').on("click","li",function (e){
        console.log($(e.target).data("value"));
        console.log($(this).data("value"));

        console.log(this)
    })
})


async function handleEditor(event) {
    console.log("handle 이벤트 들어옴!");
    event.preventDefault();

    const cateBtn = document.querySelector('.cateBtn');
    const commul = document.getElementById('commSelID');
    let selectedText = document.getElementById('selectedText');
    let bCate = selectedText.innerText;

    cateBtn.addEventListener('click', function () {
        console.log('cateBtn clicked');
        commul.classList.toggle('show');
    });

    let postData = {};
    const commliItems = document.querySelectorAll('.commli');
    commliItems.forEach(li => {
        li.addEventListener('click', function () {
            bCate = this.textContent;
            selectedText.textContent = bCate;
            commul.classList.remove('show');
            console.log('commli item clicked', bCate);

            const bContent = editor.getMarkdown();
            const bTitle = document.getElementById('commTitleID').value
            const bWriter = document.querySelector('.IDspan').innerHTML;

            postData = {
                bTitle: bTitle,
                bWriter: bWriter,
                bContent: bContent,
                bCate: bCate
            };

            console.log(postData)
        });
    });

    console.log("postData값 "+postData);



    // const bContent = editor.getMarkdown();
    // const bTitle = document.getElementById('commTitleID').value
    // const bWriter = document.querySelector('.IDspan').innerHTML;
    //
    // const postData = {
    //     bTitle:bTitle,
    //     bWriter:bWriter,
    //     bContent: bContent,
    //     bCate:bCate
    // };
    //
    // console.log(postData)
    // try{
    //     const resp = await fetch('/board/register',{
    //         method:"POST",
    //         headers:{
    //             'Content-Type':'application/json; charset=utf8'
    //         },
    //         body:JSON.stringify(postData)
    //     });
    //     if(resp.ok){
    //         const result = await resp.text();
    //         console.log(result)
    //         console.log("게시글 등록 성공")
    //         // window.location.href="/board/list";
    //     } else {
    //         console.log("서버 오류 : "+resp.statusText);
    //     }
    // } catch (error) {
    //     console.log("저장 실패 :"+error)
    // }

}


// document.querySelector('.commRegiBtn').addEventListener('click',()=>{
//     if(editorTitle==null || editorTitle=='') {
//         alert('제목을 입력해주세요.');
//         document.getElementById('commTitleID').focus();
//         return false;
//     } else if(editor.getMarkdown().length<1){
//         alert('내용을 입력해주세요.');
//         return false;
//     } else {
//         let data = {
//             bTitle:editorTitle,
//             bContent:editorBody,
//             mainImage:mainImage
//         }
//         console.log(data);
//     }
// })



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
