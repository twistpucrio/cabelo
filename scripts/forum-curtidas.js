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