//func que ao clicar no botao comentarios de cada post mostra os comentarios com um dropdown.
//se clicar de novo no botao fecha o dropdown de comentarios
function mostraComentarios(event) {
    const listaComentarios = event.target.closest(".comentarios").querySelector(".listaComentarios");
    if (listaComentarios) {
        listaComentarios.classList.toggle("hidden");
    }
}

function ordenarPostsData(crescente){
    let forum = JSON.parse(localStorage.getItem("forum"));
    
    if (!crescente){
        //ordenar em ordem decrescente
        forum.sort((a, b) => new Date(a.post.data) - new Date(b.post.data));
    } else{
        //ordenar em ordem crescente
        forum.sort((a, b) => new Date(b.post.data) - new Date(a.post.data));
    }

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
    mostraForum();
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
    console.log(forum);
    if (forum == null){
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
});