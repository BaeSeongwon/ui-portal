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

  const generateTrTag = (rowCount:number, colCount:number, bgGridRowCol) : Array<JSX.Element> => {
		let trArr: JSX.Element[] = [];

		for(let i = 0; i < rowCount; i++) {
			const [ tdArr, cellRef ] = generateTdTag(i, colCount, bgGridRowCol);
			trArr.push(<tr>{tdArr}</tr>);
      cellRefArray.push(cellRef);
		}
    uiPortalDndUtil.initCellRefArray(cellRefArray);
		
    return trArr;
	}

  const generateTdTag = (rowNo: number, colCount: number, bgGridRowCol) : Array<any> => {
		let tdArr: JSX.Element[] = [];
		let cellRef: RefObject<HTMLTableCellElement>[] = [];

		for(let j = 0; j < colCount; j++) {
      const tdRef = useRef<HTMLTableCellElement>(null); 
			cellRef.push(tdRef);

			tdArr.push(
				<UiPortalBackgroudTd
          colKey={j}
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
            {generateTrTag(colSize, rowSize, null)}
          </tbody>
        </UiPortalBackgroundTable>
      </UiPortalInnerContainer>
    </UiPortalContainer>
    
  )
}