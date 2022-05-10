import "./buttons.css";
import { Button } from "./button/button"
import { useDispatch, useSelector } from "react-redux";
import { changeGameMode, selectGameMode } from "../../store/allSlice";


export const Buttons = () =>{
    const dispatch = useDispatch();
    const gameMode = useSelector(selectGameMode);

    const HandleClickButton = (level:number) =>{
        dispatch(changeGameMode(level));
    }

    return(
        <div className = "buttons buttons_size">
            <Button 
                funcExecute = {()=>HandleClickButton(1)} 
                value={1} 
                styleclass = {gameMode===1?"button buttons__button button_size-s button_active":"button buttons__button button_size-s"}
            >Easy</Button>
            <Button 
                funcExecute = {()=>HandleClickButton(2)} 
                value={2} 
                styleclass = {gameMode===2?"button buttons__button button_size-s button_active":"button buttons__button button_size-s"}
            >Medium</Button>
            <Button 
                funcExecute = {()=>HandleClickButton(3)} 
                value={3} 
                styleclass = {gameMode===3?"button buttons__button button_size-s button_active":"button buttons__button button_size-s"}
            >Hard</Button>
        </div>
    )
}