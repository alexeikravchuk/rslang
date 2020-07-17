import React from 'react';
import './style.css';
import { withStyles } from '@material-ui/styles';
import { Fade } from '@material-ui/core';

class Puzzle {
  constructor(options) {
    this.name = options.name;
    this.cordX = options.cordX;
    this.cordY = options.cordY;
    this.sizeX = options.sizeX;
    this.sizeY = options.sizeY;
  }
}

class ownGame extends React.Component {
  componentDidMount() {
    const c = this.refs.canvas;
    const ctx = c.getContext('2d');
    ctx.textAlign = 'center';
    var my_gradient = ctx.createLinearGradient(0, 0, 0, 500);
    my_gradient.addColorStop(1, 'grey');
    my_gradient.addColorStop(0, 'white');
    var word = 'Hello';
    var memoryCoefArr;
    var wordTranslate = 'Привет';
    var dataWords;
    var capture = false;
    var listNumber = 0;
    var x;
    var y;
    var j;
    var n = 0;
    var result = [];
    var data = [];
    var arrindex;
    ctx.font = '30px Verdana';
    dataSync();
    fetch(`https://afternoon-falls-25894.herokuapp.com/words?page=${listNumber}&group=0`)
      .then((response) => response.json())
      .then((commits) => gameInitial(commits));

    function gameInitial(commits) {
      dataWords = commits;
      gameLogic(dataWords);
    }
    function dataSync() {
      if (localStorage.getItem('memoryCoef') === undefined) {
        memoryCoefArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        localStorage.setItem('memoryCoef', JSON.stringify(memoryCoefArr));

        var returnObj = JSON.parse(localStorage.getItem('memoryCoef'));
        console.log(returnObj);
      } else {
        returnObj = JSON.parse(localStorage.getItem('memoryCoef'));
        console.log(returnObj);
      }
      let memoryC = 1;

      let i = 0;
      for (i = 0; i < returnObj.length; i++) {
        if (returnObj[i] < memoryC) {
          memoryC = returnObj[i];
          listNumber = i;
        }
      }
      console.log(listNumber);
    }
    function gameLogic(dataWords) {
      word = dataWords[n].word;
      wordTranslate = dataWords[n].wordTranslate;
      gameStart();
      drow();
    }
    function state() {
      ctx.fillStyle = 'white';
      ctx.fillRect(350, 50, 200, 440);
      ctx.fillStyle = 'gray';
      ctx.strokeRect(350, 50, 200, 440);
      ctx.fillStyle = 'black';
      ctx.font = '15px Verdana';
      ctx.fillText('Learned words:', 360, 75);
      for (let i = 0; i < 20; i++) {
        ctx.fillText(dataWords[i].word, 360, 95 + i * 20);
      }
    }

    function gameStart() {
      j = 0;
      arrindex = word.split('');
      for (let i = 0; i < arrindex.length; i++) {
        data[i] = new Puzzle({
          name: arrindex[i],
          cordX: Math.random() * (800 - 0) + 0,
          cordY: Math.random() * (400 - 0) + 0,
        });
      }
    }

    function drow() {
      ctx.clearRect(0, 0, 900, 600);
      ctx.fillStyle = 'grey';
      ctx.fillRect(0, 500, 900, 200);
      for (let i = 0; i < data.length; i++) {
        ctx.fillStyle = my_gradient;
        ctx.fillRect(data[i].cordX, data[i].cordY, 100, 70);
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(data[i].name, data[i].cordX + 50, data[i].cordY + 40);
        ctx.fillText(result.join(''), 450, 550);
        ctx.fillText(n, 800, 40);
        ctx.textAlign = 'start';
        ctx.fillText(wordTranslate, 40, 40);
      }
    }

    c.onmousedown = function (e) {
      x = e.offsetX === undefined ? e.layerX : e.offsetX;
      y = e.offsetY === undefined ? e.layerY : e.offsetY;
      for (let i = 0; i < data.length; i++) {
        if (
          x < data[i].cordX + 100 &&
          x > data[i].cordX &&
          y < data[i].cordY + 70 &&
          y > data[i].cordY
        ) {
          capture = true;

          // eslint-disable-next-line no-loop-func
          c.onmousemove = function (e) {
            if (capture) {
              x = e.offsetX === undefined ? e.layerX : e.offsetX;
              y = e.offsetY === undefined ? e.layerY : e.offsetY;
              ctx.clearRect(0, 0, 900, 600);
              data[i].cordX = x - 50;
              data[i].cordY = y - 35;
              ctx.fillRect(data[i].cordX, data[i].cordY, 100, 70);
              drow(data);
            }
          };
        }
      }
      c.onmouseup = function () {
        capture = false;
        for (let i = 0; i < data.length; i++) {
          if (data[i].cordY > 500) {
            if (data[i].name === arrindex[j]) {
              result[j] = arrindex[j];
              data[i].cordX = 900;
              data[i].cordY = 0;
              j++;
              if (result.join('') === word) {
                result = [];
                if (n === 19) {
                  memoryCoefArr = JSON.parse(localStorage.getItem('memoryCoef'));
                  for (let i = 0; i < memoryCoefArr.length; i++) {
                    memoryCoefArr[i] = memoryCoefArr[i] - 0.1;
                  }
                  memoryCoefArr[listNumber] = 1;
                  localStorage.setItem('memoryCoef', JSON.stringify(memoryCoefArr));
                  return state();
                } else {
                  n++;
                  gameLogic(dataWords);
                }
              }
            } else {
              data[i].cordX = Math.random() * (800 - 0) + 0;
              data[i].cordY = Math.random() * (400 - 0) + 0;
            }
          }
        }
        drow(data);
        ctx.fillStyle = 'black';
      };
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <Fade in={true}>
        <div className={classes.paper}>
          <h1 className='title'>WORD MAKER</h1>
          <p className={classes.text}>Drag the letters to collect the word.</p>
          <canvas ref='canvas' className='canvas' width={900} height={600} />
        </div>
      </Fade>
    );
  }
}

function createStyles(theme) {
  return {
    paper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#5533ee',
      textAlign: 'center',
      textShadow: '0 2px 2px #220044',
      padding: 10,
      minHeight: '100%',
      background: 'linear-gradient(0deg, #aa55ee 0%, #aaaaff 100%)',
    },
    text: {
      opacity: '.8',
      fontWeight: 'bold',
      marginBottom: '10px',
      textShadow: '0 2px 2px #fff',
    },
  };
}

export default withStyles(createStyles)(ownGame);
