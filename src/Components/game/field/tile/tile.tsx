import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveTile, selectActiveTile, selectEtalonField } from "../../../../store/allSlice";
import { styleTile } from "./styleTile";
import "./tile.css";

interface IProps{
    title?:string,
    col: number,
    row: number,
    valid: boolean,
}

export const Tile = ({title, col, row, valid}:IProps) =>{
    const dispatch = useDispatch();
    const activeTile = useSelector(selectActiveTile);
    const etalon = useSelector(selectEtalonField);
    const [styleClass, setStyleClass] = useState("tile");

    const HandleClick = () =>{
        dispatch(changeActiveTile({x: col, y: row}))      
    }

    useEffect(()=>{
        const style = styleTile(activeTile, row, col, valid, etalon);
        setStyleClass(style);
    },[activeTile, title])

    return(
        <div 
            onClick= {HandleClick}
            className={styleClass}
        >{title}</div>
    )
}