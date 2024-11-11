function gerarRotina() {
    const procedimento = document.getElementById('procedimento').value;
    const preocupacao = document.getElementById('preocupacao').value;
    const ferramentasCalor = document.getElementById('ferramentasCalor').value;

    let rotinaRecomendada = '';

    if ((procedimento === "Com Luzes" || procedimento === "Colorido" ||  procedimento === "Alisado" ) &&
        (preocupacao === "Elástico" || preocupacao === "Queda de cabelo") &&
        (ferramentasCalor === "Nunca" || ferramentasCalor === "1 a 3 dias")) {
        rotinaRecomendada = 'Rotina 1: Controle de Frizz';
    } else if ((procedimento === "Com Luzes" || procedimento === "Colorido") &&
               (preocupacao === "Opacidade" || preocupacao === "Frizz") &&
               (ferramentasCalor === "Nunca" || ferramentasCalor === "1 a 3 dias")) {
        rotinaRecomendada = 'Rotina 2: Queda';
    } else if ((procedimento === "Colorido"|| procedimento === "Natural" ) &&
               (preocupacao === "Ressecamento" || preocupacao === "Elasticidade") &&
               ferramentasCalor === "Todos os dias" ) {
        rotinaRecomendada = 'Rotina 3: Ressecamento';
    } else if ((procedimento === "Com Luzes" || procedimento === "Colorido" || procedimento === "Alisado") &&
               (preocupacao === "Danos e Quebras" || preocupacao === "Opacidade") &&
               ferramentasCalor === "4 a 6 dias") {
        rotinaRecomendada = 'Rotina 3: Ressecamento';
    } else {
        rotinaRecomendada = 'Nenhuma rotina específica foi encontrada para as suas respostas.';
    }

    document.getElementById('resultadoRotina').innerHTML = `<p>${rotinaRecomendada}</p>`;
}
