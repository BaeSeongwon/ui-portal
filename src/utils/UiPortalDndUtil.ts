import { RefObject } from 'react';

interface FocusThumbnailType {
  id: string,
  colSize: number,
  rowSize: number
}

export const UiPortalDndUtil = () => {
  let cellRefArray: RefObject<HTMLTableCellElement>[] | null = null;
  let focusThumbnail: FocusThumbnailType | null = null;
  let mouseHoverStyleClass: string | null = null;
  
  let hoverdCellList: RefObject<HTMLTableCellElement>[] = [];

  const initCellRefArray = (backgroundCellRefArray: RefObject<HTMLTableCellElement>[]) => {
    cellRefArray = backgroundCellRefArray;
  }

  const setFocusThumbnail = (thumbnail: FocusThumbnailType) => {
    focusThumbnail = thumbnail;
  }

  const setMouseHoverStyleClass = (className: string) => {
    mouseHoverStyleClass = className;
  }

  const onMouseHover = (colKey:number, rowKey:number) => {
    clearMouseHover();
      
    if(cellRefArray && colKey && rowKey) {
      if(focusThumbnail) {
        const { rowSize, colSize } = focusThumbnail;

        for(let i = 0; i < rowSize; i ++) {
          const rowIndex = i + rowKey;
          for(let a = 0; a < colSize; a++) {
            const colIndex = a + colKey;

            if(!cellRefArray[colIndex][rowIndex]) {
              hoverdCellList = [];
            } else {
              hoverdCellList.push(cellRefArray[colIndex][rowIndex]);
            }
          }
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

  return {
    initCellRefArray: initCellRefArray,
    setFocusThumbnail: setFocusThumbnail,
    setMouseHoverStyleClass: setMouseHoverStyleClass,
    onMouseHover: onMouseHover,
    clearMouseHover: clearMouseHover
  } 
}