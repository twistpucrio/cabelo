
function mostrarModal() {
    const modal = document.getElementById("modal_login");
    modal.classList.add("open");

    const btnVolta = document.getElementById("botaoVolta");
    const btnCadastro = document.getElementById("botaoModalCadastro");

    btnVolta.addEventListener('click', function () {
        modal.classList.remove("open");
    });

    btnCadastro.addEventListener('click', function () {
        modal.classList.remove("open");
        // Aqui você pode redirecionar para a página de cadastro se necessário
    });
}



async function verificarUsuario() {
    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

    try {
        const response = await fetch('scripts/loginUsuarios.json');
        const usuarios = await response.json();

        const usuarioEncontrado = usuarios.find(usuario => 
            usuario.login === login 
        );

        if (usuarioEncontrado) {
           alert("Login bem-sucedido!");
        } else {
            mostrarModal();
        }

    } catch (error) {
        console.error("Erro ao carregar o arquivo JSON:", error);
        alert("Erro ao carregar dados de login.");
    }
}



window.addEventListener("load", function() {
    const submitButton = document.querySelector("#loginForm button[type='submit']");
    submitButton.addEventListener("click", function(event) {
        event.preventDefault(); 
        verificarUsuario();
    });
});
