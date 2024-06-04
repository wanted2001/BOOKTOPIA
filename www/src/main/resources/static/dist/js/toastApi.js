console.log("toastApi js in")

let mainImage='';

const editor = new toastui.Editor({
    el: document.querySelector('#editor'),
    height: '500px',
    initialValue: '내용을 입력해주세요',
    initialEditType:'wysiwyg',
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
                console.log("파일명 "+ fileName);
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

async function handleEditor(event) {
    console.log("handle 이벤트 들어옴!");
    // event.preventDefault();
    
    const editorBody = editor.getMarkdown();
    const editorTitle = document.getElementById('commTitleID').value

    const postData = {
        bTitle:editorTitle,
        bContent: editorBody
    };

    console.log(postData)
    try{
        const resp = await fetch('/board/register',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(postData)
        });
        if(resp.ok){
            const result = await resp.text();
            console.log("게시글 등록 성공")
            // window.location.href="/board/list";
        } else {
            console.log("서버 오류"+resp.statusText);
        }
    } catch (error) {
        console.log("저장 실패 :"+error)
    }

}

