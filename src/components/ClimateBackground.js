import { useState, useEffect } from "react";

import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import RainParticleOption from "./RainParticlesOptions.js";
import SnowParticleOption from "./SnowParticlesOptions.js";

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
  const [imgOneCloud, setImgOneCloud] = useState(TranspImg);
  const [imgTwoCloud, setImgTwoCloud] = useState(TranspImg);
  const [imgThreeCloud, setImgThreeCloud] = useState(TranspImg);
  const [imgSunAndMoon, setImgSunAndMoon] = useState(TranspImg);

  const RainParticleOptions = RainParticleOption();
  const SnowParticleOptions = SnowParticleOption();


  console.log(climate)
  //Define as configurações para a produção de partículas
  //níveis de particula
  const levelZeroParticles = 0;
  const levelOneParticles = 100;
  const levelTwoParticles = 300;
  const levelThreeParticles = 500;
  const levelFourParticles = 700;

  const [rainLevel, setRainLevel] = useState(levelZeroParticles)
  const [snowLevel, setSnowLevel] = useState(levelZeroParticles)

  //Define as particulas options de chuva
  const NewRainParticleOptions = Object.assign({}, RainParticleOptions);
  NewRainParticleOptions.particles.number.value = rainLevel

  const NewSnowParticleOptions = Object.assign({}, SnowParticleOptions);
  NewSnowParticleOptions.particles.number.value = snowLevel

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);

  //

  //set a string do climate
  useEffect(() => {
    setClimate(weatherForcast?.current?.condition?.text)
  }, [weatherForcast]);


  //vê se ma região está noite, dia ou null
  useEffect(() => {
    if (weatherForcast && weatherForcast.current.is_day === 0) {
      setIsDay(0);
    } else if (weatherForcast && weatherForcast.current.is_day === 1) {
      setIsDay(1)
    } else {
      setIsDay(2)
    }

  }, [weatherForcast]);

  //muda o Background e imagem do sol e da lua
  const DayOrNight = () => {
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
  }

  //Muda as imagens a quantidade de particua e o fundo dependendo do clima 
  useEffect(() => {
    //1
    if (climate === "Céu limpo" || climate === "Sol") {
      setImgOneCloud(TranspImg);
      setImgTwoCloud(TranspImg);
      setImgThreeCloud(TranspImg);
      DayOrNight();
      setRainLevel(levelZeroParticles);
      setSnowLevel(levelZeroParticles);


    }
    //2
    else if (climate === "Parcialmente nublado" || climate === "Encoberto") {
      setImgOneCloud(TranspImg);
      setImgTwoCloud(TranspImg);
      setImgThreeCloud(whiteCloud);
      DayOrNight();
      setRainLevel(levelZeroParticles)
      setSnowLevel(levelZeroParticles);
    }
    else if (climate === "Nublado" || climate === "Possibilidade de chuva irregular" || climate === "Possibilidade de chuva" || climate === "Possibilidade de neve irregular" || climate === "Possibilidade de neve molhada irregular" || climate === "Possibilidade de chuvisco gelado irregular" || climate === "Possibilidade de trovoada") {

      setImgOneCloud(BlackCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(BlackCloud);
      DayOrNight();
      setstylebackground("BackgroundGreyDay");
      setRainLevel(levelZeroParticles);
      setSnowLevel(levelZeroParticles);





    }
    else if (climate === "Neblina" || climate === "Nevoeiro" || climate === "Nevoeiro gelado" || climate === "Nevasca") {
      setImgOneCloud(BlackCloud);
      setImgTwoCloud(TranspImg);
      setImgThreeCloud(whiteCloud);
      DayOrNight();
      setstylebackground("BackgroundGreyDay");
      setRainLevel(levelZeroParticles);
      setSnowLevel(levelZeroParticles);


    }
    else if (climate === "Rajadas de vento com neve") {
      setImgOneCloud(whiteCloud);
      setImgTwoCloud(whiteCloud);
      setImgThreeCloud(whiteCloud);
      DayOrNight();
      setstylebackground("BackgroundGreyDay");
      setRainLevel(levelZeroParticles)
      setSnowLevel(levelOneParticles);

    }
    else if (climate === "Chuva moderada"||climate === "Chuvisco irregular" || climate === "Chuvisco de chuva irregular" || climate === "Chuvisco gelado" || climate === "Chuvisco forte gelado" || climate === "Chuva fraca irregular" || climate === "Chuva fraca" || climate === "Períodos de chuva moderadamente" || climate === "Chuva fraca e gelada" || climate === "Aguaceiros fracos" || climate === "Aguaceiros flexíveis" || climate === "Períodos de chuva moderada" || climate === "Chuvisco") {

      setImgOneCloud(BlackCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(BlackCloud);
      DayOrNight();
      setstylebackground("BackgroundGreyDay");
      setRainLevel(levelTwoParticles)
      setSnowLevel(levelZeroParticles);



    }
    else if (climate === "Chuvisco forte gelado") {
      setImgOneCloud(BlackCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(BlackCloud);
      DayOrNight();
      setstylebackground("BackgroundGreyDay");
      setRainLevel(levelThreeParticles)
      setSnowLevel(levelZeroParticles);

    }
    else if (climate === "Chuva pesada" || climate === "Períodos de chuva forte" || climate === "Chuva forte" || climate === "Chuva gelada moderada ou forte" || climate === "Chuva torrencial" || climate === "Aguaceiros moderados ou fortes") {

      setImgOneCloud(BlackCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(BlackCloud);
      DayOrNight();
      setstylebackground("BackgroundGreyDay");
      setRainLevel(levelFourParticles)
      setSnowLevel(levelZeroParticles);


    }
    else if (climate === "Chuva fraca com neve" || climate === "Aguaceiros fracos com neve") {
      setImgOneCloud(whiteCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(whiteCloud);
      DayOrNight();
      setstylebackground("BackgroundGreyDay");
      setRainLevel(levelOneParticles)
      setSnowLevel(levelOneParticles);
    }
    else if (climate === "Chuva forte ou moderadamente com neve" || climate === "Aguaceiros moderados ou fortes com neve") {
      setImgOneCloud(BlackCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(BlackCloud);
      DayOrNight();
      setstylebackground("BackgroundGreyDay");
      setRainLevel(levelTwoParticles)
      setSnowLevel(levelTwoParticles);
    }
    else if (climate === "Queda de neve irregular e fraca" || climate === "Queda de neve fraca" || climate === "Queda de neve moderada e irregular" || climate === "Queda de neve moderada" || climate === "Queda de neve forte e irregular") {

      setImgOneCloud(BlackCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(BlackCloud);
      DayOrNight();
      setstylebackground("BackgroundGreyDay");
      setRainLevel(levelZeroParticles)
      setSnowLevel(levelTwoParticles);


    }
    else if (climate === "Neve intensa") {
      setImgOneCloud(whiteCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(whiteCloud);
      DayOrNight();
      setstylebackground("BackgroundGreyDay");
      setRainLevel(levelZeroParticles)
      setSnowLevel(levelFourParticles);
    }
    else if (climate === "Granizo" || climate === "Aguaceiros fracos com granizo" || climate === "Aguaceiros moderados ou fortes com granizo") {

      setImgOneCloud(BlackCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(BlackCloud);
      DayOrNight();
      setstylebackground("BackgroundGreyDay");
      setRainLevel(levelOneParticles)
      setSnowLevel(levelZeroParticles);

    }
    else if (climate === "Chuva fraca irregular com trovoada" || climate === "Chuva moderada ou forte com trovoada") {
      setImgOneCloud(thunderstormCloud);
      setImgTwoCloud(BlackCloud);
      setImgThreeCloud(thunderstormCloud);
      DayOrNight();
      setstylebackground("BackgroundGreyDay");
      setRainLevel(levelThreeParticles)
      setSnowLevel(levelZeroParticles)

    }
    else if (climate === "Neve fraca irregular com trovoada" || climate === "Neve moderada ou forte com trovoada") {
      setImgOneCloud(BlackCloud);
      setImgTwoCloud(thunderstormCloud);
      setImgThreeCloud(BlackCloud);
      DayOrNight();
      setstylebackground("BackgroundGreyDay");
      setRainLevel(levelZeroParticles);
      setRainLevel(levelThreeParticles)
    }
    else {
      setImgOneCloud(TranspImg);
      setImgTwoCloud(TranspImg);
      setImgThreeCloud(TranspImg);
      setSnowLevel(levelZeroParticles);
      setRainLevel(levelZeroParticles);
      DayOrNight();


    }



  }, [climate]);

  console.log(climate)
  return (
    <>

      <Particles
        id="tsRainparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={NewRainParticleOptions}
      />
      <Particles
        id="tsSnowparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={NewSnowParticleOptions}
      />




      <div className={stylebackground}>
        <img className="OneCloud" src={imgOneCloud} alt=""/>
        <img className="TwoCloud" src={imgTwoCloud} alt="" />
        <img className="ThreeCloud" src={imgThreeCloud} alt="" />
        <img className="SunAndMoon" src={imgSunAndMoon} alt="" />
      </div>
    </>

  )
}
export default ClimateBackground;


