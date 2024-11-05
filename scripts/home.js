window.addEventListener('scroll', function() {
    const navigator = document.getElementById('navigator');
    if (window.scrollY > 30) { 
        navigator.classList.add('scrolled');
    } else {
        navigator.classList.remove('scrolled');
    }
});