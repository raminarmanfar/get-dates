const http = require('http');
const { Observable } = require('rxjs');

function sendPostRequestWithHttp() {
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
            //'X-CSRF-Token': csrfToken,
            'X-CSRF-TOKEN': 'YqeqCe7RbKivspZfUzjZdUpId8tjIAxTFweScJlz',
            'x-requested-with': 'XMLHttpRequest',
            'cookie': 'visited=yes; visited=yes; XSRF-TOKEN=eyJpdiI6Ijd4TnJoRTkrZmRrejh5M1cwaXd6QkE9PSIsInZhbHVlIjoidUVmbEJWUU5BSjBFUkJXRy9GTStOd2E3U2t2WG0vbFc0NTFrSzNaOWtWTDROWlZDdVpHQllmekhlVTNiZUtkcEJ4dkJCdUJOazZCK2ppMXJyODFyVjlZN3NqR0xYYjlvTTkrQVozc24rQ0Z5aG9pMk9LVTF3ZzFjOGhEYUFkUC8iLCJtYWMiOiJhOTU3Y2FiNmM3N2RhNjJmN2Q3ZTA1MjNiM2RlNGQyZGY1NDVhMDRlOThlMjAyY2MzMjI5M2Y1NTg3MjRiYzQxIn0=; laravel_session=eyJpdiI6IlhrTndsZmZtRThIczZrZHVPR0hSWlE9PSIsInZhbHVlIjoicHY1eGgwR1VpSVA5eE9Gbkd4c1A4ZDNCbkpKd1Y3WnpNQWkzQm1KdC9wNm5sM3ZnWUFzZTJGTnVJdHUrQTBNM0NndE1vWVVzY2tHbXJSUXcyYlN2dGlJUWRuNERJdk84bW4xWVR4RTFmVUR5d0d1WUJHd3RhYzJTRG85elZsZUoiLCJtYWMiOiJhNDFiYWJjODIzYmQyZWNiMTYzZWQ4OWFlN2IyYjNiNGVlZGI3ZDhlYTYyNWNkYzFjMzcxZTBhYmEyYzIyYmY3In0=',
            'Referer': 'https://ir-appointment.visametric.com/ir/editappointment/access',
            'Referrer-Policy': 'strict-origin-when-cross-origin'
        }
    };

    return new Observable((subscriber) => {
        const req = http.request({
            method: 'POST',
            host: 'ir-appointment.visametric.com',
            path: '/ir/editappointment/get-date',
            headers: config.headers
        }, (res) => {
            console.log('POST RES:', res);
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                console.log('POST Response Data: >>>>>>>>>>', data);
                // const xsrfToken = res.headers['set-cookie'][0];
                // const laravelSession = res.headers['set-cookie'][1];
                // console.log('POST Response Header: >>>>>>>>>> XSRF:', xsrfToken, 'LARAVEL:', laravelSession);
                // config.cookie = 'visited=yes; visited=yes; ' + xsrfToken + laravelSession;
                console.log('Cookies', res.headers['set-cookie']);
                subscriber.next(res.headers['set-cookie']);
                subscriber.complete();
            });
        });
        req.on('error', (error) => {
            console.error('POST Error:', error);
            subscriber.error(error);
        });
        req.write(JSON.stringify(payload));
        req.end();
    });
}

sendPostRequestWithHttp().subscribe(res => console.log('RESSSSS:', res));