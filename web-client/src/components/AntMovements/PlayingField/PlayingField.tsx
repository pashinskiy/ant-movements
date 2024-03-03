import { useCallback, useEffect, useRef, useMemo, useState } from "react";

import Styles from './PlayingField.module.scss';

interface IProps {
  croppedField: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  };
  cells: Array<(1 | null)[] | null>;
  onAfterRender: () => void;
}

export const PlayingField = (props: IProps) => {
  const {
    croppedField,
    cells,
    onAfterRender,
  } = props;

  const canvasContainerRef = useRef(null);
  const onRenderCanvasTimeout = useRef<ReturnType<typeof setTimeout>|null>(null);
  
  const onRenderCanvas = useCallback(async () => {
    if (!canvasContainerRef.current) {
      return;
    }

    const width = croppedField.maxX - croppedField.minX + 1;
    const height = croppedField.maxY - croppedField.minY + 1;
    
    const canvasEl = document.createElement('canvas');
    canvasEl.width = width;
    canvasEl.height = height;

    const ctx = canvasEl.getContext('2d');

    if (!ctx) {
      return;
    }

    const imageData = ctx.createImageData(width, height);

    const validColor = [44, 104, 250, 255]
    const invalidColor = [42, 46, 48, 255]

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const realX = x + croppedField.minX;
        const realY = y + croppedField.minY;

        const color = cells[realY]?.[realX] ? validColor : invalidColor;
        const startIndex = (y * width + x) * 4;

        color.forEach((val, idx) => imageData.data[startIndex + idx] = val);
      }
    }     

    await ctx.putImageData(imageData, 0, 0);

    (canvasContainerRef.current as HTMLDivElement).replaceChildren(canvasEl);
    onAfterRender();
  }, [
    cells,
    croppedField,
    onAfterRender,
  ])

  useEffect(() => {
    if (!cells) {
      return
    }

    if (onRenderCanvasTimeout.current) {
      clearTimeout(onRenderCanvasTimeout.current);
    }

    onRenderCanvasTimeout.current = setTimeout(onRenderCanvas, 0);
  }, [onRenderCanvas]);  

  return (
    <div>
      <div className={Styles.coordinate}>
        <span>{`(x: ${croppedField.minX}, y: ${croppedField.maxY})`}</span>
        <span>{`(x: ${croppedField.maxX}, y: ${croppedField.maxX})`}</span>
      </div>

      <div ref={canvasContainerRef} className={Styles.canvasContainer} />

      <div className={Styles.coordinate}>
        <span>{`(x: ${croppedField.minX}, y: ${croppedField.minY})`}</span>
        <span>{`(x: ${croppedField.maxX}, y: ${croppedField.minY})`}</span>
      </div>
    </div>
  )
}
