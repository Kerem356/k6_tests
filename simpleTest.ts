import http from "k6/http";
import {group, check} from "k6";

const YA_URL = 'https://ya.ru/';
const RU_URL = 'http://www.ru/';

export let options = {
    discardResponseBodies: true,
    scenarios: {
        ya: {
            executor: 'ramping-arrival-rate',
            exec: 'ya',
            startRate: 0,
            timeUnit: '60s',
            preAllocatedVUs: 50,
            maxVUs: 100,
            tags: {
                name: 'yandex',
            },
            stages: [
                { target: 60, duration: '30s' },
                { target: 60, duration: '60s' },
                { target: 72, duration: '30s' },
                { target: 72, duration: '60s' },
            ],
        },
        ru: {
            executor: 'ramping-arrival-rate',
            exec: 'ru',
            startRate: 0,
            timeUnit: '60s',
            preAllocatedVUs: 50,
            maxVUs: 100,
            tags: {
                name: 'ru',
            },
            stages: [
                { target: 120, duration: '30s' },
                { target: 120, duration: '60s' },
                { target: 144, duration: '30s' },
                { target: 144, duration: '60s' },
            ],
        }
    }
}


export function ya() {
    let res = http.get(YA_URL);
    check(
        res, {
            'is status 200': (res) => res.status === 200
        }
    );
}

export function ru() {
    let res = http.get(RU_URL);
    check(
        res, {
            'is status 200': (res) => res.status === 200
        }
    );
}