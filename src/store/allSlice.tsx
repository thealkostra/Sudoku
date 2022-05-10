import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "./store"
import { allCheck } from "../Components/game/field/check"

export interface ICoord{
  x:number,
  y:number,
}

interface IinitialState{
    gameOn: boolean,
    gameMode: number,
    // рабочее поле 
    field: string[][],
    // эталонное поле заполненное не пользователем
    etalonfield: string[][],
    // чтобы не делать проверку при каждом рендере, делаем проверку после изменения тайла 
    // и если ошибка , то заносим ее в поле ощибок
    errorfield: number[][],
    activeTile: ICoord|null,
    victory: boolean,
    help:string,
}

const initialState:IinitialState = {
  gameOn: false,
  gameMode: 1,
  field: [],
  etalonfield: [],
  errorfield: [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]],
  activeTile: null,
  victory: false,
  help:"Control: Mouse / Arrows Up, Down, Left, Right / NumPad / Delete ",
};



export const allSlice = createSlice({
  name: 'all',
  initialState,
  reducers: {
    changeGameOn: (state, action:PayloadAction<boolean>) =>{
      state.gameOn = action.payload;
    },
    newField: (state, action:PayloadAction<string[][]>) =>{
      state.field = action.payload;
      state.etalonfield = action.payload;
    },
    restart: (state) =>{
      state.field = state.etalonfield;
    },
    clearField:(state)=>{
      state.field = [];
    },
    changeGameMode: (state, action:PayloadAction<number>) =>{
      state.gameMode = action.payload;
    },
    changeActiveTile: (state, action:PayloadAction<ICoord|null>)=>{
      if(action.payload)
        state.activeTile = {x: action.payload.x, y: action.payload.y};
      else
        state.activeTile = null;
    },
    toLeftActiveTile: (state)=>{
      if(state.activeTile){
        state.activeTile.x > 0? state.activeTile.x-- : state.activeTile.x=8;
      }
    },
    toRightActiveTile: (state)=>{
      if(state.activeTile){
        state.activeTile.x < 8? state.activeTile.x++ : state.activeTile.x=0;
      }
    },
    toUpActiveTile: (state)=>{
      if(state.activeTile){
        state.activeTile.y > 0? state.activeTile.y-- : state.activeTile.y=8;
      }
    },
    toDownActiveTile: (state)=>{
      if(state.activeTile){
        state.activeTile.y < 8? state.activeTile.y++ : state.activeTile.y=0;
      }
    },
    updateField:(state, action:PayloadAction<string>)=>{
      if(state.field&&state.etalonfield&&state.activeTile&&state.etalonfield[state.activeTile.y][state.activeTile.x]===""){
        state.field[state.activeTile.y][state.activeTile.x]=action.payload;
        //  проверяем на правильность 
         if(!allCheck(state.activeTile.y, state.activeTile.x, action.payload, state.field, state.etalonfield)){
          state.errorfield[state.activeTile.y][state.activeTile.x]=1;
        }
        else{
          state.errorfield[state.activeTile.y][state.activeTile.x]=0;
        };
        /// проверяем на полноту заполнения
        let flagVictory:boolean = true;
        state.errorfield.forEach(el => {
          if(el.includes(1))
            flagVictory = false;
        });
        state.field.forEach(el => {
          if(el.includes(""))
            flagVictory = false;
        });
        if(flagVictory)
          state.victory = true;
      }
    },
    deleteTile: (state)=>{
        if(state.field&&state.etalonfield&&state.activeTile&&state.etalonfield[state.activeTile.y][state.activeTile.x]===""){
          state.field[state.activeTile.y][state.activeTile.x]="";
          state.errorfield[state.activeTile.y][state.activeTile.x]=0;
        }
    },
    setVictory: (state, action:PayloadAction<boolean> )=>{
        state.victory = action.payload;
    },
    setHelp: (state, action:PayloadAction<string>) =>{
        state.help = action.payload;
    }
  },
});

export const {  changeGameOn, 
                changeGameMode, 
                changeActiveTile, 
                toLeftActiveTile,
                toRightActiveTile,
                toUpActiveTile,
                toDownActiveTile,
                updateField,
                deleteTile,
                newField,
                restart,
                clearField,
                setVictory,
                setHelp
              } = allSlice.actions;

export const selectGameon = (state: RootState) => state.all.gameOn;
export const selectGameMode = (state:RootState) => state.all.gameMode;
export const selectField = (state:RootState) => state.all.field;
export const selectEtalonField = (state:RootState) => state.all.etalonfield;
export const selectActiveTile = (state:RootState) =>state.all.activeTile;
export const selectErrorField = (state:RootState) =>state.all.errorfield;
export const selectVictory = (state:RootState) =>state.all.victory;
export const selectHelp = (state:RootState) => state.all.help;

export default allSlice.reducer;
