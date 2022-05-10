import { useSelector } from "react-redux"
import { selectVictory } from "../../store/allSlice"
import { Field } from "./field/field"
import "./game.css"
import { Help } from "./help/help"
import { Menu } from "./menu/menu"
import { Victory } from "./victory"
export const Game = () =>{
    const victory = useSelector(selectVictory);
    return(
        <>
            <div className="game">
                <Field/>
                {victory&&(<Victory/>)}
                <Menu/>
            </div>
            <Help/>
        </>
    )
}