function curtirPost(postData) {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioLogado) {
        console.log("Usuário não está logado. Modal será exibido."); 
        exibirModal("Você precisa estar logado para curtir ou descurtir um post.");
        return;
    }

    const jaCurtiu = postData.curtidas.includes(usuarioLogado.login);

    if (jaCurtiu) {
        postData.curtidas = postData.curtidas.filter(login => login !== usuarioLogado.login);
    } else {
        postData.curtidas.push(usuarioLogado.login);
    }
    let forum = JSON.parse(localStorage.getItem("forum"));
    forum = forum.map(post => 
        post.post.titulo === postData.post.titulo ? postData : post
    );
    localStorage.setItem("forum", JSON.stringify(forum));

    atualizaBotaoDeCurtida(postData);
}

function atualizaBotaoDeCurtida(postData) {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
    const posts = document.querySelectorAll(".post");

    posts.forEach(postDiv => {
        const tituloPost = postDiv.querySelector(".tituloPost").innerText;
        if (tituloPost === postData.post.titulo) {
            const curtidasTexto = postDiv.querySelector(".curtidasTexto");
            const curtidaBtn = postDiv.querySelector(".curtidaBtn");

            curtidasTexto.innerText = postData.curtidas.length;

            if (postData.curtidas.includes(usuarioLogado.login)) {
                curtidaBtn.innerHTML = "<img src='/img/coracaocheio.png' alt='Coração cheio' class='imgBtnCurtida'></img>";
            } else {
                curtidaBtn.innerHTML = "<img src='/img/coracaovazio.png' alt='Coração vazio' class='imgBtnCurtida'></img>";
            }
        }
    });
}

function exibirModal(mensagem) {
    const modal = document.getElementById("modalMensagem");
    const modalTexto = document.getElementById("modalMensagemTexto");
    const botaoLogar = document.getElementById("botaoLogar");

    modalTexto.innerText = mensagem;

    modal.classList.add("open");
    botaoLogar.addEventListener("click", function () {
        location.href = "loginCadastro.html"; 
    }, { once: true });
}



//funcao para o usuario fazer um novo post:
function adicionarPost() {
    let usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioLogado) {
        alert("Você precisa estar logado para adicionar um post.");
        return;
    }

    if (document.querySelector(".postForm")) {
        return;
    }

    const container = document.getElementById("forumContainer");
    const postForm = document.createElement("div");
    postForm.classList.add("postForm");

    postForm.innerHTML = `
        <label for="tituloPost" id="labelTituloPost">Título:</label>
        <br>
        <input type="text"  class="inputTitulo"  required />
        <br><br>
        <label for="textoPost" id="labelTextoPost">Texto:</label>
        <br>
        <textarea id="textoPost" class="inputTexto"  required></textarea>
        <br><br>
        <button id="salvarPostBtn" class="salvarPostBtn">Enviar</button>
        <button id="cancelarPostBtn" class="cancelarPostBtn">Cancelar</button>
    `;

    container.appendChild(postForm);

    document.getElementById("salvarPostBtn").addEventListener("click", function () {
        const titulo = document.getElementById("tituloPost").value.trim();
        const texto = document.getElementById("textoPost").value.trim();

        if (!titulo || !texto) {
            alert("Por favor, preencha todos os campos antes de salvar.");
            return;
        }

        const novoPost = {
            login: usuarioLogado.login,
            post: {
                titulo: titulo,
                conteudo: texto,
                data: new Date().toISOString().split("T")[0],
            },
            curtidas: [],
            comentarios: []
        };

        let forum = JSON.parse(localStorage.getItem("forum"));
        forum.push(novoPost);
        localStorage.setItem("forum", JSON.stringify(forum));
        console.log(forum);
        mostraForum();
    });

    // btn cancela post (pra apagar o form)
    document.getElementById("cancelarPostBtn").addEventListener("click", function () {
        postForm.remove();
    });
}

//func que ao clicar no botao comentarios de cada post mostra os comentarios com um dropdown.
//se clicar de novo no botao fecha o dropdown de comentarios
function mostraComentarios(event) {
    const listaComentarios = event.target.closest(".comentarios").querySelector(".listaComentarios");
    if (listaComentarios) {
        listaComentarios.classList.toggle("hidden");
    }
}

//funcao para o usuario fazer um comentario em um post:
// Função para o usuário fazer um comentário em um post
function adicionarComentario(postData) {
    let usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioLogado) {
        alert("Você precisa estar logado para comentar.");
        return;
    }

    if (document.querySelector(".comentarioForm")) {
        return;
    }

    const postDiv = Array.from(document.querySelectorAll(".post"))
        .find(div => div.querySelector(".tituloPost").innerText === postData.post.titulo);

    if (!postDiv) {
        console.error("Post não encontrado.");
        return;
    }

  
    const comentarioForm = document.createElement("div");
    comentarioForm.classList.add("comentarioForm");
    comentarioForm.innerHTML = `
        <textarea id="conteudoComentario" class="inputComentario" placeholder="Digite seu comentário"></textarea>
        <br><br>
        <button id="enviarComentarioBtn" class="enviarComentarioBtn">Enviar</button>
        <button id="cancelarComentarioBtn" class="cancelarComentarioBtn">Cancelar</button>
    `;

    postDiv.appendChild(comentarioForm);

    comentarioForm.querySelector("#enviarComentarioBtn").addEventListener("click", function () {
        const conteudo = comentarioForm.querySelector("#conteudoComentario").value.trim();

        if (!conteudo) {
            alert("Por favor, escreva um comentário antes de enviar.");
            return;
        }



        const novoComentario = {
            login: usuarioLogado.login,
            comentario: {
                conteudo: conteudo,
                data: new Date().toISOString().split("T")[0],
            },
        };

        let forum = JSON.parse(localStorage.getItem("forum"));
        const postIndex = forum.findIndex(post => post.post.titulo === postData.post.titulo);

        if (postIndex !== -1) {
            forum[postIndex].comentarios.push(novoComentario);
            localStorage.setItem("forum", JSON.stringify(forum));
        }

        mostraForum();
    });

    comentarioForm.querySelector("#cancelarComentarioBtn").addEventListener("click", function () {
        comentarioForm.remove();
    });
}


function mostraForum() {
    let forum = JSON.parse(localStorage.getItem("forum"));
    const container = document.getElementById("forumContainer");
    let usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

    container.innerHTML = ''; 

    forum.forEach(postData => {
        const postDiv = document.createElement("div");
        postDiv.classList.add("post");

        postDiv.innerHTML = `
            <h2 class='tituloPost'>${postData.post.titulo}</h2>
            <p class='loginPost'><strong>Postado por:</strong> ${postData.login} em ${postData.post.data}</p>
            <p class='conteudoPost'>${postData.post.conteudo}</p>
        `;
 
        const comentarioDiv = document.createElement("div");
        comentarioDiv.classList.add("comentarios");

        const tituloComentario = document.createElement("button");
        tituloComentario.classList.add("tituloComentario");
        tituloComentario.textContent = "Comentários";
        tituloComentario.addEventListener("click", mostraComentarios);

        const listaComentarios = document.createElement("div");
        listaComentarios.classList.add("listaComentarios", "hidden");

        postData.comentarios.forEach(comentario => {
            const comentarioElemento = document.createElement("div");
            comentarioElemento.classList.add("comentario");
            comentarioElemento.innerHTML = `
                <p class='loginComentario'><strong>${comentario.login}:</strong></p>
                <p class='conteudoComentario'>${comentario.comentario.conteudo}</p>
                <p class='conteudoData'><em>${comentario.comentario.data}</em></p>
            `;
            listaComentarios.appendChild(comentarioElemento);
        });

        comentarioDiv.appendChild(tituloComentario);
        comentarioDiv.appendChild(listaComentarios);

        const adicionarComentarioDiv = document.createElement("div");
        adicionarComentarioDiv.classList.add("adicionarComentarioDIv");
        const adicionarComentarioBtn = document.createElement("button");
        adicionarComentarioBtn.classList.add("adicionarComentarioBtn");
        adicionarComentarioBtn.innerHTML = 'Adicione o seu comentario...';
        adicionarComentarioBtn.addEventListener('click', function() {

            adicionarComentario(postData);
        });

        adicionarComentarioDiv.appendChild(adicionarComentarioBtn);

        const curtidasDiv = document.createElement("div");
        curtidasDiv.classList.add("curtidas");
        const curtidaBtn = document.createElement("button");
        curtidaBtn.classList.add("curtidaBtn");

        if (usuarioLogado){
            if (postData.curtidas.includes(usuarioLogado.login)) {
                curtidaBtn.innerHTML = "<img src='/img/coracaocheio.png' alt='Coração cheio' class='imgBtnCurtida'></img>";
            } else {
                curtidaBtn.innerHTML = "<img src='/img/coracaovazio.png' alt='Coração vazio' class='imgBtnCurtida'></img>";
            }
        } else{
            curtidaBtn.innerHTML = "<img src='/img/coracaovazio.png' alt='Coração vazio' class='imgBtnCurtida'></img>";
        }

        curtidaBtn.addEventListener('click', function() {
            curtirPost(postData);
        });

        curtidasDiv.innerHTML = "<p class='curtidasTexto'>" + postData.curtidas.length + "</p>";
        curtidasDiv.appendChild(curtidaBtn);

        postDiv.appendChild(comentarioDiv);
        postDiv.appendChild(adicionarComentarioDiv);
        postDiv.appendChild(curtidasDiv);
        container.appendChild(postDiv);
    });

    const adicionarPostDiv = document.createElement("div");
    adicionarPostDiv.classList.add("adicionarPostDIv");
    const adicionarPostBtn = document.createElement("button");
    adicionarPostBtn.classList.add("adicionarPostBtn");
    adicionarPostBtn.setAttribute('id', 'btnPost');
    adicionarPostBtn.innerHTML = 'Adicione o seu post...';
   
    adicionarPostBtn.addEventListener('click', function() {
        adicionarPost();
    });

    adicionarPostDiv.appendChild(adicionarPostBtn);
    container.appendChild(adicionarPostDiv);
}


async function pegaInfoForum(){
    const response = await fetch('scripts/forum.json');
    const forum = await response.json();

    localStorage.setItem("forum", JSON.stringify(forum));
}



window.addEventListener("load", async function () {
    let forum = JSON.parse(localStorage.getItem("forum"));
    if (!forum){
        pegaInfoForum();
    }

    mostraForum();
    console.log(forum);

});