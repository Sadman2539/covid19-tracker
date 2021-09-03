const setInnerText = (idName, innerText) => {
    document.getElementById(idName).innerText = innerText;
}

// load covid data 
const loadWorldCovidData = () => {
    fetch('https://api.covid19api.com/summary')
        .then(response => response.json())
        .then(data => displayWorldData(data.Global));
}
// load world data function call 
loadWorldCovidData();


// show world covid data 
const displayWorldData = data => {
    setInnerText("global-confirmed", data.TotalConfirmed);
    setInnerText("total-recovered", data.TotalRecovered);
    setInnerText("global-death", data.TotalDeaths);
    setInnerText("global-new-cases", data.NewConfirmed);
}

// showError function call 
const showError = (err = "Sorry! No results found.") => {
    setInnerText("country-name", err);
}

// load country data function call 
const loadCountryData = () => {

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value.trim();
    const url = `https://api.covid19api.com/live/country/${searchText}`;
    console.log(url);
    // clear search field 
    searchField.value = '';

    if (searchText === '') {
        showError("Please search a country name.");
    } else {
        fetch(url)
            .then(response => response.json())
            .then(data => showCountryData(data));
    }
}

// showCountryData function declaration 
const showCountryData = data => {
    const country = data[data.length - 1];
    console.log(country);


    if (country) {
        setInnerText("country-name", country.Country);
        setInnerText("confirmed-cases", country.Confirmed);
        setInnerText("total-recovered", country.Recovered);
        setInnerText("total-deaths", country.Deaths);
        setInnerText("new-cases", country.Active);
    } else {
        showError("Please search a country name.");
    }

}