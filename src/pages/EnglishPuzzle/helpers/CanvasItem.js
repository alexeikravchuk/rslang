import React, { Component } from 'react';
import { PuzzleContext } from '../components/context';

class CanvasItem extends Component {
  canvasRef = React.createRef();

  componentDidMount() {
    const {
      dataWord: word,
      canvasItem,
      wordCount,
      widthCount,
      canvasWidth,
      canvasHeight,
      img,
      startYPointCropImage,
    } = this.props;

    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');

    const x1 = 0;
    const y1 = Math.round(canvasHeight / 3);
    const y2 = Math.round((canvasHeight / 3) * 2);
    const centerY = canvasHeight / 2;
    const radius = Math.round(canvasHeight / 3 / 2);
    const startXPointCropImage = widthCount - canvasWidth;
    const fontSize = Math.round(canvasHeight / 4);

    ctx.canvas.width = canvasWidth + radius;
    ctx.canvas.height = canvasHeight;

    ctx.beginPath();

    if (canvasItem - 1) {
      ctx.arc(x1, centerY, radius, Math.PI / 2, Math.PI * 1.5, true);
    }

    ctx.lineTo(0, y1);
    ctx.lineTo(0, 0);
    ctx.lineTo(canvasWidth, 0);
    ctx.lineTo(canvasWidth, y1);

    if (canvasItem !== wordCount) {
      ctx.arc(canvasWidth, centerY, radius, Math.PI * 1.5, Math.PI / 2, false);
    }

    ctx.lineTo(canvasWidth, y2);
    ctx.lineTo(canvasWidth, canvasHeight);
    ctx.lineTo(0, canvasHeight);
    ctx.lineTo(0, y2);

    if (!(canvasItem - 1)) {
      ctx.lineTo(0, y1);
    }

    ctx.clip();

    ctx.drawImage(
      img,
      startXPointCropImage,
      startYPointCropImage,
      canvasWidth + radius,
      canvasHeight,
      0,
      0,
      canvasWidth + radius,
      canvasHeight
    );

    ctx.shadowColor = 'rgb(255,255,250)';
    ctx.strokeStyle = 'rgb(0,255,250)';
    ctx.shadowBlur = 2;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.globalCompositeOperation = 'destination-in';
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'magenta';
    ctx.font = `${'bold'} ${fontSize * 1}pt ${'Arial'}`;
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx['fillText'](word, canvasWidth / 2 + radius / 2, canvasHeight / 2 + fontSize / 3);
  }

  render() {
    const { canvasRow, canvasItem, dataItem, dataWord } = this.props;
    return (
      <PuzzleContext.Consumer>
        {({ onDragStart, draggablePuzzle }) => (
          <canvas
            ref={this.canvasRef}
            className={`canvas-item canvas-row-${canvasRow} canvas-item-${canvasItem}${
              dataItem === draggablePuzzle ? ' dragged' : ''
            }`}
            data-item={dataItem}
            data-word={dataWord}
            onDragStart={(event) => onDragStart(event, dataItem)}
            draggable
          />
        )}
      </PuzzleContext.Consumer>
    );
  }
}

export default CanvasItem;
