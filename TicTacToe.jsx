import React , {useEffect, useState ,useReducer, useCallback } from 'react';
import Table from './Table';
const initialState={
    winner:'',
    turn:'O',
    tableData:[
        ['','',''],
        ['','',''],
        ['','',''],],
    recentCell:[-1,-1],
};

//action의 이름은 따로 빼두는것이 좋다
export const SET_WINNER='SET_WINNER';
export const CLICK_CELL='CLICK_CELL';
export const CHANGE_TURN='CHANGE_TURN';
export const RESET_GAME='RESET_GAME';

const reducer = (state,action) => {
    switch(action.type){ //action의 이름
        case SET_WINNER:
            //state.winner = action.winner; 이렇게 직접바꾸면 안됨. 새로운객체를 만들어서 바뀔부분만 새롭게 바꿔준다.
        return {
            ...state,
            winner:action.winner,
        }
        case CLICK_CELL:
            const tableData=[...state.tableData];  //얕은 복사
            tableData[action.row] = [...tableData[action.row]]; //immer라는 라이브러리로가독성 해결.
            tableData[action.row][action.cell]=state.turn;
            return{
                ...state,
                tableData,   // 불변성을 지키면서 tableData를 바꿨다.
                recentCell:[action.row,action.cell],
            }
        case CHANGE_TURN:
            return{
                ...state,
                turn: state.turn =='O' ? 'X' : 'O',
            }
        case RESET_GAME:{
            return{
                ...state,
                turn:'O',
                tableData:[
                    ['','',''],
                    ['','',''],
                    ['','',''],],
                recentCell:[-1,-1],
            }

        }
        default:
            return state;

    }
};

const TicTacToe = () => {


const[ state, dispatch] = useReducer(reducer, initialState);
const { tableData, turn , winner ,recentCell } = state;

const onClickTable = useCallback(() => {
    dispatch({ type: SET_WINNER , winner:'O'});

},[]);

useEffect( () => {  //비동기 작동..

    const [row, cell] = recentCell;

    if(row < 0){  //초기상태에서 -1 진행할경우 리턴;
        return;
    }
    let win=false;

    if(tableData[row][0] === turn && (tableData[row][1]===turn) && tableData[row][2] ===turn){
        win=true;
    }
    if(tableData[0][cell] === turn && (tableData[1][cell]===turn) && tableData[2][cell] ===turn){
        win=true;
    }
    if(tableData[0][0] === turn && (tableData[1][1]===turn) && tableData[2][2] ===turn){
        win=true;
    }
    if(tableData[0][2] === turn && (tableData[1][1]===turn) && tableData[2][0] ===turn){
        win=true;
    }

    console.log(win,row,cell,tableData,turn);

    if(win){
        dispatch({ type:SET_WINNER, winner:turn});
        dispatch({type:RESET_GAME});
    }else{
        //무승부검사
        let all  = true; //무승부

        tableData.forEach((row) => { 
            row.forEach((cell) => {
                if(!cell){
                    all = false;  //무승부가 아님
                }
            });
        });

        if(all){
            dispatch({ type: RESET_GAME });//action을 1개 만듦
        }else{
            dispatch({ type: CHANGE_TURN });//action을 1개 만듦
        }        
    }   
},[recentCell]);

return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
    </>
  )
};

export default TicTacToe;


/* 리액트의 특징

기존 state를 직접 바꾸는게 아니라 새로운 state를 만들어서
바뀌는 부분만 바꿔주는것. 불변성이있다.


state를 바꾸고자 한다면 event 가 발생할때 action을 dispact해서 state를 바꾸게 되는데
이때 reducer에 어떻게 바꿀건지를 기록해둔다......

react의 좋은점:
state만 바꾸면 알아서 render() 되기때문에 그점이 좋다.
javascript에서는 화면에 그리는 부분, 데이터부분 따로따로 처리해줘야했었다.


불변성을 유지한다라는거

const a={b:1,c:2}

const b=a;
a===b; // result is true

이렇게되면 불변성을 유지하는게아님
a <> b 불변성을 유지하는것임.



const c={...a}; //얕은 복사
c={b:1,c:2};

c===a ? //false

불변성을 유지하면서 값을 전달할수 있음.


*/