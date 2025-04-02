const API_KEY = "b1e88fb2ae1518283d65e600c839ca95";

async function getWeather() {
    let city = document.getElementById("city-input").value.trim();
    let searchTitle = document.getElementById('search-title');
    let searchTemperature = document.getElementById('search-temperature');
    let searchDesc = document.getElementById('search-desc');
    let weatherIcon = document.getElementById('weather-icon');
    let errorMsg = document.getElementById('error-msg');
    let loading = document.getElementById("loading");

    if (city === "") {
        errorMsg.textContent = "Please enter a city name!";
        errorMsg.style.display = "block";
        return;
    }

    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    // to show loading animation and hide other elements
    loading.style.display = "block";
    searchTitle.textContent = "";
    searchTemperature.textContent = "";
    searchDesc.textContent = "";
    weatherIcon.style.display = "none";
    errorMsg.style.display = "none";

    // removing fade-in effect for reloading cases
    searchTitle.classList.remove("show");
    searchTemperature.classList.remove("show");
    searchDesc.classList.remove("show");
    weatherIcon.classList.remove("show");

    try {
        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error("City not found...");
        }

        let data = await response.json();
        searchTitle.textContent = data.name;
        searchTemperature.textContent = `${data.main.temp}°C`;

        let weatherDesc = data.weather[0].description;
        searchDesc.textContent = `${weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1)}`;

        let iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.style.display = "block";

        // fade-in effect
        setTimeout(() => {
            searchTitle.classList.add("show");
            searchTemperature.classList.add("show");
            searchDesc.classList.add("show");
            weatherIcon.classList.add("show");
        }, 100); //  delay to allow transition

        errorMsg.style.display = "none";
    } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.style.display = "block";
    } finally {
        loading.style.display = "none"; // Hide loading anim
    }
}
