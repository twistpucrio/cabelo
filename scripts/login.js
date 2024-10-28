
  async function verificarUsuario() {
    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;

    try {
        const response = await fetch('scripts/loginUsuarios.json');
        const usuarios = await response.json();

        const usuarioEncontrado = usuarios.find(usuario => 
            usuario.login === login && usuario.senha === senha
        );

        if (usuarioEncontrado) {
            alert("Login bem-sucedido!");
        } else {
            alert("Login ou senha incorretos. Tente novamente.");
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