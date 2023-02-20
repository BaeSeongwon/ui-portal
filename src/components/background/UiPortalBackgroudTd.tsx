import React, { useEffect, RefObject, DragEvent } from 'react';
import styled from 'styled-components';
import { PortalBackgroudTdStyle } from '../UiPortalStyleInterface';

const PortalBackgroudTd = styled.td<PortalBackgroudTdStyle>`
  width: ${({backgroudTdWidth}) => (backgroudTdWidth ? backgroudTdWidth : '70px')};
  height: ${({backgroudTdHeight}) => (backgroudTdHeight ? backgroudTdHeight : '70px')};
  border-radius: 10px;
  border: 1px solid hsla(0,0%,100%,.2);
  background-color: hsla(0,0%,68.6%,.15);
  box-sizing: border-box;
`

interface UiPortalBackgroudTdProps {
  rowKey: number,
  colKey: number,
  style?: PortalBackgroudTdStyle | null,
  backgroundTdRef: RefObject<HTMLTableCellElement>,
  onMouseHover?: Function,
  clearMouseHover?: Function,
  appendLayout: Function
}

export const UiPortalBackgroudTd = ({
  rowKey,
  colKey,
  style,
  backgroundTdRef,
  onMouseHover,
  clearMouseHover,
  appendLayout
}: UiPortalBackgroudTdProps) => {

  const handleDragOver = (event: DragEvent<HTMLTableCellElement>) => {
    event.preventDefault();
    
    if(onMouseHover) {
      onMouseHover(colKey, rowKey);
    }
  }

  const handleDragLeave = (event: DragEvent<HTMLTableCellElement>) => {
    event.preventDefault();

    if(clearMouseHover) {
      clearMouseHover();
    }
  }

  const handleDrop = (event: DragEvent<HTMLTableCellElement>) => {
    if(clearMouseHover && event) {
      const { pageX, pageY, nativeEvent, dataTransfer } = event;
      const { offsetX, offsetY } = nativeEvent;
      const targetLayoutThumbnailString = dataTransfer?.getData('text');
      
      clearMouseHover();

      if(targetLayoutThumbnailString && backgroundTdRef.current) {
        const targetLayoutThumbnail = JSON.parse(targetLayoutThumbnailString);

        appendLayout({
          startPositionPoint: {
            colKey: colKey,
            rowKey: rowKey
          },
          left: pageX - offsetX,
          top:  pageY - offsetY,
          width: getLayoutWidthAndHeight(targetLayoutThumbnail, true),
          height: getLayoutWidthAndHeight(targetLayoutThumbnail, false),
          status: 'render',
          ...targetLayoutThumbnail
        });
      }
    }
  }

  const getStyleProperty = (property: string, defaultValue: string | null) : string => {
    if(property && style && style[property]) {
      return style[property];
    } else if(defaultValue){
      return defaultValue;
    } else {
      return '';
    }
  }

  const getLayoutWidthAndHeight = (targetLayoutThumbnail, isWidth) => {
    if(backgroundTdRef.current) {
      const backgroundTdRefRect = backgroundTdRef.current.getBoundingClientRect();
      const { rowSize, colSize } = targetLayoutThumbnail;

      if(isWidth) {
        return backgroundTdRefRect.width * rowSize + (rowSize - 1) * 19;
      } else {
        return backgroundTdRefRect.height * colSize + (colSize - 1) * 19;
      }
    } else {
      return 0;
    }
  }

  return (
    <PortalBackgroudTd
      ref={backgroundTdRef}
      backgroudTdWidth={getStyleProperty('backgroudTdWidth', '')}
      backgroudTdHeight={getStyleProperty('backgroudTdHeight', '')}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    />
  )
}