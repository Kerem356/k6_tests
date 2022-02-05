import {group, check} from 'k6';
import http from 'k6/http';


const HOST = 'localhost';
const PROTOCOL = 'http://';
const PORT = `${__ENV.PORT}` || '8080';

let options = {
    vu: 10,
    duration: '10s'
}

export function free() {
    group('GET /', function () {
        let res = http.get(PROTOCOL.concat(HOST, ':', PORT, '/'));
    })

    group('secret /', function () {
        let res = http.get(PROTOCOL.concat(HOST, ':', PORT, '/secret'));
    })
}


export function hard() {
    group('get /rn', function () {
        let res = http.get(PROTOCOL.concat(HOST, ':', PORT, '/rn'));
    });
}

export default function () {
    free();
    hard();
}



