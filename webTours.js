import { sleep, group } from 'k6'
import http from 'k6/http'

export const options = {
    vus: 1,
    duration: '10s'
}

export default function main() {
    let response

    const vars = {}

    group('page_1 - http://www.load-test.ru:1080/WebTours/index.htm', function () {
        response = http.get('http://www.load-test.ru:1080/WebTours/header.html', {
            headers: {
                'upgrade-insecure-requests': '1',
            },
        })

        response = http.get('http://www.load-test.ru:1080/WebTours/home.html', {
            headers: {
                'upgrade-insecure-requests': '1',
            },
        })

        response = http.post(
            'http://www.load-test.ru:1080/cgi-bin/login.pl',
            {
                userSession: '133176.136168489zifActHpfAtVzzzHtVVAVptifAcf',
                username: 'k6test',
                password: 'k6test',
                'login.x': '73',
                'login.y': '12',
                JSFormSubmit: 'off',
            },
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    origin: 'http://www.load-test.ru:1080',
                    'upgrade-insecure-requests': '1',
                },
            }
        )

        response = http.post(
            'http://www.load-test.ru:1080/cgi-bin/reservations.pl',
            'advanceDiscount=0&depart=Frankfurt&departDate=02%2F06%2F2022&arrive=Los+Angeles&returnDate=02%2F07%2F2022&numPassengers=1&seatPref=None&seatType=Coach&findFlights.x=40&findFlights.y=3&.cgifields=roundtrip%2CseatType%2CseatPref',
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    origin: 'http://www.load-test.ru:1080',
                    'upgrade-insecure-requests': '1',
                },
            }
        )

        vars['numPassengers1'] = response.html().find('input[name=numPassengers]').first().attr('value')

        vars['advanceDiscount1'] = response
            .html()
            .find('input[name=advanceDiscount]')
            .first()
            .attr('value')

        vars['seatType1'] = response.html().find('input[name=seatType]').first().attr('value')

        vars['seatPref1'] = response.html().find('input[name=seatPref]').first().attr('value')

        response = http.post(
            'http://www.load-test.ru:1080/cgi-bin/reservations.pl',
            {
                outboundFlight: '131;290;02/06/2022',
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
                    origin: 'http://www.load-test.ru:1080',
                    'upgrade-insecure-requests': '1',
                },
            }
        )

        response = http.post(
            'http://www.load-test.ru:1080/cgi-bin/reservations.pl',
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
                outboundFlight: '131;290;02/06/2022',
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
                    origin: 'http://www.load-test.ru:1080',
                    'upgrade-insecure-requests': '1',
                },
            }
        )

        response = http.get('http://www.load-test.ru:1080/WebTours/header.html', {
            headers: {
                'upgrade-insecure-requests': '1',
            },
        })

        response = http.get('http://www.load-test.ru:1080/WebTours/home.html', {
            headers: {
                'upgrade-insecure-requests': '1',
            },
        })
    })
}