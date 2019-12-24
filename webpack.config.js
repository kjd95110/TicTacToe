const path = require('path'); //import 로 바꾸면 에러발생 NODE가 관리-> import지원안함.

module.exports = {
    name: 'tic-tac-toe-setting',
    mode: 'development', //실서비스: production
    devtool: 'eval',
    resolve:{
       extensions: ['.js','.jsx']
    },
    entry:{         
         app:['./client.jsx'], 
         //app:['./WordRelay2.jsx'], 
        // client.jsx에서 WordRelay.jsx를 호출하므로 WordRelay.jsx생략가능하고 resolve에서 확장자 지정해주므로 확장자 생략가능함.

    },
    module:{
        rules:[{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options:{
                presets:[
                    [
                        '@babel/preset-env',
                        {
                            targets:{
                                browsers:['> 5% in KR','last 2 chrome versions'],
                            },
                            debug: true,

                        },
                    ],
                    '@babel/preset-react'], //IE 지원

                plugins:['@babel/plugin-proposal-class-properties','react-hot-loader/babel']
            },
        }],
    },
    output:{
        path: path.join(__dirname,'dist'),  //현재폴더 __dirname 안에 dist가 된다.
        filename: 'app.js',
        publicPath: '/dist/',               //가상의 경로 Node에서 express.static((__dirname,'dist'))  비슷함.
    }
};


/* 

entry and output 이 가장 중요

webpack 커맨드라인에서 실행안될때 2가지방법있음
package.json파일에
1.scripts:{
    "dev":"webpack"
}

c:\>npm run dev

2.제어판 시스템 들어가서 환경변수 path 에 지정

3.c:\>npx webpack

*/