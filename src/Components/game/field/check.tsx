    // проверка дублей на поле
export function allCheck(row:number, col:number, val:string, board:string[][], etalonBoard:string[][]):boolean{
    //проверка строк
    const checkRow = (row:number, col:number, val:string):boolean =>{
        let flag:boolean = true;
        for(let i=0;i<9;i++){
            if(board[row][i]===val&&col!==i){
                flag = false;
            }
        }
        return flag;
    }
 //проверка колонок
    const checkCol = (row:number, col:number, val:string):boolean =>{
        let flag:boolean = true;
        for(let i =0;i <9; i++){
            if(board[i][col]===val&&row!==i)
                flag=false;
        }
        return flag;
    }
//проверка области
    const checkArea= (row:number, col:number, val:string):boolean => {
        let flag:boolean = true;
        const AreaRow:number = Math.floor(row/3);
        const AreaCol:number = Math.floor(col/3)
        for(let i=0; i<3; i++){
            for(let j = 0; j<3; j++){
                if(row!==i+AreaRow*3||col!==j+AreaCol*3){
                    if(board[i+AreaRow*3][j+AreaCol*3]===val){
                        flag =false;
                    }
                }
            }
        }
        return flag;
    } 
    //через && потому что все 3 варианта должны быть истиной
    if(etalonBoard[row][col]==="")
        return checkRow(row, col, val)&&checkCol(row, col, val)&&checkArea(row, col, val);
    else
        return true;
}
