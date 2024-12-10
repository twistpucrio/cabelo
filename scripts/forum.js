function curtirPost(postData) {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioLogado) {
        exibirModalPrecisaLogin("Você precisa estar logado para realizar esta ação.");
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

function exibirModalPrecisaLogin(mensagem) {
    const modal = document.getElementById("modalMensagem");
    const modalConteudo = document.getElementById("modal-content");
    const modalTexto = document.getElementById("modalMensagemTexto");
    const botaoFechar = document.getElementById("botaoFecha"); // Seleciona o botão de fechar
    
    modalTexto.innerText = mensagem;
    
    modal.classList.add("open");
    
    // Evento para o botão de fechar (uma única vez)
    botaoFechar.addEventListener("click", function () {
        modal.classList.remove("open"); // Fecha o modal
    }, { once: true });


    // Evento para o botão de login (uma única vez)
    let botaoLogar = document.getElementById("botaoLogar");

    if (!botaoLogar){
        botaoLogar = document.createElement('button');
        botaoLogar.classList.add("botaologin");
        botaoLogar.setAttribute('id', 'botaoLogar');
        botaoLogar.innerHTML = "Fazer Login";
        botaoLogar.addEventListener("click", function () {
            location.href = "loginCadastro.html";
        }, { once: true });
    
        modalConteudo.appendChild(botaoLogar);
    }
}

function exibirModalRemover(mensagem, postData) {
    const modal = document.getElementById("modalMensagem");
    const modalConteudo = document.getElementById("modal-content");
    const modalTexto = document.getElementById("modalMensagemTexto");
    const botaoFechar = document.getElementById("botaoFecha");
    
    modalTexto.innerText = mensagem;
    
    modal.classList.add("open");
    
    botaoFechar.addEventListener("click", function () {
        modal.classList.remove("open");
    }, { once: true });

    let botaoRemover = document.getElementById("botaoRemover");

    if (botaoRemover){
        modalConteudo.removeChild(botaoRemover);
    }
    
    botaoRemover = document.createElement('button');
    botaoRemover.classList.add("botaoRemover");
    botaoRemover.setAttribute('id', 'botaoRemover');
    botaoRemover.innerHTML = "Sim!";
    botaoRemover.addEventListener("click", function () {
        deletarPost(postData);
        modal.classList.remove("open");
    }, { once: true });

    modalConteudo.appendChild(botaoRemover);
}

function exibirModalCampo(mensagem) {
    const modal = document.getElementById("modalMensagem");
    const modalConteudo = document.getElementById("modal-content");
    const modalTexto = document.getElementById("modalMensagemTexto");
    const botaoFechar = document.getElementById("botaoFecha"); // Seleciona o botão de fechar

    modalTexto.innerText = mensagem;

    modal.classList.add("open");

    // Evento para o botão de fechar (uma única vez)
    botaoFechar.addEventListener("click", function () {
        modal.classList.remove("open"); // Fecha o modal
    }, { once: true });

    let botaoRemover = document.getElementById("botaoRemover");
    if (botaoRemover){
        modalConteudo.removeChild(botaoRemover);
    }
}

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

function ordenarPostsData(crescente){
    let forum = JSON.parse(localStorage.getItem("forum"));
    
    console.log(forum);
    if (!crescente){
        //ordenar em ordem decrescente
        forum.sort((a, b) => new Date(a.post.data) - new Date(b.post.data));
    } else{
        //ordenar em ordem crescente
        forum.sort((a, b) => new Date(b.post.data) - new Date(a.post.data));
    }
    console.log(forum);

    localStorage.setItem("forum", JSON.stringify(forum));
    mostraForum();
}

function deletarPost(postData){
    let forum = JSON.parse(localStorage.getItem("forum"));
    const postIndex = forum.findIndex(post => (post.login === postData.login) && (post.post.titulo === postData.post.titulo) && (post.post.conteudo == postData.post.conteudo));
    forum.splice(postIndex, 1);

    localStorage.setItem("forum", JSON.stringify(forum));
    mostraForum();
}


function menosDeDoisDias(dataString1, dataString2) {
    const data1 = new Date(dataString1);
    const data2 = new Date(dataString2);

    const dia = 24 * 60 * 60 * 1000 * 2;
    const diff = Math.abs(data1 - data2);
    
    return diff < dia;
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

        const removerDiv = document.createElement("div");
        removerDiv.classList.add("removeDiv");
        
        if (usuarioLogado){
            if (postData.login == usuarioLogado.login){
                const hoje = new Date().toISOString().split("T")[0];

                if (menosDeDoisDias(hoje, postData.post.data)){
                    const removeBtn = document.createElement("button");
                    removeBtn.classList.add("removeBtn");
                    removeBtn.innerHTML = `<img src='/img/lixo.png' alt='Lixeira' class='imgBtnRemover'></img>`

                    removeBtn.addEventListener('click', function() {
                        exibirModalRemover("Você deseja remover mesmo este post?", postData);
                    });

                    removerDiv.appendChild(removeBtn);
                }
            }
        }  
 
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

        postDiv.appendChild(removerDiv);
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


function buscarPostPorPalavra(palavra) {
    let forum = JSON.parse(localStorage.getItem("forum"));
    const container = document.getElementById("forumContainer");
    let usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
    
    container.innerHTML = ''; 
    
    const postsFiltrados = forum.filter(postData => {
        const contemNoTitulo = postData.post.titulo.toLowerCase().includes(palavra.toLowerCase());
        const contemNoConteudo = postData.post.conteudo.toLowerCase().includes(palavra.toLowerCase());
        return contemNoTitulo || contemNoConteudo;
    });

    if (postsFiltrados.length === 0) {
        const mensagemNenhumPost = document.createElement("h2");
        mensagemNenhumPost.innerText = `Nenhum post encontrado contendo "${palavra}".`;
        container.appendChild(mensagemNenhumPost);
        return;
    }
    
    const tituloResultado = document.createElement("h2");
    tituloResultado.innerText = `Resultados da busca por "${palavra}":`;
    container.appendChild(tituloResultado);
    
    postsFiltrados.forEach(postData => {
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
        adicionarComentarioBtn.innerHTML = 'Adicione o seu comentário...';
        adicionarComentarioBtn.addEventListener('click', function () {
            adicionarComentario(postData);
        });

        adicionarComentarioDiv.appendChild(adicionarComentarioBtn);
        
        const curtidasDiv = document.createElement("div");
        curtidasDiv.classList.add("curtidas");
        const curtidaBtn = document.createElement("button");
        curtidaBtn.classList.add("curtidaBtn");
        
        if (usuarioLogado) {
            if (postData.curtidas.includes(usuarioLogado.login)) {
                curtidaBtn.innerHTML = "<img src='/img/coracaocheio.png' alt='Coração cheio' class='imgBtnCurtida'></img>";
            } else {
                curtidaBtn.innerHTML = "<img src='/img/coracaovazio.png' alt='Coração vazio' class='imgBtnCurtida'></img>";
            }
        } else {
            curtidaBtn.innerHTML = "<img src='/img/coracaovazio.png' alt='Coração vazio' class='imgBtnCurtida'></img>";
        }
        
        curtidaBtn.addEventListener('click', function () {
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
    
    adicionarPostBtn.addEventListener('click', function () {
        adicionarPost();
    });

    adicionarPostDiv.appendChild(adicionarPostBtn);
    container.appendChild(adicionarPostDiv);
}




window.addEventListener("load", async function () {
    let btnBusca = document.querySelector("#campoBusca");
    const btnCres = document.getElementById("btnCrescente");
    const btnDecres = document.getElementById("btnDecrescente");

    let forum = JSON.parse(localStorage.getItem("forum"));
    if (!forum){
        pegaInfoForum();
    }

    btnBusca.addEventListener("keypress", function(event){
        if (event.key =='Enter'){
            let palavra = document.getElementById('campoBusca').value;
            buscarPostPorPalavra(palavra)
        }
    });

    btnCres.addEventListener("click", function(){
        ordenarPostsData(true);
    });

    btnDecres.addEventListener("click", function(){
        ordenarPostsData(false);
    });

    ordenarPostsData(false);
    console.log(forum);

});