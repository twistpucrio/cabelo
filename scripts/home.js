function mostraModal() {
    let modal = document.getElementById("modalFormulario");
    let btnFecha = document.getElementById("botaoFecha");
    let btnLogin = document.getElementById("botaoLogin");

    btnFecha.addEventListener('click', function () {
        modal.classList.remove("open");
    });

    btnLogin.addEventListener('click', function () {
        window.location = "loginCadastro.html";
    });

    modal.classList.add("open");
}

window.addEventListener('scroll', function() {
    const navigator = document.getElementById('navigator');

    if (window.scrollY > 30) { 
        navigator.classList.add('scrolled');
    } else {
        navigator.classList.remove('scrolled');
    }
});

window.addEventListener("load", function(){
    const msgUsuario = document.getElementById('mensagemHome');
    const formularioBtn = document.getElementById('formularioBtn');
    let user = JSON.parse(localStorage.getItem("usuario"));

    if (user){
        msgUsuario.innerHTML = `Olá, ${user.login}!`;
    } 

    formularioBtn.addEventListener("click", function(){
        if (user){
            window.location = "form.html";
        } else{
            mostraModal();
        }
    });
});