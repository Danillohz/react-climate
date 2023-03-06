import { useState, useEffect } from "react";

import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import RainParticleOptions from "./ParticleOptions";

import TranspImg from "../imagens/Fundo_transparente.png";

import BlackCloud from "../imagens/Nublado.png";
import whiteCloud from "../imagens/Nuvem_Clara.png"
import thunderstormCloud from "../imagens/Nuvem_trovoada.png"

import Sun from "../imagens/Sol.png";
import Moon from "../imagens/Lua.png";



const ClimateBackground = ({ weatherForcast }) => {

  const [stylebackground, setstylebackground] = useState("BackgroundDefault")
  const [isDay, setIsDay] = useState(true);
  const [climate, setClimate] = useState(null);
  const [imgOneCloud, setImgOneCloud] = useState(TranspImg)
  const [imgTwoCloud, setImgTwoCloud] = useState(TranspImg)
  const [imgThreeCloud, setImgThreeCloud] = useState(TranspImg)
  const [imgSunAndMoon, setImgSunAndMoon] = useState(TranspImg)
  

  console.log(climate)
  //Define as configurações para a produção de partículas
    const particleOptions = RainParticleOptions();

    const ZeroParticles = 0;
    const OneParticles = 250;
    const TwoParticles = 500;
    const ThreeParticles = 750;

    const [rain, setRain] = useState(ZeroParticles)

    const NewParticleOptions = Object.assign({}, particleOptions);
    NewParticleOptions.particles.number.value = rain
    
  
    const particlesInit = useCallback(async engine => {
      console.log(engine);
      await loadFull(engine);
    }, []);
  
    const particlesLoaded = useCallback(async container => {
      await console.log(container);
    }, []);

    //set a string do climate
  useEffect(() => {
    setClimate(weatherForcast?.current?.condition?.text)
  }, [weatherForcast]);


  //vê se ma região está noite, dia ou null e muda o Background e imagem do sol e da lua
  useEffect(() => {
    if (weatherForcast && weatherForcast.current.is_day === 0) {
      setIsDay(0);
    } else if (weatherForcast && weatherForcast.current.is_day === 1) {
      setIsDay(1)
    } else {
      setIsDay(2)
    }

  }, [weatherForcast]);

  useEffect(() => {
    if (isDay === 1) {
      setstylebackground("BackgroundDay");
      setImgSunAndMoon(Sun)
    } else if (isDay === 0) {
      setstylebackground("BackgroundNight");
      setImgSunAndMoon(Moon)
    } else {
      setstylebackground("BackgroundDefault");
      setImgSunAndMoon(TranspImg)
    }
  }, [isDay]);

  useEffect(() => {
    if (climate === "Céu limpo" || climate === "Sol") {
      setImgOneCloud(TranspImg);
      setImgTwoCloud(TranspImg);
      setImgThreeCloud(TranspImg);
      setstylebackground("BackgroundDay");
      setRain(ZeroParticles)
      

    }
    else if (climate === "Parcialmente nublado" || climate === "Encoberto") {
      setImgOneCloud(whiteCloud);
      setImgTwoCloud(TranspImg);
      setImgThreeCloud(TranspImg);
      setstylebackground("BackgroundDay");
      setRain(ZeroParticles)

    }
    else if (climate === "Nublado" || climate === "Possibilidade de chuva irregular" || climate === "Possibilidade de chuva" || climate === "Possibilidade de neve irregular" || climate === "Possibilidade de neve molhada irregular" || climate === "Possibilidade de chuvisco gelado irregular" || climate === "Possibilidade de trovoada") {

      setImgOneCloud(BlackCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(BlackCloud);
      setstylebackground("BackgroundGreyDay");
      setRain(ZeroParticles)



    }
    else if (climate === "Neblina" || climate === "Nevoeiro" || climate === "Nevoeiro gelado" || climate === "Nevasca") {
      setImgOneCloud(BlackCloud);
      setImgTwoCloud(TranspImg);
      setImgThreeCloud(TranspImg);
      setstylebackground("BackgroundGreyDay");
      setRain(ZeroParticles)
      
    }
    else if (climate === "Rajadas de vento com neve"){
      setImgOneCloud(whiteCloud);
      setImgTwoCloud(whiteCloud);
      setImgThreeCloud(whiteCloud);
      setstylebackground("BackgroundGreyDay");
      setRain(ZeroParticles)
    }
    else if (climate === "Chuvisco irregular" || climate === "Chuvisco de chuva irregular" || climate === "Chuvisco gelado" || climate === "Chuvisco forte gelado" || climate === "Chuva fraca irregular" || climate === "Chuva fraca" || climate === "Períodos de chuva moderadamente" || climate === "Chuva fraca e gelada" || climate === "Aguaceiros fracos") {

      setImgOneCloud(BlackCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(BlackCloud);
      setstylebackground("BackgroundGreyDay");
      setRain(OneParticles)

    }
    else if(climate ==="Chuvisco forte gelado"){
      setImgOneCloud(BlackCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(BlackCloud);
      setstylebackground("BackgroundGreyDay");
      setRain(TwoParticles)
    }
    else if (climate === "Chuva pesada" || climate === "Períodos de chuva forte" || climate === "Chuva forte" || climate === "Chuva gelada moderada ou forte" || climate === "Chuva torrencial" || climate === "Aguaceiros moderados ou fortes") {

      setImgOneCloud(BlackCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(BlackCloud);
      setstylebackground("BackgroundGreyDay");
      setRain(ThreeParticles)

    }
    else if (climate === "Chuva fraca com neve" || climate === "Aguaceiros fracos com neve"){
      setImgOneCloud(whiteCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(whiteCloud);
      setstylebackground("BackgroundGreyDay");
      setRain(OneParticles)
    }
    else if (climate === "Chuva forte ou moderadamente com neve" || climate === "Aguaceiros moderados ou fortes com neve"){
      setImgOneCloud(BlackCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(BlackCloud);
      setstylebackground("BackgroundGreyDay");
      setRain(TwoParticles)
    }
    else if (climate === "Queda de neve irregular e fraca" || climate === "Queda de neve fraca" || climate === "Queda de neve moderada e irregular" || climate === "Queda de neve moderada" || climate === "Queda de neve forte e irregular") {

      setImgOneCloud(BlackCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(BlackCloud);
      setstylebackground("BackgroundGreyDay");
      setRain(ZeroParticles)

    }
    else if (climate === "Neve intensa"){
      setImgOneCloud(whiteCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(whiteCloud);
      setstylebackground("BackgroundGreyDay");
      setRain(ZeroParticles)
    }
    else if (climate === "Granizo" || climate === "Aguaceiros fracos com granizo" || climate === "Aguaceiros moderados ou fortes com granizo") {

      setImgOneCloud(BlackCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(BlackCloud);
      setstylebackground("BackgroundGreyDay");
      setRain(OneParticles)

    }
    else if(climate === "Chuva fraca irregular com trovoada" || climate ==="Chuva moderada ou forte com trovoada"){
      setImgOneCloud(thunderstormCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(thunderstormCloud);
      setstylebackground("BackgroundGreyDay");
      setRain(TwoParticles)
    }
    else if(climate === "Neve fraca irregular com trovoada" || climate ==="Neve moderada ou forte com trovoada"){
      setImgOneCloud(BlackCloud);
      setImgTwoCloud(thunderstormCloud);
      setImgThreeCloud(BlackCloud);
      setstylebackground("BackgroundGreyDay");
      setRain(ZeroParticles)
    }
    else {
      setImgOneCloud(TranspImg);
      setImgTwoCloud(TranspImg);
      setImgThreeCloud(TranspImg);

    }



  }, [climate]);

  console.log(climate)
  return (
    <>
         <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={NewParticleOptions}
            />

      <div className={stylebackground}>

        <img className="OneCloud" src={imgOneCloud} alt="" />
        <img className="TwoCloud" src={imgTwoCloud} alt="" />
        <img className="ThreeCloud" src={imgThreeCloud} alt="" />
        <img className="SunAndMoon" src={imgSunAndMoon} alt="" />
      </div>
    </>

  )
}
export default ClimateBackground;


