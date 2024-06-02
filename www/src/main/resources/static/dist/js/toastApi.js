console.log("toastApi js in")

const editor = new toastui.Editor({
    el: document.querySelector('#editor'),
    height: '500px',
    initialValue: '내용을 입력해주세요',
    initialEditType:'wysiwyg',
    toolbarItems:[
        ['heading','bold','italic','strike'],
        ['hr','quote'],
        ['link','image']
    ]
});
