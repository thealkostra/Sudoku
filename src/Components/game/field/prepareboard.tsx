
export function prepareBoard(level:number):string[][]{
    const numlevel = 5-level;
    const mapField: string[][] = [
        ["1","2","3","4","5","6","7","8","9"],
        ["4","5","6","7","8","9","1","2","3"],
        ["7","8","9","1","2","3","4","5","6"],
        ["2","3","4","5","6","7","8","9","1"],
        ["5","6","7","8","9","1","2","3","4"],
        ["8","9","1","2","3","4","5","6","7"],
        ["3","4","5","6","7","8","9","1","2"],
        ["6","7","8","9","1","2","3","4","5"],
        ["9","1","2","3","4","5","6","7","8"]
    ]
    const clearboard:string[][] = [
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""],
        ["","","","","","","","",""]
    ];

    // перемешиваем матрицу 
    // перестановка строк
    const swapRow = (n:number, m:number) =>{
        let s = mapField[n];
        mapField[n] = mapField[m];
        mapField[m] = s;
    }
    // перестановка столбцов    
    const swapCol=(n:number, m:number)=>{
        for(let i = 0;i < 9; i++){
            let s = mapField[i][n];
            mapField[i][n] = mapField[i][m];
            mapField[i][m] = s;
        }
    }
    //перестановка области строк        
    const swapRowArea=(n:number, m:number)=>{
        for(let i=0; i < 3; i++){
            swapRow(n*3+i, m*3+i);
        }
    }
    //перестановка области столбцов        
    const swapColArea=(n:number, m:number)=>{
        for(let i=0; i < 3; i++){
            swapCol(n*3+i, m*3+i);
        }
    }
    //перемешивание поля 
    const unSort = (r:number = Math.floor(Math.random()*4))=>{
            // j - номер области строк или столбцов
        let j:number = Math.floor(Math.random()*3)*3;
        let n:number  = Math.floor(Math.random()*3);
        let m:number = Math.floor(Math.random()*3);
        while(n===m){
            m = Math.floor(Math.random()*3);
        }

        switch(r){
            case 0:
                n +=j;
                m +=j;
                swapRow(n, m);
                break;
            case 1:
                n +=j;
                m +=j;
                swapCol(n, m);
                break;
            case 2:
                swapRowArea(n, m);
                break;
            case 3:
                swapColArea(n, m);
                break;
            default:
        }
    }
    // перемещиваем матрицу сначала указывая как мешать , потом рандом
    for(let i = 0; i <50;i++)
        unSort(i%4);
    for(let i = 0; i <100;i++)
        unSort();

    //перенос чисел по строкам в чистую табличку
    const clearRow = ()=>{
        for(let i=0; i<9; i++){
            for(let j = 0;j<numlevel;j++){
                    const m = Math.round(Math.random()*8)
                clearboard[i][m] = mapField[i][m];
            }
        }
    }
    // перенос чисел по столбцам в чистую табличку        
    const clearCol = ()=>{
        for(let i=0; i<9; i++){
            for(let j = 0;j<numlevel;j++){
                    const m = Math.round(Math.random()*8)
                clearboard[m][i] = mapField[m][i];
            }
        }
    }

    // перенос в чистую табличку
    const clearBoard = ()=>{
        clearCol();
        clearRow();
    }
    clearBoard();

    return clearboard;
}