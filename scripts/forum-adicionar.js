//funcao para o usuario fazer um novo post:
function adicionarPost() {
    let usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioLogado) {
        exibirModalPrecisaLogin("Você precisa estar logado para adicionar um post.");
        return;
    }

    const container = document.getElementById("forumContainer");
    let postForm = document.getElementById("postForm");

    if (postForm){
        postForm.innerHTML = '';
        container.removeChild(postForm);
    }
    postForm = document.createElement("div");
    postForm.setAttribute('id', 'postForm');
    postForm.classList.add("postForm");

    postForm.innerHTML = `
        <label for="tituloPost">Título:</label>
        <br>
        <input type="text" id="tituloPost" class="inputTitulo" required />
        <br><br>
        <label for="textoPost">Texto:</label>
        <br>
        <textarea id="textoPost" class="inputTexto" required></textarea>
        <br><br>
        <button id="salvarPostBtn" class="salvarPostBtn">Enviar</button>
        <button id="cancelarPostBtn" class="cancelarPostBtn">Cancelar</button>
    `;

    container.appendChild(postForm);

    document.getElementById("salvarPostBtn").addEventListener("click", function () {
        let titulo = document.getElementById("tituloPost").value.trim();
        let texto = document.getElementById("textoPost").value.trim();

        if ((!titulo) || (!texto)) {
            exibirModalCampo("Por favor, preencha todos os campos antes de salvar.");
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
        let forum = JSON.parse(localStorage.getItem("forum")) || [];
        forum.push(novoPost);
        localStorage.setItem("forum", JSON.stringify(forum));

        // Atualiza o fórum e remove o formulário
        mostraForum();
        postForm.remove();
    });
    document.getElementById("cancelarPostBtn").addEventListener("click", function () {
        postForm.remove();
    });
}

//funcao para o usuario fazer um comentario em um post:
// Função para o usuário fazer um comentário em um post
function adicionarComentario(postData) {
    let usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioLogado) {
        exibirModalPrecisaLogin("Você precisa estar logado para comentar.");
        return;
    }

    let temp = document.querySelector(".comentarioForm");
    if (temp) {
        temp.remove();
    }

    const postDiv = Array.from(document.querySelectorAll(".post"))
        .find(div => div.querySelector(".tituloPost").innerText === postData.post.titulo);

    if (!postDiv) {
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
            exibirModalCampo("Por favor, escreva um comentário antes de enviar.");
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