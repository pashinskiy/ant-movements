import { useCallback, useEffect, useRef } from "react";

import Styles from './PlayingField.module.scss';

interface IProps {
  width: number;
  height: number;
  cells: Array<(1 | null)[] | null>;
  onAfterRender: () => void;
}

export const PlayingField = (props: IProps) => {
  const {
    width,
    height,
    cells,
    onAfterRender,
  } = props;

  const canvasContainerRef = useRef(null);
  
  const onRenderCanvas = useCallback(async () => {
    if (!canvasContainerRef.current) {
      return;
    }

    const minWidth = (canvasContainerRef.current as HTMLDivElement).offsetWidth;
    const minHeight = (canvasContainerRef.current as HTMLDivElement).offsetHeight;

    const validWidth = Math.max(minWidth, width);
    const validHeight = Math.max(minHeight, height);
    
    const canvasEl = document.createElement('canvas');
    canvasEl.width = validWidth;
    canvasEl.height = validHeight;

    const ctx = canvasEl.getContext('2d');

    if (!ctx) {
      return;
    }

    const imageData = ctx.createImageData(validWidth, validHeight);

    const validColor = [44, 104, 250, 255]
    const invalidColor = [42, 46, 48, 255]

    for (let y = 0; y < validHeight; y++) {
      for (let x = 0; x < validWidth; x++) {
        const color = cells[y]?.[x] ? validColor : invalidColor;
        const startIndex = (y * validWidth + x) * 4;

        color.forEach((val, idx) => imageData.data[startIndex + idx] = val);
      }
    }     

    await ctx.putImageData(imageData, 0, 0);

    (canvasContainerRef.current as HTMLDivElement).replaceChildren(canvasEl);
    onAfterRender();
  }, [onAfterRender])

  useEffect(() => {
    if (!width || !height || !cells) {
      return
    }

    setTimeout(onRenderCanvas, 0)
  }, [width, height, cells]);

  return (
    <div ref={canvasContainerRef} className={Styles.container} />
  )
}
