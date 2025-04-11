setInterval(() => { 
    document.getElementById('presentUTC').innerHTML = new Date().toUTCString(); // Atualiza o horário UTC atual a cada segundo.
    document.getElementById('presentUnix').innerHTML = Math.trunc(new Date().getTime() / 1000); // Atualiza o timestamp Unix atual a cada segundo.
}, 1000);


async function convertDate(dateValue, fusoValue) {
    //Limpa os textos para preparar para exibir as novas respostas
    convertedUTCText.innerHTML = '';
    convertedUnixText.innerHTML = '';

    const response = await fetch(`api/${dateValue}?timezone=${fusoValue}`, { // Faz uma requisição para o backend com a data e o fuso horário.
        method: 'GET',
    });

    const responseJson = await response.json(); // Converte a resposta do backend para JSON.

    if (responseJson.error) { // Ve se teve erro na resposta.
        convertedUnixText.innerHTML = responseJson.error; // Exibe o erro no span do Unix.
        convertedUTCText.innerHTML = responseJson.error; // Exibe o erro no span do UTC.
        console.log(responseJson.error); // Loga o erro no console
        return; // Encerra a função.
    }

    convertedUTCText.innerHTML = responseJson.utc; // Exibe o UTC retornado pelo backend.
    convertedUnixText.innerHTML = responseJson.unix; // Exibe o Unix retornado pelo backend.
}

async function cleanConverterInnerText() { // Função que limpa o texto dos span de UTC e Unix do Conversor
    convertedUTCText.innerHTML = '';
    convertedUnixText.innerHTML = '';
}


async function differenceDates(date1, date2) {
    let differenceDays = document.getElementById('differenceDays'); // Seleciona o span para exibir os dias.
    let differenceHours = document.getElementById('differenceHours'); // Seleciona o span para exibir as horas.
    let differenceMinutes = document.getElementById('differenceMinutes'); // Seleciona o span para exibir os minutos.
    let differenceSeconds = document.getElementById('differenceSeconds'); // Seleciona o span para exibir os segundos.

    //Limpa os textos para preparar para exibir as novas respostas
    differenceDays.innerHTML = '';
    differenceHours.innerHTML = '';
    differenceMinutes.innerHTML = '';
    differenceSeconds.innerHTML = '';

    if (date1 === '' || date2 === '') { // Verifica se as datas estão vazias.
        differenceDays.innerHTML = 'Data inválida'; // Exibe erro no span de dias.
        differenceHours.innerHTML = 'Data inválida'; // Exibe erro no span de horas.
        differenceMinutes.innerHTML = 'Data inválida'; // Exibe erro no span de minutos.
        differenceSeconds.innerHTML = 'Data inválida'; // Exibe erro no span de segundos.
        return; // Encerra a execução da função.
    }

    const response = await fetch(`/api/diff/${date1}/${date2}`, { // Faz uma requisição para o backend com as duas datas.
        method: 'GET',
    });

    const responseJson = await response.json(); // Converte a resposta do backend para JSON.

    if (responseJson.error) { // Verifica se houve erro na resposta.
        differenceDays.innerHTML = responseJson.error; // Exibe o erro no span de dias.
        differenceHours.innerHTML = responseJson.error; // Exibe o erro no span de horas.
        differenceMinutes.innerHTML = responseJson.error; // Exibe o erro no span de minutos.
        differenceSeconds.innerHTML = responseJson.error; // Exibe o erro no span de segundos.
        console.log(responseJson.error); // Loga o erro no console.
        return; // Encerra a função.
    }

    differenceDays.innerHTML = responseJson.difference.days; // Exibe a diferença em dias.
    differenceHours.innerHTML = responseJson.difference.hours; // Exibe a diferença em horas
    differenceMinutes.innerHTML = responseJson.difference.minutes; // Exibe a diferença em minutos.
    differenceSeconds.innerHTML = responseJson.difference.seconds; // Exibe a diferença em segundos.
}


async function cleanDifferenceInnerText() { // Função que limpa o texto dos span do Calculador de diferenças
    differenceDays.innerHTML = '';
    differenceHours.innerHTML = '';
    differenceMinutes.innerHTML = '';
    differenceSeconds.innerHTML = '';
}