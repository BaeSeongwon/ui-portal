import { useState, RefObject } from 'react';
import { UiPortalLayoutStatusType } from '../components/layout/UiPortalLayout';
import { useEventListenerState } from '../hooks/useEventListenerState';

interface FocusThumbnailType {
  id: string,
  colSize: number,
  rowSize: number
}

interface MaxBackgroundSize {
  rowSize: number,
  colSize: number
}

export const UiPortalHook = () => {
  const [ layouts, setLayouts ] = useEventListenerState<Array<any>>([]);
  const [ mouseHoverStyleClass, setMouseHoverStyleClass ] = useState<string | null>(null);
  const [ batchedLayerPositionMap, setBatchedLayerPositionMap ] = useState(new Map<string, string>()); 
  const [ maxSize, setMaxSize ] = useState<MaxBackgroundSize>({rowSize: 0, colSize: 0});
  const [ focusThumbnail, setFocusThumbnail ] = useState<FocusThumbnailType | null>(null);

  let cellRefArray: RefObject<HTMLTableCellElement>[] | null = null;
  let hoverdCellList: RefObject<HTMLTableCellElement>[] = [];

  const initCellRefArray = (backgroundCellRefArray: RefObject<HTMLTableCellElement>[]) => {
    cellRefArray = backgroundCellRefArray;
  }

  const setBackgroundSize = (rowSize: number, colSize: number) => {
    setMaxSize({
      rowSize: rowSize,
      colSize: colSize
    });
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
    if(focusThumbnail) {
      const { colSize, rowSize } = focusThumbnail;
      const targetColEndPoint = colKey + colSize;
      const targetRowEndPoint = rowKey + rowSize;

      if(targetColEndPoint > maxSize.colSize || targetRowEndPoint > maxSize.rowSize) {
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
      const { type, startPositionPoint } = layoutObject;
      const { colKey, rowKey } = startPositionPoint;
      
      if(!isOverlabPosition(focusThumbnail, colKey, rowKey)) {
        if(type === 'move') {
          const beforeMovedLayout = layouts.find(({id}) => id === layoutObject.id);
          
          if(beforeMovedLayout) {
            // const BMLRowKey = beforeMovedLayout.startPositionPoint.rowKey;
            // const BMLColKey = beforeMovedLayout.startPositionPoint.colKey;
            // const BMLRowSize = beforeMovedLayout.rowSize;
            // const BMLColSize = beforeMovedLayout.colSize;

            // deleteBatchedLayerPositionMap(BMLRowKey, BMLRowSize, BMLColKey, BMLColSize);
            setLayouts(layouts.map(layout => (layout.id === beforeMovedLayout.id ? layoutObject : layout)));
          }
        } else if(type === 'new') {
          setLayouts(layouts.concat([layoutObject]));
        }

        updateBatchedLayerPositionMap(rowKey, layoutObject.rowSize, colKey, layoutObject.colSize);
      }
    }
  }

  const updateBatchedLayerPositionMap = (rowKey: number, rowSize: number, colKey: number, colSize: number) => {
    let map = new Map();

    for(let rowIndex = rowKey; rowIndex < (rowKey + rowSize); rowIndex++) {
      for(let colIndex = colKey; colIndex < (colKey + colSize); colIndex++) {
        const position: string = `${colIndex},${rowIndex}`;
        map.set(position, '1');
      }
    }

    setBatchedLayerPositionMap(map);
  }

  const deleteBatchedLayerPositionMap = (rowKey: number, rowSize: number, colKey: number, colSize: number) => {
    if(batchedLayerPositionMap) {
      for(let rowIndex = rowKey; rowIndex < (rowKey + rowSize); rowIndex++) {
        for(let colIndex = colKey; colIndex < (colKey + colSize); colIndex++) {
          
          const position: string = `${colIndex},${rowIndex}`;
          if(batchedLayerPositionMap.has(position)) {
            batchedLayerPositionMap.delete(position);
          }
        }
      }
      setBatchedLayerPositionMap(batchedLayerPositionMap);
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
    appendLayout,
    deleteBatchedLayerPositionMap: (layerId) => {
      const findLayerObject = layouts.find(layer => layer.id === layerId);

      if(findLayerObject) {
        const { rowKey, colKey } = findLayerObject.startPositionPoint;
        deleteBatchedLayerPositionMap(rowKey, findLayerObject.rowSize, colKey, findLayerObject.colSize);
      }
    },
    updateLayoutStatus: (id: string, status: UiPortalLayoutStatusType) => {
      setLayouts(layouts.map(layout => ({
        ...layout,
        status: id === layout.id ? status : layout.status
      })));
    }
  };
}