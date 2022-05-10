import { ICoord, selectEtalonField } from "../../../../store/allSlice";

export function styleTile(activeTile:ICoord|null, row:number, col:number, valid:boolean, etalon:string[][]):string {
    const AreaRow: number = Math.floor(row/3);
    const AreaCol: number = Math.floor(col/3);
    const Area: number = AreaRow*3+AreaCol;


    //установление стиля данной плитки
    let style = "tile tile_col tile_view";
    if(activeTile?.x===col&&activeTile?.y===row)
        style += " tile_active";
    if(Area%2===0)
        style += " tile_areatwo";
    if(etalon[row][col]!=="")
        style += " tile_etalon";
    if(!valid)        
        style += " tile_error";

    return style;
}