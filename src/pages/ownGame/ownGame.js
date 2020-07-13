import React from 'react';
import "./style.css"
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';



class Puzzle{
    constructor(options){
        this.name = options.name;
        this.cordX = options.cordX;
        this.cordY = options.cordY;
        this.sizeX = options.sizeX;
        this.sizeY = options.sizeY;
    }
    
}

class ownGame extends React.Component {
  componentDidMount() {    
const c = this.refs.canvas
const ctx = c.getContext("2d");
ctx.textAlign = "center";
var my_gradient = ctx.createLinearGradient(0, 0, 0, 500);
my_gradient.addColorStop(1, "grey");
my_gradient.addColorStop(0, "white");
var word = 'Hello'
var capture=false;
var x;
var y;
var j;
var result = [];
var data = [];
var arrindex;
var count = 0;
ctx.font = "30px Verdana";

fetch('https://afternoon-falls-25894.herokuapp.com/words?page=1&group=0')
    .then(response => response.json())
    .then(commits => gameLogic(commits));

function gameLogic(commits){
    // var obj = {
    //     item1: 1,
    //     item2: [123, "two", 3.0],
    //     item3:"hello"
    // };
    
    // var serialObj = JSON.stringify(obj); 
    
    // localStorage.setItem("myKey", serialObj); 
    
    // var returnObj = JSON.parse(localStorage.getItem("myKey")) 
    // console.log(returnObj)
    word = commits[0].word;
    gameStart()
    drow()
}


function gameStart(){
    j = 0;
arrindex = word.split('')
for(let i=0; i<arrindex.length; i++){
    data[i] = new Puzzle({
        name: arrindex[i],
        cordX: Math.random() * (800 - 0) + 0,
        cordY: Math.random() * (400 - 0) + 0
    })
}
}


function drow(){
    ctx.clearRect(0, 0, 900, 600);
    ctx.fillStyle = "grey";
    ctx.fillRect(0, 500, 900, 200);
    for(let i=0; i<data.length; i++){

       
        ctx.fillStyle = my_gradient;
        ctx.fillRect(data[i].cordX, data[i].cordY, 100, 70);
        ctx.fillStyle = "black";
        ctx.fillText(data[i].name, data[i].cordX+50, data[i].cordY+40);
        ctx.fillText(result.join(''), 450, 550);
        ctx.fillText(count, 800, 40);
        
    }
}

c.onmousedown = function(e){
    
    x = e.offsetX===undefined?e.layerX:e.offsetX;
    y = e.offsetY===undefined?e.layerY:e.offsetY;
    for(let i = 0; i<data.length; i++){
        if(x < data[i].cordX+100 && x > data[i].cordX && y < data[i].cordY+70 && y > data[i].cordY){
        capture = true;

        // eslint-disable-next-line no-loop-func
        c.onmousemove = function(e) {
            if (capture){
                x = e.offsetX===undefined?e.layerX:e.offsetX;
                y = e.offsetY===undefined?e.layerY:e.offsetY;
                ctx.clearRect(0, 0, 900, 600);
                data[i].cordX = x - 50;
                data[i].cordY = y - 35;
                ctx.fillRect(data[i].cordX, data[i].cordY, 100, 70);
                drow(data)
                }
            }
        }
    }
    c.onmouseup = function(){
        capture = false;
        for(let i = 0; i<data.length; i++){
            if (data[i].cordY>500){
                if(data[i].name === arrindex[j]){
                result[j] = arrindex[j];
                data[i].cordX = 900;
                data[i].cordY = 0;
                j++;
                if (result.join('') === word){
                    result = []
                    gameLogic()
                    count++
                }
                } else {
                     
                        data[i].cordX = Math.random() * (800 - 0) + 0;
                        data[i].cordY = Math.random() * (400 - 0) + 0;
                    }
            }
            }
            drow(data)
            ctx.fillStyle = "black";
            
            
        }
}

    
   
  }
  render() {
    return(
      <div>
        <canvas ref="canvas" className='canvas'  width={900} height={600} />
        {/* <img ref="image" src={cheese} className="hidden" /> */}
      </div>
    )
  }
}
export default ownGame
// function ownGame() {
//     return (
//       <canvas id='canvas' width='900px' height='600px'></canvas>
//     );
//   }

// function ownGame(){
// const c = document.getElementById("canvas");
// const ctx = c.getContext("2d");
// ctx.textAlign = "center";
// var my_gradient = ctx.createLinearGradient(0, 0, 0, 500);
// my_gradient.addColorStop(1, "grey");
// my_gradient.addColorStop(0, "white");
// const word = 'Hello'
// var capture=false;
// var x;
// var y;
// var j;
// var result = [];
// var data = [];
// var arrindex;
// var count = 0;
// ctx.font = "30px Verdana";
// gameLogic()
// function gameLogic(){
//     gameStart()
//     drow()
// }


// function gameStart(){
//     j = 0;
// arrindex = word.split('')
// for(let i=0; i<arrindex.length; i++){
//     data[i] = new Puzzle({
//         name: arrindex[i],
//         cordX: Math.random() * (800 - 0) + 0,
//         cordY: Math.random() * (400 - 0) + 0
//     })
// }
// }


// function drow(){
//     ctx.clearRect(0, 0, 900, 600);
//     ctx.fillStyle = "grey";
//     ctx.fillRect(0, 500, 900, 200);
//     for(let i=0; i<data.length; i++){

       
//         ctx.fillStyle = my_gradient;
//         ctx.fillRect(data[i].cordX, data[i].cordY, 100, 70);
//         ctx.fillStyle = "black";
//         ctx.fillText(data[i].name, data[i].cordX+50, data[i].cordY+40);
//         ctx.fillText(result.join(''), 450, 550);
//         ctx.fillText(count, 800, 40);
        
//     }
// }

// c.onmousedown = function(e){
    
//     x = e.offsetX===undefined?e.layerX:e.offsetX;
//     y = e.offsetY===undefined?e.layerY:e.offsetY;
//     for(let i = 0; i<data.length; i++){
//         if(x < data[i].cordX+100 && x > data[i].cordX && y < data[i].cordY+70 && y > data[i].cordY){
//         capture = true;

//         // eslint-disable-next-line no-loop-func
//         c.onmousemove = function(e) {
//             if (capture){
//                 x = e.offsetX===undefined?e.layerX:e.offsetX;
//                 y = e.offsetY===undefined?e.layerY:e.offsetY;
//                 ctx.clearRect(0, 0, 900, 600);
//                 data[i].cordX = x - 50;
//                 data[i].cordY = y - 35;
//                 ctx.fillRect(data[i].cordX, data[i].cordY, 100, 70);
//                 drow(data)
//                 }
//             }
//         }
//     }
//     c.onmouseup = function(){
//         capture = false;
//         for(let i = 0; i<data.length; i++){
//             if (data[i].cordY>500){
//                 if(data[i].name === arrindex[j]){
//                 result[j] = arrindex[j];
//                 data[i].cordX = 900;
//                 data[i].cordY = 0;
//                 j++;
//                 if (result.join('') === word){
//                     result = []
//                     gameLogic()
//                     count++
//                 }
//                 } else {
                     
//                         data[i].cordX = Math.random() * (800 - 0) + 0;
//                         data[i].cordY = Math.random() * (400 - 0) + 0;
//                     }
//             }
//             }
//             drow(data)
//             ctx.fillStyle = "black";
            
            
//         }
// }


// }

// export default ownGame;