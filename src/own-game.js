class Puzzle{
    constructor(options){
        this.name = options.name;
        this.cordX = options.cordX;
        this.cordY = options.cordY;
        this.sizeX = options.sizeX;
        this.sizeY = options.sizeY;
    }
    
}

function game(){
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");
const word = 'Hello World'
var capture=false;
var x;
var y;
var j = 0;
var result = [];
var data = [];
ctx.font = "30px Verdana";





var arrindex = word.split('')
console.log(arrindex)
for(let i=0; i<arrindex.length; i++){
    data[i] = new Puzzle({
        name: arrindex[i],
        cordX: Math.random() * (800 - 0) + 0,
        cordY: Math.random() * (400 - 0) + 0
    })
}

drow(data)

function drow(data){
    ctx.clearRect(0, 0, 900, 600);
    ctx.fillStyle = "green";
    ctx.fillRect(0, 500, 900, 200);
    for(let i=0; i<data.length; i++){

       
        ctx.fillStyle = "white";
        ctx.fillRect(data[i].cordX, data[i].cordY, 100, 70);
        ctx.fillStyle = "black";
        ctx.fillText(data[i].name, data[i].cordX+45, data[i].cordY+30);
        ctx.fillText(result.join(''), 100, 100);
        
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
                } else {
                     
                        data[i].cordX = Math.random() * (800 - 0) + 0;
                        data[i].cordY = Math.random() * (400 - 0) + 0;
                    }
            }
            }
            drow(data)
            ctx.fillStyle = "black";
            ctx.fillText(result.join(''), 100, 100);
        }
}


}

export default game;