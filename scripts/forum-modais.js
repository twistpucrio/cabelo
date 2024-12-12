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