import { MY_API_KEY } from './config.js';
let covid19data;

(function onLoad()
{
    // set a function for each button
    setButtonFunctions();

    // fetch from each API when the page loads
    getJoke();
    getCurrencyExchangeRates();
    getLatestCOVID19Data();
})();

function setButtonFunctions()
{
    document.getElementById('buttonGetJoke').onclick = getJoke;
    document.getElementById('buttonCurrency').onclick = getCurrencyExchangeRates;
    document.getElementById('countries').onchange = function() {
        const selectedValue = document.getElementById('countries').value;
        const countryData = covid19data.filter(c => c.country == selectedValue)[0];

        // display data
        const newConfirmed = document.getElementById('covidNewConfirmed');
        const totalConfirmed = document.getElementById('covidTotalConfirmed');
        const covidNewDeaths = document.getElementById('covidNewDeaths');
        const covidTotalDeaths = document.getElementById('covidTotalDeaths');
        const lastUpdated = document.getElementById('covidLastUpdate');

        (countryData.cases.new) ? newConfirmed.innerHTML = 'New confirmed cases: ' + countryData.cases.new : newConfirmed.innerHTML = 'New confirmed cases: 0';
        (countryData.cases.total) ? totalConfirmed.innerHTML = 'Total confirmed cases: ' + countryData.cases.total : totalConfirmed.innerHTML = 'Total confirmed cases: 0';
        (countryData.deaths.new) ? covidNewDeaths.innerHTML = 'New deaths: ' + countryData.deaths.new : covidNewDeaths.innerHTML = 'New deaths: 0';
        (countryData.deaths.total) ? covidTotalDeaths.innerHTML = 'Total deaths: ' + countryData.deaths.total : covidTotalDeaths.innerHTML = 'Total deaths: 0';
        lastUpdated.innerHTML = 'Last updated: ' + countryData.day;
    };
}

// Chuck Norris jokes
async function getJoke()
{
    await fetch("https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
            "x-rapidapi-key": MY_API_KEY,
            "accept": "application/json"
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("Chuck Norris API object:");
        console.log(response);
        console.log("\n");

        // display data
        document.getElementById('joke').innerHTML = response.value;
        document.getElementById('jokeIcon').src = response.icon_url;
        document.getElementsByClassName('jokeTitle')[0].href = response.url;
    })
    .catch(err => {
        console.log(err);
    });
}

// Currency Exchange rates
const url = 'https://currency-converter110.p.rapidapi.com/?fromCurrency=EUR&toCurrency=USD&amount=100';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '2e16283cfemsha5b8970da166298p1e6670jsn38b1f42677b3',
		'x-rapidapi-host': 'currency-converter110.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}

// COVID 19 Data
async function getLatestCOVID19Data()
{
    await fetch("https://covid-193.p.rapidapi.com/statistics", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": MY_API_KEY
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log("COVID 19 API object:");
        console.log(response);
        console.log("\n");

        // add all countries to select element
        response.response.forEach(c => {
            const option = document.createElement('option');
            option.innerHTML = c.country;
            document.getElementById('countries').appendChild(option);
        })

        // save covid data to global variable
        covid19data = response.response;
    })
    .catch(err => {
        console.log(err);
    });
}