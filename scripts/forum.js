


//Funcao para o usuario curtir um post:
function curtirPost(postData){
    console.log(postData);
    //usuario logado pode curtir posts, porém não mais de uma vez
}


//funcao para o usuario fazer um novo post:
function adicionarPost() {
    let usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioLogado) {
        alert("Você precisa estar logado para adicionar um post.");
        return;
    }

    // Criar uma interface para o usuário inserir título e texto do post
    const container = document.getElementById("forumContainer");
    const postForm = document.createElement("div");
    postForm.classList.add("postForm");

    postForm.innerHTML = `
        <h2>Adicionar Novo Post</h2>
        <label for="tituloPost">Título:</label>
        <input type="text" id="tituloPost" class="inputTitulo" placeholder="Digite o título do post" required />
        <label for="textoPost">Texto:</label>
        <textarea id="textoPost" class="inputTexto" placeholder="Digite o conteúdo do post" required></textarea>
        <button id="salvarPostBtn" class="salvarPostBtn">Salvar Post</button>
        <button id="cancelarPostBtn" class="cancelarPostBtn">Cancelar</button>
    `;

    // Adicionar o formulário ao container
    container.appendChild(postForm);

    // Botão de salvar
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

        // Salvar no localStorage
        let forum = JSON.parse(localStorage.getItem("forum"));
        forum.push(novoPost);
        localStorage.setItem("forum", JSON.stringify(forum));
        console.log(forum);
        // Atualizar a exibição
        mostraForum();
    });

    // Botão de cancelar
    document.getElementById("cancelarPostBtn").addEventListener("click", function () {
        postForm.remove();
    });
}

//func que ao clicar no botao comentarios de cada post mostra os comentarios com um dropdown.
//se clicar de novo no botao fecha o dropdown de comentarios
function mostraComentarios(event) {
    // Procura pela lista de comentários associada ao post
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


    const postDiv = Array.from(document.querySelectorAll(".post"))
        .find(div => div.querySelector(".tituloPost").innerText === postData.post.titulo);

    if (!postDiv) {
        console.error("Post não encontrado.");
        return;
    }

  
    const comentarioForm = document.createElement("div");
    comentarioForm.classList.add("comentarioForm");
    comentarioForm.innerHTML = `
        <h3>Adicionar Comentário</h3>
        <textarea id="conteudoComentario" class="inputComentario" placeholder="Digite seu comentário"></textarea>
        <button id="enviarComentarioBtn" class="enviarComentarioBtn">Enviar</button>
        <button id="cancelarComentarioBtn" class="cancelarComentarioBtn">Cancelar</button>
    `;

    postDiv.appendChild(comentarioForm);

    // Evento para salvar o comentário
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

        // Salvar o comentário no localStorage
        let forum = JSON.parse(localStorage.getItem("forum"));
        const postIndex = forum.findIndex(post => post.post.titulo === postData.post.titulo);

        if (postIndex !== -1) {
            forum[postIndex].comentarios.push(novoComentario);
            localStorage.setItem("forum", JSON.stringify(forum));
        }

        // Atualizar a exibição do post
        mostraForum();
    });

    // Evento para cancelar o comentário
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

        const tituloComentario = document.createElement("h3");
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

        if (postData.curtidas.includes(usuarioLogado.login)) {
            curtidaBtn.innerHTML = "<img src='https://www.iconpacks.net/icons/1/free-heart-icon-992-thumb.png' alt='Coração vazio' class='imgBtnCurtida'></img>";
        } else {
            curtidaBtn.innerHTML = "<img src='https://cdn-icons-png.flaticon.com/256/1077/1077035.png' alt='Coração vazio' class='imgBtnCurtida'></img>";
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