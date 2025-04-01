let destination = document.getElementById('dest')
let btnSearch = document.getElementById('searchBtn')
let clearBtn = document.getElementById('clearBtn')

function processKeywords(keyWord) {
    if (keyWord==='beach' || keyWord==='beaches') {
        return 'beaches'
    }
    if (keyWord==='country' || keyWord==='countries')
    {
        return 'countries'
    }
    if (keyWord==='temples' || keyWord==='temple')
    {
        return 'temples'
    }
    return keyWord
}

function searchDestinations() {
    console.log("Entered")
    var input = document.getElementById('searchInput').value.toLowerCase();
    input = processKeywords(input);
    const resultDiv = document.querySelector('.searchResults');
    resultDiv.innerHTML = ''

    const apiURL = 'travel_recommendation_api.json';

    fetch(apiURL)
    .then(response => response.json())
    .then(data=> {
        var locations = data[input];
        if (locations) {
            locations.forEach(location => {
            resultDiv.innerHTML += `<h2>${location.name}</h2>`;
            if (input!='countries') {
                resultDiv.innerHTML += `<img src="${location.imageUrl}" alt="${location.name}">`
                resultDiv.innerHTML += `<p>${location.description}</p>`
            }

            if (input === 'countries') {
                location.cities.forEach(city=> {
                    resultDiv.innerHTML += `<img src="${city.imageUrl}" alt="${city.name}">`;
                    resultDiv.innerHTML += `<p>${city.description}</p>`;
            });
            }
            });
            
        } else {
            resultDiv.innerHTML += 'Location Not Found'
        }
})
    .catch(error => console.error('There was a problem with the fetch operation:', error))  
}


function clearResults() {
    resultDiv = document.querySelector('.searchResults');
    resultDiv.innerHTML = '';
}

btnSearch.addEventListener('click', searchDestinations)
clearBtn.addEventListener('click', clearResults)