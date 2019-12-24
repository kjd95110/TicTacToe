import React ,{ memo } from 'react';
// import React { PureCompont }  from 'react';


/* 

Hooks 란 useState,useEffect를 사용해서  코딩하는것을 말한다

단순히 함수컴포넌트를 의미하는것이 아님을 아시라~


PureComponent처럼 쓰려면 memo() 감싸준다.

*/

const Ball = memo(({ number }) => {            
    let background;
    
    if(number <=10){
        background='red';
    }else if(number <=20){
        background='orange';
    }else if(number <=30){
        background='yellow';
    }else if(number <=40){
        background='blue';
    }else if(number <=45){
        background='green';
    }        
    
    return (
        <div className="ball" style={{ background}} > {number}</div>
    );
});



// const Ball = ({ number }) => {            
//         let background;
        
//         if(number <=10){
//             background='red';
//         }else if(number <=20){
//             background='orange';
//         }else if(number <=30){
//             background='yellow';
//         }else if(number <=40){
//             background='blue';
//         }else if(number <=45){
//             background='green';
//         }        
        
//         return (
//             <div className="ball" style={{ background}} > {number}</div>
//         );
// };


// class Ball extends PureComponent{
//     render(){
//         const { } = this.props;
//         let background;
//         if(number <=10){
//             background='red';
//         }else if(number <=20){
//             background='orange';
//         }else if(number <=30){
//             background='yellow';
//         }else if(number <=40){
//             background='blue';
//         }else if(number <=45){
//             background=green';
//         }
//     }

// }



export default Ball;