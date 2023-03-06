import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import RainParticleOptions from "./ParticleOptions";



const SnowParticles = () => {

  const particleOptions = RainParticleOptions();

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async container => {
    await console.log(container);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particleOptions}
    />
  );
};

export default SnowParticles;