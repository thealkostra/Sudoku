import { useDispatch } from "react-redux"
import { changeActiveTile, changeGameOn, clearField, restart, selectHelp, setHelp, setVictory } from "../../../store/allSlice";

import "./menu.css"

export const Menu = () =>{
    const dispatch = useDispatch();

    const HandleClickRestart = () =>{
        dispatch(restart());
    }

    const HandleClickBack = () =>{
        dispatch(changeActiveTile(null));
        dispatch(clearField());
        dispatch(setVictory(false));
        dispatch(changeGameOn(false));
    }

    const mouseHover = (str:string) =>{
        dispatch(setHelp(str));
    }

    const mouseBlur = () =>{
        dispatch(setHelp( "Control: Mouse / Arrows Up, Down, Left, Right / NumPad / Delete "));
    }

    return (
        <ul className="menu menu__game menu_view">
            <li 
                className = "btn restart"
                onClick = {HandleClickRestart}
                onMouseOver = {()=>mouseHover("Restart level")}
                onMouseOut = {mouseBlur}
            ></li>
            <li 
                className = "btn back"
                onClick = {HandleClickBack}
                onMouseOver = {()=>mouseHover("Back to menu")}
                onMouseOut = {mouseBlur}
            ></li>
        </ul>
    )
}