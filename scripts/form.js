async function gerarRotina() {
    const preocupacao = document.getElementById('preocupacao').value;
    let user = JSON.parse(localStorage.getItem("usuario"));
    let rotinaRecomendada = '';
    let idCronograma = '';

    if (preocupacao === "Queda de cabelo" || preocupacao === "Elasticidade") {
        rotinaRecomendada = 'Rotina 1: Danos e quebras';
        idCronograma = 1;
    } else if (preocupacao === "Ressecamento") {
        rotinaRecomendada = 'Rotina 2: Ressecamento';
        idCronograma = 2;
    } else if (preocupacao === "Frizz") {
        rotinaRecomendada = 'Rotina 3: Controle de frizz';
        idCronograma = 3;
    } else if (preocupacao === "Opacidade") {
        rotinaRecomendada = 'Rotina 4: Brilho e vitalidade';
        idCronograma = 4;
    } else {
        rotinaRecomendada = 'Nenhuma rotina específica foi encontrada para as suas respostas.';
    }
    
    if (user) {
        user.cronograma = idCronograma;
        localStorage.setItem("usuario", JSON.stringify(user));
    }

    window.location = "perfilUsuario.html";
}

window.addEventListener("load", function() {
    document.getElementsById("sellect").selectedIndex = -1;
    const botaoRotina = document.getElementById('vaiRotina');
    botaoRotina.addEventListener("click", function(event) {
        event.preventDefault();
        verificaOpcoes();
    });
});

function verificaOpcoes() {
    const preocupacao = document.getElementById('preocupacao').value;
    const ferramentasCalor = document.getElementById('ferramentasCalor').value;
    const atividadesFisicas = document.getElementById('atividadesFisicas').value;
    const frequencia = document.getElementById('frequencia').value;
    const couroCabeludo = document.getElementById('couroCabeludo').value;
    const textura = document.getElementById('textura').value;
    const procedimento = document.getElementById('procedimento').value;
    const espessura = document.getElementById('espessura').value;

    if (preocupacao === 'blank' || ferramentasCalor === 'blank' || atividadesFisicas === 'blank' ||
        frequencia === 'blank' || couroCabeludo === 'blank' || textura === 'blank' ||
        procedimento === 'blank' || espessura === 'blank') {
        alert('É obrigatório preencher todos os campos do formulário!');
    } else {
        gerarRotina();
    }
}


