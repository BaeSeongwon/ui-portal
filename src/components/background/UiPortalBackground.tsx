import React, { useEffect, useRef, RefObject } from 'react';
import styled from 'styled-components';
import { PortalBackgroudTdStyle } from '../UiPortalStyleInterface';
import { UiPortalBackgroudTd } from './UiPortalBackgroudTd';
import { UiPortalHookInterface } from '../../hooks/UiPortalHookInterface';

const UiPortalContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`

const UiPortalInnerContainer = styled.div`
  position: relative;
  margin: 0 auto;
  overflow: hidden;
`

const UiPortalBackgroundTable = styled.table`
  table-layout: auto;
  border-collapse: separate;
  border-spacing: 20px;
  margin: 0px auto;
`

interface UiPortalBackgroundProps {
  colSize: number,
  rowSize: number,
  uiPortalHook: UiPortalHookInterface,
  style?: PortalBackgroudTdStyle | null,
  getBackgroundBoundingClientRect: Function
}

export interface UiPortalContainerBoundingClientRectInterface {
  width: number,
  height: number,
  left: number,
  top: number
}

export const UiPortalBackground = ({
  colSize = 10,
  rowSize = 10,
  uiPortalHook,
  style = {
    backgroudTdWidth: '70px',
    backgroudTdHeight: '70px'
  },
  getBackgroundBoundingClientRect = () => {}
}: UiPortalBackgroundProps) => {
  const cellRefArray: RefObject<HTMLTableCellElement>[] = [];
  const backgroudContainerref = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    if(uiPortalHook) {
      uiPortalHook.setMouseHoverStyleClass('portal-hover-style');
    }

    if(backgroudContainerref && backgroudContainerref.current) {
      const rect = backgroudContainerref.current.getBoundingClientRect();
      const uiPortalContainerBoundingClientRect: UiPortalContainerBoundingClientRectInterface = {
        width: rect.width,
        height: rect.height,
        left: rect.left,
        top: rect.top
      }

      getBackgroundBoundingClientRect(uiPortalContainerBoundingClientRect);
    }
  }, []);

  const generateTrTag = (rowSize:number, colSize:number, bgGridRowCol) : Array<JSX.Element> => {
		let trArr: JSX.Element[] = [];

		for(let colNo = 0; colNo < colSize; colNo++) {
			const [ tdArr, cellRef ] = generateTdTag(colNo, rowSize, bgGridRowCol);
			trArr.push(<tr>{tdArr}</tr>);
      cellRefArray.push(cellRef);
		}
    uiPortalHook.initCellRefArray(cellRefArray);
		
    return trArr;
	}

  const generateTdTag = (colNo: number, rowSize: number, bgGridRowCol) : Array<any> => {
		let tdArr: JSX.Element[] = [];
		let cellRef: RefObject<HTMLTableCellElement>[] = [];

		for(let rowNo = 0; rowNo < rowSize; rowNo++) {
      const tdRef = useRef<HTMLTableCellElement>(null); 
			cellRef.push(tdRef);

			tdArr.push(
				<UiPortalBackgroudTd
          colKey={colNo}
          rowKey={rowNo} 
          backgroundTdRef={tdRef}
          style={style}
          onMouseHover={uiPortalHook.onMouseHover}
          clearMouseHover={uiPortalHook.clearMouseHover}
          appendLayout={uiPortalHook.appendLayout}
				/>
			);
		}

		return [tdArr, cellRef];
	}

  return (
    <UiPortalContainer>
      <UiPortalInnerContainer>
        <UiPortalBackgroundTable>
          <tbody ref={backgroudContainerref}>
            {generateTrTag(rowSize, colSize, null)}
          </tbody>
        </UiPortalBackgroundTable>
      </UiPortalInnerContainer>
    </UiPortalContainer>
    
  )
}