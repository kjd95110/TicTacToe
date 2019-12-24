import React , { Component } from 'react';
import Ball from './Ball';

/* 
getWinNumbers() 함수는 일을 많이하는 함수 이함수가 class 내부에서 반복되면 성능에 문제가 발생함.
*/
function getWinNumbers(){
    console.log('getWinNumbes');
    
    const candy=Array(45).fill().map(function(element,index){
        return index+1;
    });

    const shuffle=[];

    while(candy.length > 0){
        var mynum=candy.splice(Math.floor(Math.random() * candy.length ),1)[0];
        shuffle.push(mynum);
    }

    const bonusNums=shuffle[shuffle.length-1];
    const winNums=shuffle.slice(0,6);
    return[...winNums,bonusNums];
}

class LottoBallExtract extends Component{
    state = {
        winNums:getWinNumbers(),
        winBalls:[],
        bonus:null,
        redo:false,      
    };


    /* 주의사항
    부모 컴포넌트가 없어지면 자식에게도 영향을 미치게되고
    특히 setTimeout 을 제거 해줘야 한다. componentWillUnmount

    */

    

    timeouts=[];


runTimerouts = () =>{

    const { winNums } = this.state;

    for(let i=0;i< this.state.winNums.length-1;i++){
        this.timeouts[i]=setTimeout(() => {
           this.setState((prevState) => {
               return{
                winBalls:[...prevState.winBalls,winNums[i]],
               }                   
           });
        }, (i+1) * 1000);
    }

    this.timeouts[6]=setTimeout(() => {
        this.setState({
            bonus:winNums[6],
            redo:true,
        });
        
    }, 7000);

}


    componentDidMount(){
        console.log('DidMount')
      this.runTimerouts();
    }

    componentWillUnmount() {
    console.log('Willunmount')
        this.timeouts.forEach( (v) => {
            clearTimeout(v);
        })        
    }

    onClickRedo = () => {


        //state초기화 해주고 setTimeout도 초기화해주고 render()도 되게 해주고
        this.setState({
            winNums:getWinNumbers(),
            winBalls:[],
            bonus:null,
            redo:false,      
        });
        this.timeouts = [];
    }

    componentDidUpdate(prevProps,prevState){
        console.log('DidUpdate')
        if(this.state.winBalls.length===0){
            this.runTimerouts();
        }

    }


    render(){
        const { winBalls,bonus,redo } = this.state;
        return (
            <>
                <span>당첨숫자</span>
                    <div id="resultwindow">{winBalls.map( (v) => <Ball key={v} number={v} ></Ball>)} </div>
                    <span>보너스</span>
                    {bonus && <Ball number={bonus}></Ball>}
                   { redo &&  <button onClick={ this.onClickRedo } > 한번더 !</button>}



            </>
        );
    }

    
}

export default LottoBallExtract;