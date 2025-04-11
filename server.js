const express = require('express'); // Importa o framework Express para criar o servidor.
const app = express(); // Cria uma instância do servidor Express.
const path = require('path'); // Importa o módulo 'path' para manipular caminhos de arquivos.

const isInvalidDate = (date) => date.toUTCString() === "Invalid Date"; // Verifica se uma data é inválida.
const isInvalidTimezone = (timezone) => timezone < -12 || timezone > 12; // Verifica se o fuso horário está fora do intervalo permitido.
const setTimezone = (timezone) => { // Ajusta o fuso horário para o limite permitido (-12 a 12).
    if (timezone < -12) {
        timezone = -12;
        return timezone;
    }
    if (timezone > 12) {
        timezone = 12;
        return timezone;
    }
};

app.get("/api/:date", function(req, res) { // Rota para converter uma data para UTC e Unix com possível fuso horário.
    let date = new Date(req.params.date); // Converte o parâmetro 'date' para um objeto Date.
    let timezone = parseFloat(req.query.timezone); // Pega o fuso horário da query string.

    if (isInvalidDate(date)) { // Se a data for inválida tenta interpretar como timestamp.
        date = new Date(+req.params.date);
    }

    if (isInvalidDate(date)) { // Se ainda for inválida retorna um erro.
        res.json({ error: "Invalid Date" });
        return;
    }

    if (!isNaN(timezone)) { // Se o fuso horário for válido ajusta a hora da data.
        if (isInvalidTimezone(timezone)) {
            timezone = setTimezone(timezone); // Ajusta o fuso horário para o limite permitido
        }
        date.setHours(date.getHours() + timezone); // Calcula o fuso horário com a data.
    }

    res.json({ // Retorna a data em formato Unix, UTC e o fuso horário aplicado.
        unix: date.getTime(),
        utc: date.toUTCString(),
        timezone: timezone
    });
});

app.get("/api/diff/:date1/:date2", function(req, res) { // Rota para calcular a diferença entre duas datas.
    let date1Raw = req.params.date1; // Obtém a primeira data da URL.
    let date2Raw = req.params.date2; // Obtém a segunda data da URL.

    let date1;
    if (isNaN(date1Raw)) { // Se a primeira data não for um número, interpreta como string.
        date1 = new Date(date1Raw);
    } else {
        date1 = new Date(Number(date1Raw)); // Se for interpreta como timestamp.
    }

    let date2;
    if (isNaN(date2Raw)) { // Se a segunda data não for um número, interpreta como string.
        date2 = new Date(date2Raw);
    } else {
        date2 = new Date(Number(date2Raw)); // Se for interpreta como timestamp.
    }

    if (isInvalidDate(date1) || isInvalidDate(date2)) { // Se qualquer uma das datas for inválida, retorna um erro.
        return res.json({ error: "Invalid Date(s)" });
    }

    let diffMilliseconds = Math.abs(date1.getTime() - date2.getTime()); // Calcula a diferença em milissegundos.
    let diffDays = Math.floor(diffMilliseconds / (1000 * 60 * 60 * 24)); // Converte a diferença para dias.
    let diffHours = Math.floor((diffMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Horas restantes.
    let diffMinutes = Math.floor((diffMilliseconds % (1000 * 60 * 60)) / (1000 * 60)); // Minutos restantes.
    let diffSeconds = Math.floor((diffMilliseconds % (1000 * 60)) / 1000); // E segundos restantes

    res.json({ // Retorna as datas e a diferença entre elas.
        date1: date1.toUTCString(),
        date2: date2.toUTCString(),
        difference: {
            days: diffDays,
            hours: diffHours,
            minutes: diffMinutes,
            seconds: diffSeconds
        }
    });
});

app.get("/api", function(req, res) { // Rota para retornar a data atual em Unix e UTC.
    res.json({
        unix: new Date().getTime(),
        utc: new Date().toUTCString(),
    });
});

app.use(express.static(path.join(__dirname, 'frontend'))); // Serve os arquivos estáticos da pasta 'frontend'.

app.get('/', (req, res) => { // Rota principal que retorna o arquivo 'index.html'.
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 3000; // Define a porta do servidor (3000 por padrão ou variável de ambiente).
app.listen(PORT); // Inicia o servidor na porta definida.