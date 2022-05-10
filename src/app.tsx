import "./app.css";
import { Header } from "./Components/header/header";
import { Buttons } from "./Components/buttons/buttons"
import { useDispatch, useSelector } from "react-redux";
import { changeGameOn, selectGameon } from "./store/allSlice";
import { Button } from "./Components/buttons/button/button";
import { Game } from "./Components/game/game";
import { useEffect } from "react";
import { useRef } from "react";

export const App = () => {
    const dispath = useDispatch();
    const gameOn = useSelector(selectGameon);
    const appref:any = useRef();

    const HandleClickStart = () =>{
        dispath(changeGameOn(true));
    }

    const windowResize = () =>{
        let unit;
        if(window.innerHeight >= window.innerWidth)
            unit = window.innerHeight / window.innerWidth;
        else
            unit = 1.05;
        appref.current.style.setProperty(`--unit`, unit);
    }

    useEffect(()=>{
        windowResize();
        window.addEventListener('resize', windowResize)
        return()=>{
            window.removeEventListener("resize", windowResize)
        }
    })

    return(
        <div ref={appref} className = "App">
            <Header/>
            {!gameOn&&(
                <>
                    <div className="buttons buttons_size">
                        <Button funcExecute={HandleClickStart} styleclass = "button buttons__button button_size-l">START</Button>
                    </div>
                    <Buttons/>
                </>
            )}
            {gameOn&&(<Game/>)}
        </div>
    )
} 