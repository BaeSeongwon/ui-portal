import React, { useEffect, useRef, RefObject } from 'react';
import styled from 'styled-components';
import { PortalBackgroudTdStyle } from '../UiPortalStyleInterface';
import { UiPortalBackgroudTd } from './UiPortalBackgroudTd';
import { UiPortalDndUtilInterface } from '../../utils/UiPortalDndUtilInterface';

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
  uiPortalDndUtil: UiPortalDndUtilInterface,
  style?: PortalBackgroudTdStyle | null
}

export const UiPortalBackground = ({
  colSize = 10,
  rowSize = 10,
  uiPortalDndUtil,
  style = {
    backgroudTdWidth: '70px',
    backgroudTdHeight: '70px'
  }
}: UiPortalBackgroundProps) => {
  const cellRefArray: RefObject<HTMLTableCellElement>[] = [];

  useEffect(() => {
    if(uiPortalDndUtil) {
      uiPortalDndUtil.setMouseHoverStyleClass('portal-hover-style');
    }
  }, [])

  const generateTrTag = (rowSize:number, colSize:number, bgGridRowCol) : Array<JSX.Element> => {
		let trArr: JSX.Element[] = [];

		for(let colNo = 0; colNo < colSize; colNo++) {
			const [ tdArr, cellRef ] = generateTdTag(colNo, rowSize, bgGridRowCol);
			trArr.push(<tr>{tdArr}</tr>);
      cellRefArray.push(cellRef);
		}
    uiPortalDndUtil.initCellRefArray(cellRefArray);
		
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
          onMouseHover={uiPortalDndUtil.onMouseHover}
          clearMouseHover={uiPortalDndUtil.clearMouseHover}
				/>
			);
		}

		return [tdArr, cellRef];
	}

  return (
    <UiPortalContainer>
      <UiPortalInnerContainer>
        <UiPortalBackgroundTable>
          <tbody>
            {generateTrTag(rowSize, colSize, null)}
          </tbody>
        </UiPortalBackgroundTable>
      </UiPortalInnerContainer>
    </UiPortalContainer>
    
  )
}