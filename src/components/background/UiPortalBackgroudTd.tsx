import React, { useEffect, RefObject } from 'react';
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
  clearMouseHover?: Function
}

export const UiPortalBackgroudTd = ({
  rowKey,
  colKey,
  style,
  backgroundTdRef,
  onMouseHover,
  clearMouseHover
}: UiPortalBackgroudTdProps) => {
  useEffect(() => {
    if(backgroundTdRef && backgroundTdRef.current) {
      backgroundTdRef.current.addEventListener('dragover', (event: DragEvent) => {
        event.preventDefault();
        if(onMouseHover) {
          onMouseHover(colKey, rowKey);
        }
      });

      backgroundTdRef.current.addEventListener('drop', () => {
        if(clearMouseHover) {
          clearMouseHover();
        }
      });
    }
  }, [backgroundTdRef])

  const getStyleProperty = (property: string, defaultValue: string | null) : string => {
    if(property && style && style[property]) {
      return style[property];
    } else if(defaultValue){
      return defaultValue;
    } else {
      return '';
    }
  }

  return (
    <PortalBackgroudTd
      ref={backgroundTdRef}
      backgroudTdWidth={getStyleProperty('backgroudTdWidth', '')}
      backgroudTdHeight={getStyleProperty('backgroudTdHeight', '')}
    />
  )
}