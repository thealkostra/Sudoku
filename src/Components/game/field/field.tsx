import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { deleteTile, newField, selectActiveTile, selectErrorField, selectField, selectGameMode, toDownActiveTile, toLeftActiveTile, toRightActiveTile, toUpActiveTile, updateField } from "../../../store/allSlice"
import "./field.css"
import { MemoizedTile } from "./tile/tile";
import { prepareBoard } from "./prepareboard";

export const Field = () =>{
    const field = useSelector(selectField);
    const errorField = useSelector(selectErrorField);
    const dispatch = useDispatch();
    const activeTile = useSelector(selectActiveTile);
    const level = useSelector(selectGameMode);

    const renderColumn = (row:string[], keyrow:number) =>{
        return(
            <div className="col field__col col_view">
                {row.map((tile, key)=>(
                    <MemoizedTile 
                        key={key} 
                        row={keyrow} 
                        col = {key} 
                        title={tile}
                        valid = {errorField[keyrow][key]===0?true:false}
                    />
                ))}
            </div>
        )
    }

    useEffect(()=>{
        const clearboard =  prepareBoard(level);
        dispatch(newField(clearboard));
    },[dispatch, level])


    useEffect(()=>{
        const onKeyPress=(e:any)=>{
            if(/^([1-9]\d*)$/.test(e.key)&&activeTile){
                dispatch(updateField(e.key));
            }
            if(e.key==="Delete"&&activeTile){
                dispatch(deleteTile())
            }

            if(e.key==="ArrowLeft"){
                dispatch(toLeftActiveTile());
            }
            if(e.key==="ArrowRight"){
                dispatch(toRightActiveTile());
            }
            if(e.key==="ArrowUp"){
                dispatch(toUpActiveTile());
            }
            if(e.key==="ArrowDown"){
                dispatch(toDownActiveTile());
            }
        }

        window.addEventListener("keyup", onKeyPress);
        return()=>{
            window.removeEventListener("keyup", onKeyPress)
        }
    },[dispatch, activeTile])

    return(
        <div className= "field game__field field_view">
            {field&&(field.map((row,key)=>(
                <div key={key} className="row row__field row_view">
                    {renderColumn(row, key)}
                </div>
            )))}
        </div>
    )
}