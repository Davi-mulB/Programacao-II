setInterval(() => { 
    document.getElementById('presentUTC').innerHTML = new Date().toUTCString();
    document.getElementById('presentUnix').innerHTML = Math.trunc(new Date().getTime() / 1000);
}, 1000);


async function convertDate(dateValue, fusoValue) {

    convertedUTCText.innerHTML = '';
    convertedUnixText.innerHTML = '';

    const response = await fetch(`api/${dateValue}?timezone=${fusoValue}`, {
        method: 'GET',
    });

    const responseJson = await response.json();

    if (responseJson.error) {
        convertedUnixText.innerHTML = responseJson.error;
        convertedUTCText.innerHTML = responseJson.error;
        console.log(responseJson.error);
        return;
    }

    convertedUTCText.innerHTML = responseJson.utc;
    convertedUnixText.innerHTML = responseJson.unix;
}

async function cleanInnerText() {
    convertedUTCText.innerHTML = '';
    convertedUnixText.innerHTML = '';
}



async function differenceDates(date1, date2) {
    let differenceDays = document.getElementById('differenceDays');
    let differenceHours = document.getElementById('differenceHours');
    let differenceMinutes = document.getElementById('differenceMinutes');
    let differenceSeconds = document.getElementById('differenceSeconds');

    differenceDays.innerHTML = '';
    differenceHours.innerHTML = '';
    differenceMinutes.innerHTML = '';
    differenceSeconds.innerHTML = '';


    if (date1 === '' || date2 === '') {
        differenceDays.innerHTML = 'Data inválida';
        differenceHours.innerHTML = 'Data inválida';
        differenceMinutes.innerHTML = 'Data inválida';
        differenceSeconds.innerHTML = 'Data inválida';
        return;
    }

    const response = await fetch(`/api/diff/${date1}/${date2}`, {
        method: 'GET',
    });

    const responseJson = await response.json();

    if (responseJson.error) {
        differenceDays.innerHTML = responseJson.error;
        differenceHours.innerHTML = responseJson.error;
        differenceMinutes.innerHTML = responseJson.error;
        differenceSeconds.innerHTML = responseJson.error;
        console.log(responseJson.error);
        return;
    }

    // Exibe os valores calculados (dias, horas, minutos e segundos) nos elementos HTML.
    differenceDays.innerHTML = responseJson.difference.days;
    differenceHours.innerHTML = responseJson.difference.hours;
    differenceMinutes.innerHTML = responseJson.difference.minutes;
    differenceSeconds.innerHTML = responseJson.difference.seconds;
};