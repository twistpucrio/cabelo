function gerarRotina() {
    const textura = document.getElementById('textura').value;
    const procedimento = document.getElementById('procedimento').value;
    const espessura = document.getElementById('espessura').value;
    const frequencia = document.getElementById('frequencia').value;
    const preocupacao = document.getElementById('preocupacao').value;
    const ferramentasCalor = document.getElementById('ferramentasCalor').value;
    const atividadesFisicas = document.getElementById('atividadesFisicas').value;
    const couroCabeludo = document.getElementById('couroCabeludo').value;

    let rotinaRecomendada = '';

    if ((textura === "Liso" || textura === "Ondulado") &&
        (procedimento === "Com Luzes" || procedimento === "Colorido") &&
        (espessura === "Fino" || espessura === "Médio") &&
        (frequencia === "Todo dia" || frequencia === "4 a 6 dias") &&
        (preocupacao === "Opacidade" || preocupacao === "Frizz") &&
        (ferramentasCalor === "Nunca" || ferramentasCalor === "1 a 3 dias") &&
        (atividadesFisicas === "Sim" || atividadesFisicas === "Não") &&
        (couroCabeludo === "Saudável" || couroCabeludo === "Oleoso" || couroCabeludo === "Irritado" || couroCabeludo === "Descamação" || couroCabeludo === "Tenso")) {
        rotinaRecomendada = 'Rotina 1: Controle de Frizz';
    } else if ((textura === "Cacheado" || textura === "Crespo") &&
               (procedimento === "Natural"|| procedimento === "Alisado" )&&
               (espessura === "Médio" || espessura === "Grosso") &&
               (frequencia === "1 a 3 dias" ||frequencia === "Todo dia")&&
               (preocupacao === "Queda de cabelo" || preocupacao === "Couro cabeludo sensível") &&
               ferramentasCalor === "4 a 6 dias" &&
               atividadesFisicas === "Não" &&
               (couroCabeludo === "Saudável" || couroCabeludo === "Oleoso" || couroCabeludo === "Irritado" || couroCabeludo === "Descamação" || couroCabeludo === "Tenso")) {
        rotinaRecomendada = 'Rotina 2: Queda';
    } else if ((textura === "Cacheado" || textura === "Crespo"||textura === "Liso") &&
               (procedimento === "Colorido"|| procedimento === "Natural" ) &&
               (espessura === "Grosso" ||espessura === "Fino" ) &&
               (frequencia === "4 a 6 dias" ||frequencia === "Todo dia" )&&
               (preocupacao === "Ressecamento" || preocupacao === "Elasticidade") &&
               ferramentasCalor === "Todos os dias" &&
               atividadesFisicas === "Não" &&
               (couroCabeludo === "Saudável" || couroCabeludo === "Oleoso" || couroCabeludo === "Irritado" || couroCabeludo === "Descamação" || couroCabeludo === "Tenso")) {
        rotinaRecomendada = 'Rotina 3: Ressecamento';
    } else if ((textura === "Liso" || textura === "Ondulado") &&
               (procedimento === "Com Luzes" || procedimento === "Colorido" || procedimento === "Alisado") &&
               (espessura === "Fino" || espessura === "Médio") &&
               (frequencia === "1 a 3 dias" ||frequencia === "Todo dia" )&&
               (preocupacao === "Danos e Quebras" || preocupacao === "Opacidade") &&
               ferramentasCalor === "4 a 6 dias" &&
               atividadesFisicas === "Não" &&
               (couroCabeludo === "Saudável" || couroCabeludo === "Oleoso" || couroCabeludo === "Irritado" || couroCabeludo === "Descamação" || couroCabeludo === "Tenso")) {
        rotinaRecomendada = 'Rotina 4: Danos e Quebras';
    } else if ((textura === "Cacheado" || textura === "Crespo") &&
               (procedimento === "Com Luzes" || procedimento === "Colorido") &&
               espessura === "Grosso" &&
               (frequencia === "1 a 3 dias" || frequencia === "4 a 6 dias") &&
               (preocupacao === "Elasticidade" || preocupacao === "Opacidade") &&
               (ferramentasCalor === "1 a 3 dias" || ferramentasCalor === "Nunca") &&
               atividadesFisicas === "Sim" &&
               (couroCabeludo === "Saudável" || couroCabeludo === "Oleoso" || couroCabeludo === "Irritado" || couroCabeludo === "Descamação" || couroCabeludo === "Tenso")) {
        rotinaRecomendada = 'Rotina 5: Fortalecimento e Elasticidade';
    } else if ((textura === "Liso" || textura === "Ondulado") &&
               (procedimento === "Natural" || procedimento === "Colorido"||procedimento === "Com Luzes") &&
               (espessura === "Médio" || espessura === "Grosso") &&
               (frequencia === "1 a 3 dias" || frequencia === "Todo dia") &&
               (preocupacao === "Opacidade" || preocupacao === "Elasticidade") &&
               (ferramentasCalor === "Nunca" || ferramentasCalor === "1 a 3 dias") &&
               (atividadesFisicas === "Sim" || atividadesFisicas === "Não") &&
               (couroCabeludo === "Saudável" || couroCabeludo === "Oleoso" || couroCabeludo === "Irritado" || couroCabeludo === "Descamação" || couroCabeludo === "Tenso")) {
        rotinaRecomendada = 'Rotina 6: Brilho e Vitalidade';
    } else {
        rotinaRecomendada = 'Nenhuma rotina específica foi encontrada para as suas respostas.';
    }

    document.getElementById('resultadoRotina').innerHTML = `<p>${rotinaRecomendada}</p>`;
}
