import React, { useState, RefObject } from 'react';

interface FocusThumbnailType {
  id: string,
  colSize: number,
  rowSize: number
}

export const UiPortalHook = () => {
  const [ layouts, setLayouts ] = useState<Array<any>>([]);
  let maxRowSize: number = 0;
  let maxColSize: number = 0;
  let cellRefArray: RefObject<HTMLTableCellElement>[] | null = null;
  let focusThumbnail: FocusThumbnailType | null = null;
  let mouseHoverStyleClass: string | null = null;
  let hoverdCellList: RefObject<HTMLTableCellElement>[] = [];
  let batchedLayerPosition: Array<any> = [];
  let batchedLayerPositionMap: Map<string, string> | null = null;

  const initCellRefArray = (backgroundCellRefArray: RefObject<HTMLTableCellElement>[]) => {
    cellRefArray = backgroundCellRefArray;
  }

  const setBackgroundSize = (rowSize: number, colSize: number) => {
    maxColSize = colSize;
    maxRowSize = rowSize;
  }

  const setFocusThumbnail = (thumbnail: FocusThumbnailType) => {
    focusThumbnail = thumbnail;
  }

  const setMouseHoverStyleClass = (className: string) => {
    mouseHoverStyleClass = className;
  }

  const onMouseHover = (colKey:number, rowKey:number) => {
    clearMouseHover();
    
    if(cellRefArray && !Number.isNaN(colKey) && !Number.isNaN(rowKey)) {
      if(focusThumbnail) {
        const { rowSize, colSize } = focusThumbnail;
        for(let i = 0; i < rowSize; i ++) {
          const rowIndex = i + rowKey;

          for(let a = 0; a < colSize; a++) {
            const colIndex = a + colKey;

            if(!cellRefArray[colIndex] || !cellRefArray[colIndex][rowIndex]) {
              hoverdCellList = [];
            } else {
              hoverdCellList.push(cellRefArray[colIndex][rowIndex]);
            }
          }
        }

        if(isOverlabPosition(focusThumbnail, colKey, rowKey)) {
          hoverdCellList = [];
        }
        
        hoverdCellList.forEach((cell: RefObject<HTMLTableCellElement>) => {
          if(cell && cell.current && mouseHoverStyleClass) {
            cell.current.classList.add(mouseHoverStyleClass);
          }
        })
      }
    }
  }

  const clearMouseHover = () => {
    if(hoverdCellList?.length > 0) {
      hoverdCellList.forEach((ref: RefObject<HTMLTableCellElement>) => {
        if(ref && mouseHoverStyleClass) {
          ref.current?.classList.remove(mouseHoverStyleClass);
        }
      });

      hoverdCellList = [];
    }
  }

  const isOverlabPosition = (focusThumbnail: FocusThumbnailType, colKey: number, rowKey: number) => {
    if(focusThumbnail && batchedLayerPosition.length > 0) {
      const { colSize, rowSize } = focusThumbnail;
      const targetColEndPoint = colKey + colSize - 1;
      const targetRowEndPoint = rowKey + rowSize - 1;

      if(targetColEndPoint > maxColSize || targetRowEndPoint > maxRowSize) {
        return true;
      }

      if(batchedLayerPositionMap) {
        for(let rowIndex = rowKey; rowIndex < (rowKey + rowSize); rowIndex ++) {
          for(let colIndex = colKey; colIndex < (colKey + colSize); colIndex ++) {
            if(batchedLayerPositionMap.get(`${colIndex},${rowIndex}`)) {
              return true;
            }
          }
        }
      }

      return false;
    } else {
      return false;
    }
  }

  const appendLayout = (layoutObject: any) => {
    if(layoutObject && layoutObject.startPositionPoint && focusThumbnail) {
      const { colKey, rowKey } = layoutObject.startPositionPoint;
      
      if(!isOverlabPosition(focusThumbnail, colKey, rowKey)) {
        if(!batchedLayerPositionMap) {
          batchedLayerPositionMap = new Map();
        }

        for(let rowIndex = rowKey; rowIndex < (rowKey + layoutObject.rowSize); rowIndex++) {
          for(let colIndex = colKey; colIndex < (colKey + layoutObject.colSize); colIndex++) {
            const position: string = `${colIndex},${rowIndex}`;
            batchedLayerPositionMap.set(position, '1');
          }
        }

        batchedLayerPosition.push({
          colKey: colKey,
          rowKey: rowKey,
          colSize: layoutObject.colSize,
          rowSize: layoutObject.rowSize
        });
        setLayouts((prevLayout) => prevLayout.concat([layoutObject]));
      }
    }
  }
  
  return {
    layouts,
    initCellRefArray,
    setBackgroundSize,
    setFocusThumbnail,
    setMouseHoverStyleClass,
    onMouseHover,
    clearMouseHover,
    appendLayout
  };
}