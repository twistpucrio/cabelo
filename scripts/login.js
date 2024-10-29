function verificaEmail(email){
    const padrao = /[a-z._]+@[a-z._]+[.]+(.*[a-z])/;
    return padrao.test(email);
}

function verificaSenhaVer(senha, senhaVer){
    if (senhaVer==senha){
        return 1;
    }
    else{
        return -1;
    }
}

function modalSucesso(alternado){
    let modal = document.getElementById("modalSucesso");
    let msgSucesso = document.getElementById("msgSucesso");
    let btnVaiHome = document.getElementById("botaoVaiHome");
    let mensagem;
  btnVaiHome.addEventListener('click', function () {
        location.href="index.html";
    });

    if (alternado == 'login') {
        mensagem = "Usuário logado com sucesso!";
    } else if (alternado == 'cadastro') {
        mensagem = "Usuário cadastrado com sucesso!";
    }

    msgSucesso.innerHTML = mensagem;
    modal.classList.add("open");
}


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

            //alert("Login bem-sucedido!");
            console.log(JSON.stringify(usuarioEncontrado));
            localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
            modalSucesso('login');
        } else {
            mostrarModal();
        }

    } catch (error) {
        console.error("Erro ao carregar o arquivo JSON:", error);
        alert("Erro ao carregar dados de login.");
    }
}


async function realizarCadastro() {
    const login = document.getElementById("loginCadastro").value;
    const email = document.getElementById("emailCadastro").value;
    const senha = document.getElementById("senhaCadastro").value;
    const senhaVerificacao = document.getElementById("senhaVerificacaoCadastro").value;
    let msgEmail = document.getElementById("mensagemEmail");
    let msgSenha = document.getElementById("mensagemSenha");
    let sai = false;

    if(!verificaEmail(email)){
        msgEmail.innerHTML = "Email não está no formato correto (xxx@xxx.xxx)!";
        sai= true;
    }

    if (verificaSenhaVer(senhaVerificacao, senha) == -1){
        msgSenha.innerHTML = "Senhas não coincidem!";
        sai = true;
    }

    if (sai) {
        return;
    }

    msgEmail.innerHTML = " ";
    msgSenha.innerHTML = " ";

    try {
        const response = await fetch('scripts/loginUsuarios.json');
        const usuarios = await response.json();

        const usuarioExistente = usuarios.find(usuario => 
            usuario.login === login || usuario.email === email
        );

        if (usuarioExistente) {
            alert("Já existe um usuário com esse nome ou email!");
        } else {
            const usuarioNovo = {
                "login": login, 
                "senha": senha,
                "email": email,
                "cronograma": -1
            };
            console.log(JSON.stringify(usuarioNovo));
            localStorage.setItem("usuario", JSON.stringify(usuarioNovo));

            modalSucesso('cadastro');
            //alert("Usuário cadastrado com sucesso!");
        }
    } catch (error) {
        console.error("Erro ao carregar o arquivo JSON:", error);
        alert("Erro ao carregar dados dos usuários.");
    }
}



window.addEventListener("load", function() {
    const submitButton = document.querySelector("#enterLogin");
    const submitButtonCadastro = document.querySelector("#enterCadastro");

    let user = JSON.parse(localStorage.getItem("usuario"));
    if (user){
        console.log(user);   
    }

    submitButton.addEventListener("click", function(event) {
        event.preventDefault(); 
        verificarUsuario();
    });


    submitButtonCadastro.addEventListener("click", function(event) {
        event.preventDefault(); 
        realizarCadastro();
    });
});

