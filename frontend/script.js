async function convertDate(dateValue, fusoValue) { // Função assíncrona para converter uma data fornecida em UTC e UNIX, considerando o fuso horário.

    convertedUTCText.innerHTML = ''; // Limpa o conteúdo anterior do elemento que exibe a conversão para UTC.
    convertedUnixText.innerHTML = ''; // Limpa o conteúdo anterior do elemento que exibe a conversão para UNIX.

    // Faz uma requisição GET para a API, passando a data e o fuso horário como parâmetros.
    const response = await fetch(`api/${dateValue}?timezone=${fusoValue}`, {
        method: 'GET',
    });

    const responseJson = await response.json(); // Converte a resposta da API para JSON.

    if (responseJson.error) { // Se a API retornar um erro, exibe a mensagem de erro nos elementos HTML e no console.
        convertedUnixText.innerHTML = responseJson.error;
        convertedUTCText.innerHTML = responseJson.error;
        console.log(responseJson.error);
        return; // Encerra a execução da função.
    }

    // Exibe os valores convertidos (UNIX e UTC) nos elementos HTML.
    convertedUTCText.innerHTML = responseJson.utc;
    convertedUnixText.innerHTML = responseJson.unix;
}

async function cleanInnerText() {
    convertedUTCText.innerHTML = '';
    convertedUnixText.innerHTML = '';
}