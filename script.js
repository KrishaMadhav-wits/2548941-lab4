const spinner=document.getElementById("loading-spinner");
spinner.classList.add("hidden");
const borderingCountry=document.getElementById("bordering-countries");
async function searchCountry(countryName) {
    try {
        spinner.classList.remove("hidden");
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        if(!response.ok){
            throw new Error("Country not found");
        }
        const data = await response.json();
        const country=data[0];
        document.getElementById('country-info').innerHTML = `
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <img src="${country.flags.svg}" alt="${country.name.common} flag">
`;
        const bord=country.borders
        if(bord.length>0){
            for(let code of country.borders){
                const borderResponse=await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
                const borderData=await borderResponse.json();
                const borderCountry=borderData[0];
                let newCountry=document.createElement("section");
                newCountry.classList.add("country-card");
                newCountry.innerHTML=`<h2>${borderCountry.name.common}</h2>
        <p><strong>Capital:</strong> ${borderCountry.capital[0]}</p>
        <p><strong>Population:</strong> ${borderCountry.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${borderCountry.region}</p>
        <img src="${borderCountry.flags.svg}" alt="${borderCountry.name.common} flag"></img>`;
                borderingCountry.appendChild(newCountry);
            }
        }
    }

    catch (error) {
        
        const errorMsg=document.getElementById("error-message").textContent="Country not found.";
        document.getElementById('country-info').innerHTML = "";
    } finally {
        spinner.classList.add("hidden");
    }
}

// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const countryInput = document.getElementById('country-input').value;
    searchCountry(countryInput);
});
document.getElementById('country-input').addEventListener('keydown', (e) => {
    if(e.key==="Enter"){
       countryInput.value.trim();
       if(!countryInput)return;
       searchCountry(countryInput);
       countryInput.value="";
    }
    
    
});