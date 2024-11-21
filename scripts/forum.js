


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

function mostraComentarios(){
    //func que ao clicar no botao comentarios de cada post mostra os comentarios com um dropdown.
    //se clicar de novo no botao fecha o dropdown de comentarios
}

//funcao para o usuario fazer um comentario em um post:
function adicionarComentario(postData){
    console.log(postData);
    //adicionar comentario somente se usuário estiver logado
}

function mostraForum(){
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
        comentarioDiv.innerHTML = "<h3 class='tituloComentario'>Comentários</h3>";
        
        postData.comentarios.forEach(comentario => {
            const comentarioElemento = document.createElement("div");
            comentarioElemento.classList.add("comentario");
            comentarioElemento.innerHTML = `
                <p class='loginComentario'><strong>${comentario.login}:</strong></p>
                <p class='conteudoComentario'>${comentario.comentario.conteudo}</p>
                <p class='conteudoData'><em>${comentario.comentario.data}</em></p>
            `;
            comentarioDiv.appendChild(comentarioElemento);
        });

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

        console.log(postData.curtidas);
        if (postData.curtidas.includes(usuarioLogado.login)){
            curtidaBtn.innerHTML = "<img src='https://www.iconpacks.net/icons/1/free-heart-icon-992-thumb.png' alt='Coração vazio' class='imgBtnCurtida'></img>";
        } else{
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