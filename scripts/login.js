function verificaEmail(email) {
    const padrao = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i; 
    return padrao.test(email);
}

function verificaSenhaVer(senha, senhaVer) {
    return senhaVer === senha ? 1 : -1;
}

function verificaLogin(login) {
    const padrao = /^[^\s]+$/; 
    return padrao.test(login);
}

function modalSucesso(alternado) {
    let modal = document.getElementById("modalSucesso");
    let msgSucesso = document.getElementById("msgSucesso");
    let btnVaiHome = document.getElementById("botaoVaiHome");
    let mensagem;
    btnVaiHome.addEventListener('click', function () {
        location.href = "index.html";
    });

    if (alternado === 'login') {
        mensagem = "Usuário logado com sucesso!";
    } else if (alternado === 'cadastro') {
        mensagem = "Usuário cadastrado com sucesso!";
    }
    msgSucesso.innerHTML = mensagem;
    modal.classList.add("open");
}

function mostrarModal() {
    const modal = document.getElementById("modal_login");
    const btnVolta = document.getElementById("botaoVolta");
    const btnCadastro = document.getElementById("botaoModalCadastro");
    const divCadastro = document.getElementById("divCadastro");
    const divLogin = document.getElementById("divLogin");
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user) {
        divCadastro.style.display = 'none';
    } else {
        divCadastro.style.display = 'none';
        divLogin.style.display = 'block';
    }

    modal.classList.add("open");
    btnVolta.addEventListener('click', function () {
        modal.classList.remove("open");
        divCadastro.style.display = 'none';
        divLogin.style.display = 'block';
    });
    btnCadastro.addEventListener('click', function () {
        modal.classList.remove("open");
        divLogin.style.display = 'none';
        divCadastro.style.display = 'block';
    });
}

async function verificarUsuario() {
    const login = document.getElementById("login").value;
    const senha = document.getElementById("senha").value;
    let msgSenha = document.getElementById("mensagemSenhaLogin");

    try {
        const response = await fetch('scripts/loginUsuarios.json');
        const usuarios = await response.json();

        const usuarioEncontrado = usuarios.find(usuario => usuario.login === login);

        if (usuarioEncontrado) {
            if (usuarioEncontrado.senha === senha) {
                console.log("Usuário encontrado: ", JSON.stringify(usuarioEncontrado));
                localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));
                modalSucesso('login');
            } else {
                msgSenha.innerHTML = "Senha incorreta!";
            }
        } else {
 
            let listaCadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
            let usuarioCadastrado = listaCadastros.find(usuario => usuario.login === login);

            if (usuarioCadastrado) {
                if (usuarioCadastrado.senha === senha) {
                    console.log("Usuário cadastrado: ", JSON.stringify(usuarioCadastrado));
                    localStorage.setItem("usuario", JSON.stringify(usuarioCadastrado));
                    modalSucesso('login');
                } else {
                    msgSenha.innerHTML = "Senha incorreta!";
                }
            } else {
                mostrarModal(); 
            }
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
    let msgLogin = document.getElementById("mensagemLogin");
    let sai = false;

    if (!verificaEmail(email)) {
        msgEmail.innerHTML = "Email não está no formato correto (xxx@xxx.xxx)!";
        sai = true;
    }

    if (verificaSenhaVer(senhaVerificacao, senha) === -1) {
        msgSenha.innerHTML = "Senhas não coincidem!";
        sai = true;
    }

    if (!verificaLogin(login)) {
        msgLogin.innerHTML = "Favor não usar espaço no login de usuário";
        sai = true;
    }

    if (sai) {
        return; 
    }

    msgEmail.innerHTML = " ";
    msgSenha.innerHTML = " ";
    msgLogin.innerHTML = " ";

    try {
        const response = await fetch('scripts/loginUsuarios.json');
        const usuarios = await response.json();

        const usuarioExistente = usuarios.find(usuario => usuario.login === login || usuario.email === email);

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
            document.getElementById("divCadastro").style.display = 'none';
            document.getElementById("divLogin").style.display = 'block';

            let listaCadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
            listaCadastros.push(usuarioNovo);
            localStorage.setItem("cadastros", JSON.stringify(listaCadastros));
        }
    } catch (error) {
        console.error("Erro ao carregar o arquivo JSON:", error);
        alert("Erro ao carregar dados dos usuários.");
    }
}

window.addEventListener("load", function () {
    const cadastrarButton = document.querySelector("#fazerCadastro");
    const submitButton = document.querySelector("#enterLogin");
    const submitButtonCadastro = document.querySelector("#enterCadastro");
    const divCadastro = document.getElementById("divCadastro");
    const divLogin = document.getElementById("divLogin");

    cadastrarButton.addEventListener('click', function () {
        divLogin.style.display = 'none';
        divCadastro.style.display = 'block';
    });
    let user = JSON.parse(localStorage.getItem("usuario"));
    if (user) {
        divCadastro.style.display = 'none';
        divLogin.style.display = 'block';
    } else {
        divCadastro.style.display = 'none';
        divLogin.style.display = 'block';
    }

    submitButton.addEventListener("click", function (event) {
        event.preventDefault();
        verificarUsuario();
    });

    submitButtonCadastro.addEventListener("click", function (event) {
        event.preventDefault();
        realizarCadastro();
    });
});
