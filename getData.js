const axios = require('axios');

function getFormatedValue(value, isMonth = false) {
  return isMonth ? ('0' + (value + 1)).slice(-2) : ('0' + value).slice(-2)
}

function getDateTime() {
  const dateObj = new Date();
  const date = year = dateObj.getFullYear() + '.' + getFormatedValue(dateObj.getMonth(), true) + '.' + getFormatedValue(dateObj.getDate());
  const time = getFormatedValue(dateObj.getHours()) + ':' + getFormatedValue(dateObj.getMinutes()) + ':' + getFormatedValue(dateObj.getSeconds());
  return date + ' - ' + time;
}

function sendPostRequest() {
  const payload = { 'body': null, 'method': 'POST' };
  const config = {
    'headers': {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9,de-DE;q=0.8,de;q=0.7',
      'sec-ch-ua': '\'Chromium\';v=\'112\', \'Google Chrome\';v=\'112\', \'Not:A-Brand\';v=\'99\'',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '\'macOS\'',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'X-CSRF-TOKEN': 'YqeqCe7RbKivspZfUzjZdUpId8tjIAxTFweScJlz',
      'x-requested-with': 'XMLHttpRequest',
      'cookie': 'visited=yes; visited=yes; XSRF-TOKEN=eyJpdiI6Ijd4TnJoRTkrZmRrejh5M1cwaXd6QkE9PSIsInZhbHVlIjoidUVmbEJWUU5BSjBFUkJXRy9GTStOd2E3U2t2WG0vbFc0NTFrSzNaOWtWTDROWlZDdVpHQllmekhlVTNiZUtkcEJ4dkJCdUJOazZCK2ppMXJyODFyVjlZN3NqR0xYYjlvTTkrQVozc24rQ0Z5aG9pMk9LVTF3ZzFjOGhEYUFkUC8iLCJtYWMiOiJhOTU3Y2FiNmM3N2RhNjJmN2Q3ZTA1MjNiM2RlNGQyZGY1NDVhMDRlOThlMjAyY2MzMjI5M2Y1NTg3MjRiYzQxIn0=; laravel_session=eyJpdiI6IlhrTndsZmZtRThIczZrZHVPR0hSWlE9PSIsInZhbHVlIjoicHY1eGgwR1VpSVA5eE9Gbkd4c1A4ZDNCbkpKd1Y3WnpNQWkzQm1KdC9wNm5sM3ZnWUFzZTJGTnVJdHUrQTBNM0NndE1vWVVzY2tHbXJSUXcyYlN2dGlJUWRuNERJdk84bW4xWVR4RTFmVUR5d0d1WUJHd3RhYzJTRG85elZsZUoiLCJtYWMiOiJhNDFiYWJjODIzYmQyZWNiMTYzZWQ4OWFlN2IyYjNiNGVlZGI3ZDhlYTYyNWNkYzFjMzcxZTBhYmEyYzIyYmY3In0=',
      'Referer': 'https://ir-appointment.visametric.com/ir/editappointment/access',
      'Referrer-Policy': 'strict-origin-when-cross-origin'
    }
  };

  return axios.post('https://ir-appointment.visametric.com/ir/editappointment/get-date', payload, config)
    .then((response) => {
      // console.log('POST Response Data: >>>>>>>>>>', response.data);
      const xsrfToken = response.headers['set-cookie'][0];
      const laravelSession = response.headers['set-cookie'][1];
      // console.log('POST Response Header: >>>>>>>>>> XSRF:', xsrfToken, 'LARAVEL:', laravelSession);
      config.cookie = 'visited=yes; visited=yes; ' + xsrfToken + laravelSession;
      return response.data;
    })
    .catch((error) => {
      console.error('POST Error:', error);
    });
}

console.log('>>> Geting date is started.');
let count = 0;
const interval = setInterval(() => {
  sendPostRequest().then(res => {
    if (res) {
      const data = res.replace(/(\r\n|\n|\r)/gm, '');
      const dataLength = data.length;
      console.log(count + ') >>> Time: (' + getDateTime() + '), Result(' + dataLength + '):', data);
      if (res.length !== 10) {
        console.log(count + ') >>> Time: (' + getDateTime() + '), OriginalData(' + res.length + '):', res);
        clearInterval(interval);
      }
    }
  });
  count++;
}, 5000);

