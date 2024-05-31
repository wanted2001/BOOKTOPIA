console.log("toastApi js in")

const editor = new toastui.Editor({
    el: document.querySelector('#editor'),
    previewStyle: 'vertical',
    height: '500px',
    initialValue: '내용을 입력해주세요'
});
