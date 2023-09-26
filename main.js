document.querySelector('.menu-btn').addEventListener('click',()=>{
    document.querySelector('.nav-menu').classList.toggle('show');
});

ScrollReveal().reveal('.showcase');
ScrollReveal().reveal('.banner-quienes-somos',{ delay: 500 });
ScrollReveal().reveal('.como-se-usa',{ delay: 500 });
ScrollReveal().reveal('.social',{ delay: 500 });