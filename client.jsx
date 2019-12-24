const React = require('react');
//import React from react
const ReactDom = require('react-dom');
//import ReactDom from react-dom
const { hot } = require('react-hot-loader/root');  // 
//import { hot } from 'react-hot-loader/root';

//const NumberBaseball = require('./NumberBaseball');
import TicTacToe from './TicTacToe';
const Hot = hot(TicTacToe);

// ReactDom.render(<WordRelay2 /> , document.querySelector('#root'));
ReactDom.render(<Hot /> , document.querySelector('#root'));