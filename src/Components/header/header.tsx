import { useSelector } from "react-redux";
import { selectGameon } from "../../store/allSlice";
import "./header.css";

export const Header = () =>{
    const gameOn = useSelector(selectGameon);

    return(
        <div className={gameOn?"header gameheader":"header"}>
            SUDOKU
        </div>
        )
}