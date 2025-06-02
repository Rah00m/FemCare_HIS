import React, { useState, useEffect } from "react";
import "./Backs.css";
import bg1 from "../images/bg1.jpg";
import bg2 from "../images/bg2.jpg";
import bg3 from "../images/bg3.jpg";
 
const Backs = ({landingRef ,curved}) => {
   const backgrounds = [bg1, bg2, bg3];
  const [index, setIndex] = useState(0);
    const [scrolled ,setScrolled] = useState(0);
     useEffect(() => {
    const interval=setInterval(() => {
      setIndex((prevIndex)=>(prevIndex+1)%backgrounds.length);
    },1000);
    return () => clearInterval(interval);
  },[]);
  // handle scroll event
    useEffect(() => {
        const onScroll = () => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const windowHeight = window.innerHeight || document.documentElement.clientHeight;
            setScrolled(scrollTop>windowHeight);
        };
        window.addEventListener('scroll', onScroll);
        return () => {
            //clean event  
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

  return (
    <div
      ref={landingRef }
      className={`landing-section ${scrolled ? "fade-out" : "fade-in"} ${curved ? "curved" : ""}`}
      style={{
        backgroundImage: `url(${backgrounds[index]})`,
      }}
    >
      <div className="overlay">
        {/* <h1 className="landing-title">FEMCare Medical Center</h1> */}
      </div>
    </div>
  );
};
export default Backs;