import { useState } from "react"
import ClimateBackground from "./ClimateBackground"

const Container = () => {

    const [city, setcity] = useState("")
    const [weatherForcast, setweatherForcast] = useState(null)
    //Muda a aparencia do container caso clickado
    const [ContainerAfter, setContainerAfter] = useState("ContainerBefore")


    //faz o valor da barra de pesquisa mudar para qual o usuario escolher
    const handleChange = (e) => {

        setcity(e.target.value)
    }

    const handleSearch = () => {
        
        setContainerAfter("ContainerAfter")
        setweatherForcast(null)
        fetch(`https://api.weatherapi.com/v1/current.json?key=5ac7719d7ef34a018a835519230203&q=${city}&lang=pt`)
            .then((response) => {
                if (response.status === 200) {
                    return response.json()
                }
                throw new Error(window.alert("Não foi possível obter a previsão do tempo para esta cidade."));
            })
            .then((data) => {
                
                setweatherForcast(data)

                console.log("data =", data)
            })
            .catch((error) => {
                console.error(error);
                setcity("")
                setweatherForcast(null)
                
            });
            
    };

    return (
        <>
        
            <ClimateBackground weatherForcast={weatherForcast} />

            <div className={ContainerAfter} >
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
                            <div className="Local">
            
                                <p>
                                  Local:{weatherForcast.location.name+","}{weatherForcast.location.region + ","}{weatherForcast.location.country+"."}
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