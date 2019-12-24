import React , { Component } from 'react';


const rspCoods = {
    rock:'0',
    scissor:'-107px',
    paper:'-230px',
}

const scores={
    scissor:1,
    rock:0,
    paper:-1,
}

const computerChoice = (imgCoord) => {
 return Object.entries(rspCoods).find(function(v){
    return v[1] === imgCoord;
 })[0];
};

// 0  -107px , -230px
class RockPaper extends Component{
state = {
    result:'',
    imgCoord: rspCoods.rock,
    score:0,
};

/* 리액트 라이프사이클...
클래스의경우-> constructor -> render -> ref -> componentDidMount -> setState / props 바뀔때 ->  shouldComponentUpdate ->
  렌더링 render() -> componentDidUpdate  -> 부모가 자식을 없앴을때-> componentWillUnmount -> 소멸


  클래스의경우 componentDidMount나 componentDidUpdate에서 모든 state를 조건문으로 분기처리합니다.
*/

interval;
componentDidMount(){// render() 성공적으로 로딩되었다면....re rendering될때는 실행되지않는다.
    // 비동기 요청을 할때 많이 사용한다.
    //setState를 어디다 써야될지 모르겠다할때 응용가능한 메소드이므로 잘활용해본다.

    /*
    클로저
    비동기함수안에서 외부의 변수를참조하면 발생할수 있다.
    interval; 외부로 빼준다.    
    */

    this.interval= setInterval( this.changeHand , 500);
   
    // this.interval = setInterval( () => {
    //     const { imgCoord } = this.state;
    //     console.log('imgCoord:'+ imgCoord);
    //     if(imgCoord === rspCoods.rock){
    //         this.setState({
    //             imgCoord:rspCoods.scissor,

    //         });
    //     }else if(imgCoord===rspCoods.scissor) {
    //         console.log('here');
    //         this.setState({
    //             imgCoord:rspCoods.paper,

    //         });

    //     }else if(imgCoord===rspCoods.paper){

    //         this.setState({
    //             imgCoord:rspCoods.rock,

    //         });            
    //     }
    // },500);

}

//re 렌더링 후에 실행된다.
componentDidUpdate(){

}

//Component가 제거되기직전....실행.
componentWillUnmount(){
     // 비동기 요청정리 할때 많이 사용한다.
     /* 
     취소안해주면 계속 내부적으로 돌아가는 함수가 있음.
     setInterval( () => {
            console.log('test');
     },1000);

     */
     clearInterval(this.interval);

};

changeHand = () => {
    const { imgCoord } = this.state;
    console.log('imgCoord:'+ imgCoord);
    if(imgCoord === rspCoods.rock){
        this.setState({
            imgCoord:rspCoods.scissor,
        });
    }else if(imgCoord===rspCoods.scissor) {
        console.log('here');
        this.setState({
            imgCoord:rspCoods.paper,
        });
    }else if(imgCoord===rspCoods.paper){
        this.setState({
            imgCoord:rspCoods.rock,
        });            
    }
};

onClickBtn = (choice) => {

    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if(diff===0){
        this.setState({        
            result:'비겼습니다.',
        });
    }else if([-1,2].includes(diff)){
        this.setState((prevState) => {   
            return{
                result:'이겼습니다.',
                score:prevState.score + 1,
            };
            
        });
    }else{
        this.setState((prevState) => {   
            return{
                result:'졌습니다.',
                score:prevState.score - 1,
            };
            
        });

    }
    setTimeout(() => {
        this.interval= setInterval( this.changeHand , 500);    
    }, 2000);
    

};

    render(){
        const { result, score, imgCoord} = this.state;
        return(
            <>
            <div>
                <div id="computer" style={{ background: `url('./game.jpg') ${imgCoord} 0`}}></div>
                <button id="rock" className="btn" onClick={() => this.onClickBtn('rock')}>바위</button>
                <button id="scissor"  className="btn" onClick={() => this.onClickBtn('scissor')}>가위</button>
                <button id="paper" className="btn"  onClick={() => this.onClickBtn('paper')}>보</button>
                <div>{result}</div><div>현재{score}</div>
            </div>

            </>

        );
    }
}

export default RockPaper;

/*
메소드안에 함수호출 () => function call

onClick={() => this.onClickBtn('rock')
onClickBtn = (choice) => {

    이부분을 
    
    onClickBtn = (choice) => () =>  {
    onClick={ this.onClickBtn('rock')    
    이렇게 바꿀수 있습니다.
*/