import { useState } from "react"
import ClimateBackground from "./ClimateBackground"

const Container = () => {

    const [city, setcity] = useState("Castro")
    const [weatherForcast, setweatherForcast] = useState(null)

    //faz o valor da barra de pesquisa mudar para qual o usuario escolher
    const handleChange = (e) => {

        setcity(e.target.value)
    }

    const handleSearch = () => {
        fetch(`http://api.weatherapi.com/v1/current.json?key=5ac7719d7ef34a018a835519230203&q=${city}&lang=pt`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
                console.log("response =", response)
            })
            .then((data) => {
                setweatherForcast(data)

                console.log("data =", data)
            });

    };

    return (
        <>
        
            <ClimateBackground weatherForcast={weatherForcast} />

            <div className="Container">
                <h1>Verifique agora a previsão do tempo da sua cidade!</h1>
                <h2>Digite o nome da sua cidade abaixo</h2>

                <input
                    onChange={handleChange}
                    className="Form-control"
                    value={city} />

                <button onClick={handleSearch} className="btnSearch" >Pesquisar</button>

                {weatherForcast ? (

                    <div className="Forcast">
                        <div>
                            <div className="Icon">
                                <img src={weatherForcast.current.condition.icon} alt='icon' />
                            </div>

                            <div className="Temp">
                                <h3>Clima: {weatherForcast.current.condition.text}</h3>
                                <p>
                                    Temp: {weatherForcast.current.temp_c} C°
                                </p>
                            </div>

                        </div>
                    </div>

                ) : null}
            </div>

        </>
    )

}

export default Container