import { sleep, group } from 'k6'
import http from 'k6/http'

const HOST = 'http://www.load-test.ru:1080';
export const options = {
    vu: 1,
    duration: '5s'
}

export default function main() {
    let response

    const vars = {}

    group('WebTours Payment', function () {

        //Open Home Page
        response = http.get(`${HOST}/WebTours/home.html`, {
            headers: {
                'upgrade-insecure-requests': '1',
            },
        })

        // Get User Session
        response = http.get(`${HOST}/cgi-bin/nav.pl?in=home`, {
            headers: {
                'upgrade-insecure-requests': '1',
            },
        })

        let userSession = response.html().find("[name='userSession']").attr('value')

        //Login
        response = http.post(
            `${HOST}/cgi-bin/login.pl`,
            {
                userSession: `${userSession}`,
                username: 'k6test',
                password: 'k6test',
                'login.x': '73',
                'login.y': '12',
                JSFormSubmit: 'off',
            },
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    origin: `${HOST}`,
                    'upgrade-insecure-requests': '1',
                },
            }
        )

        // Open flights
        response = http.get(`${HOST}/cgi-bin/welcome.pl?page=search`)

        // Get cities
        response = http.get(`${HOST}//cgi-bin/reservations.pl?page=welcome`)
        let cities = response.html().find("[name='depart']").children('option').map(function (idx, el) {
            return el.text();
        })

        let city_depart = cities[Math.floor(Math.random() * cities.length)];
        let city_arrive = cities[Math.floor(Math.random() * cities.length)];

        // Choose flight
        response = http.post(
            `${HOST}/cgi-bin/reservations.pl`,
            `advanceDiscount=0&depart=${city_depart}&departDate=02%2F06%2F2022&arrive=${city_arrive}&returnDate=02%2F07%2F2022&numPassengers=1&seatPref=None&seatType=Coach&findFlights.x=40&findFlights.y=3&.cgifields=roundtrip%2CseatType%2CseatPref`,
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    origin: `${HOST}`,
                    'upgrade-insecure-requests': '1',
                },
            }
        )

        let outboundFlights = response.html().find("[name='outboundFlight']").map(function (idx, el) {
            return el.attr("value");
        });

        let outboundFlight = outboundFlights[Math.floor(Math.random() * outboundFlights.length)];

        // choose flight type
        response = http.post(
            `${HOST}/cgi-bin/reservations.pl`,
            {
                outboundFlight: outboundFlight,
                numPassengers: `${vars['numPassengers1']}`,
                advanceDiscount: `${vars['advanceDiscount1']}`,
                seatType: `${vars['seatType1']}`,
                seatPref: `${vars['seatPref1']}`,
                'reserveFlights.x': '72',
                'reserveFlights.y': '8',
            },
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    origin: `${HOST}`,
                    'upgrade-insecure-requests': '1',
                },
            }
        )

        // Make Payment
        response = http.post(
            `${HOST}/cgi-bin/reservations.pl`,
            {
                firstName: '',
                lastName: '',
                address1: '',
                address2: '',
                pass1: ' ',
                creditCard: '',
                expDate: '',
                oldCCOption: '',
                numPassengers: `${vars['numPassengers1']}`,
                seatType: `${vars['seatType1']}`,
                seatPref: `${vars['seatPref1']}`,
                outboundFlight: outboundFlight,
                advanceDiscount: `${vars['advanceDiscount1']}`,
                returnFlight: '',
                JSFormSubmit: 'off',
                'buyFlights.x': '34',
                'buyFlights.y': '7',
                '.cgifields': 'saveCC',
            },
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    origin: `${HOST}`,
                    'upgrade-insecure-requests': '1',
                },
            }
        )

        //Open Home Page
        response = http.get(`${HOST}/WebTours/home.html`, {
            headers: {
                'upgrade-insecure-requests': '1',
            },
        })
    })
}