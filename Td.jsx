import React ,{ useCallback } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td= ({rowIndex, cellIndex,dispatch ,cellData}) => {
    const onClickTd = useCallback( () => {
        console.log(rowIndex,cellIndex);

        if(cellData){ //이미 cellData에 데이터가 있다면.
            return;
        }

        dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex}); //action을 1개 만듦 이름은 임의로 정하되 reducer에서 여기에서 정의한 녀석들을  잘 처리해줘야한다.
        

       // console.log(state.turn);//  결과는 CHANGE_TURN 이 바뀌기전의 값이 찍힌다. 비동기방식으로 작동되기 때문에. 이럴때는 useEffect를 쓴다.
        //비동기

    }, [cellData]);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    )


};


export default Td;


/* 
dispactch에서 state바꾸는 방식이 비동기 방식이다.
리덕스는 동기식(순차식)으로 처리하는데 useReducer 는 비동기적으로 바뀐다.


*/