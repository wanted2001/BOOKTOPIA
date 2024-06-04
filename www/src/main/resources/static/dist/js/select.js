document.addEventListener('DOMContentLoaded', function () {
  const cateBtn = document.querySelector('.cateBtn');
  const commul = document.querySelector('.commul');
  const selectedText = document.getElementById('selectedText');

  cateBtn.addEventListener('click', function () {
    console.log('cateBtn clicked');
    commul.classList.toggle('show');
  });

  const commliItems = document.querySelectorAll('.commli');
  commliItems.forEach(li => {
    li.addEventListener('click', function () {
      selectedText.textContent = this.textContent;
      commul.classList.remove('show');
      console.log('commli item clicked');
    });
  });
});

/*selected*/
$(document).ready(function (){
  $('.commseaUl').on("click","li",function (e){
    console.log($(e.target).data("value"));
    console.log($(this).data("value"));

    console.log(this)
  })
})