function gerarRotina() {
    const preocupacao = document.getElementById('preocupacao').value;

    let rotinaRecomendada = '';

    if ((preocupacao === "Queda de cabelo" || preocupacao === "Elasticidade")) {
        rotinaRecomendada = 'Rotina 1: Danos e quebras';
    } 
   
    else if ((preocupacao === "Ressecamento")) {
        rotinaRecomendada = 'Rotina 2: Ressecamento';
    }
    
    else if ((preocupacao === "Frizz")) {
        rotinaRecomendada = 'Rotina 3: Controle de frizz';
    } 
    
    else if (("Opacidade")) {
        rotinaRecomendada = 'Rotina 4: Brilho e vitalidade';
    } 
    else {
        rotinaRecomendada = 'Nenhuma rotina específica foi encontrada para as suas respostas.';
    }

    document.getElementById('resultadoRotina').innerHTML = `<p>${rotinaRecomendada}</p>`;
}
