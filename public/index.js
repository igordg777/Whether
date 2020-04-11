document.getElementById('chooseCity').onclick = () => {
    let condition = document.getElementById('choose').getAttribute('style');
    if (condition === 'display: none') {
        document.getElementById('choose').setAttribute('style', 'display: view');
        document.getElementById('dashboard').setAttribute('style', 'display: none');
    } else {
        document.getElementById('choose').setAttribute('style', 'display: none');
        document.getElementById('dashboard').setAttribute('style', 'display: none');

    }
    document.getElementById('sound').play()
}

document.getElementById("formLogin").addEventListener("submit", async (event) => {
    event.preventDefault();
    let condition = document.getElementById('dashboard').getAttribute('style');
    if (condition === 'display: none') {
        document.getElementById('dashboard').setAttribute('style', 'display: view');

        let temp = document.getElementById("temp");
        let wind = document.getElementById("wind");
        let cloud = document.getElementById("cloud");
        let pressure = document.getElementById("pressure");
        let title = document.getElementById("title");


        console.log(event.target.dataset)
        let name;
        let select = document.getElementById("sel").value;
        let write = document.getElementById('write').value;
        console.log(name)
        if (select !== '') {
            name = select;
        } else if (write !== '') {
            name = write;
        } else if (select !== '' && write !== '') {
            alert('Должно быть заполнено только одно поле для ввода!')
            location.reload()
        } else {
            alert('Заполните поле для ввода!')
            location.reload()
        }

        console.log(name)

        title.innerHTML = `Основная информация о погоде в городе ${name}`
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${name}&appid=b31882c9d2eb27dd7cca7b302bcff398`;
        fetch(`https://cors-anywhere.herokuapp.com/${url}`)
            //     fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=b31882c9d2eb27dd7cca7b302bcff398`)
            .then(resp => {
                console.log(resp)
                return resp.json();
            })
            .then(data => {
                console.log(data)
                if (data.cod === 200) {
                    temp.innerHTML = Math.round(data.main.temp - 273) + "&deg";
                    wind.innerHTML = `${data.wind.speed} мет. в сек.`;
                    cloud.innerHTML = `${data.clouds.all} %`;
                    pressure.innerHTML = `${data.main.pressure} <a href="https://ru.wikipedia.org/wiki/%D0%9C%D0%B8%D0%BB%D0%BB%D0%B8%D0%BC%D0%B5%D1%82%D1%80_%D0%B2%D0%BE%D0%B4%D1%8F%D0%BD%D0%BE%D0%B3%D0%BE_%D1%81%D1%82%D0%BE%D0%BB%D0%B1%D0%B0">мм вод. столба</a>`
                } else if (data.message === "city not found") {
                    title.innerHTML = 'Такого города не существует!'
                }

            });
    }
})
document.getElementById("myCities").addEventListener("click", async () => {
    document.getElementById('choose').setAttribute('style', 'display: none');
    let condition = document.getElementById('dashboard').getAttribute('style');
    if (condition === 'display: none') {
        document.getElementById('dashboard').setAttribute('style', 'display: view');

        let temp = document.getElementById("temp");
        let wind = document.getElementById("wind");
        let cloud = document.getElementById("cloud");
        let pressure = document.getElementById("pressure");
        let title = document.getElementById("title");
        temp.innerHTML = '';
        wind.innerHTML = '';
        cloud.innerHTML = '';
        pressure.innerHTML = '';
        title.innerHTML = ''

        let name = ['Moscow', 'Paris', 'Kyra', 'Khabarovsk', 'Lobnya'];

        title.innerHTML = `Основная информация о погоде в избранных городах на сегодня `

        async function listOfCities() {
            for (let i = 0; i < name.length; i++) {
                const url = `http://api.openweathermap.org/data/2.5/weather?q=${name[i]}&appid=b31882c9d2eb27dd7cca7b302bcff398`;
                await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
                    .then(resp => {
                        return resp.json();
                    })
                    .then(data => {
                        if (data.cod === 200) {
                            temp.innerHTML += `${name[i]}: ` + Math.round(data.main.temp - 273) + "&deg" + '<br>';
                            wind.innerHTML += `${name[i]}: ${data.wind.speed} мет. в сек.` + '<br>';
                            cloud.innerHTML += `${name[i]}: ${data.clouds.all} %` + '<br>';
                            pressure.innerHTML += `${name[i]}: ${data.main.pressure} <a href="https://ru.wikipedia.org/wiki/%D0%9C%D0%B8%D0%BB%D0%BB%D0%B8%D0%BC%D0%B5%D1%82%D1%80_%D0%B2%D0%BE%D0%B4%D1%8F%D0%BD%D0%BE%D0%B3%D0%BE_%D1%81%D1%82%D0%BE%D0%BB%D0%B1%D0%B0">мм.</a>` + '<br>';
                        } else if (data.message === "city not found") {
                            title.innerHTML = 'Произошел сбой на сервере погоды "Openweathermap"'
                        }

                    });
            }
        }

        listOfCities()
    } else {
        document.getElementById('dashboard').setAttribute('style', 'display: none');
        let temp = document.getElementById("temp");
        let wind = document.getElementById("wind");
        let cloud = document.getElementById("cloud");
        let pressure = document.getElementById("pressure");
        let title = document.getElementById("title");
        temp.innerHTML = '';
        wind.innerHTML = '';
        cloud.innerHTML = '';
        pressure.innerHTML = '';
        title.innerHTML = ''
    }
    document.getElementById('sound').play()
})

