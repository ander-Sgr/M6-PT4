const ciutat = document.getElementById('ciutat')
const temperaturaText = document.getElementById('temperatura')
const pressio = document.getElementById('pressio')
const velocitatVent = document.getElementById('velocitat-vent')
const imgClima = document.getElementById('img-clima')

function obtenerUbicacion() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitud = position.coords.latitude;
                    const longitud = position.coords.longitude;
                    resolve({ latitud, longitud });
                },
                error => {
                    reject(error);
                }
            );
        } else {
            reject(new Error('La geolocalización no está soportada por este navegador.'));
        }
    });
}

async function recallDataWeather() {
    try {
        const location = await obtenerUbicacion();
        const { latitud, longitud } = location;

        const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${latitud}%2C${longitud}`;

        const response = await fetch(url, {
            headers: {
                'X-RapidAPI-Key': '4cb129640cmsh6f37a58ad3a3f80p1cc326jsnf9ce74eff7d7',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
            }
        })

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const weatherData = response.json();

        return weatherData
    } catch (error) {
        console.log(`Error al obtener la localizacion: ${error}`);
    }
}

function showDataWeather() {
    recallDataWeather().then(data => {
        if (data.location) {
            const ciudad = data.location.name;
            const temperatura = data.current.temp_c;
            const iconoUrl = data.current.condition.icon;
            const press = data.current.pressure_mb;
            const wind = data.current.wind_kph

            imgClima.setAttribute('src', iconoUrl);
            ciutat.innerText = `Ciutat: ${ciudad}`
            pressio.innerText = `Pressio: ${press}`
            velocitatVent.innerText = `Velocitat del vent: ${wind}km`
            temperaturaText.innerHTML = `Temperatura: ${temperatura}`
        }
    })
}

showDataWeather();
