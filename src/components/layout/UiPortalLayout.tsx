import React, { useRef, DragEvent } from 'react';
import styled from 'styled-components';
import { UiPortalHookInterface } from '../../hooks/UiPortalHookInterface';
import { UiLayoutStyle } from '../UiPortalStyleInterface';

const Layout = styled.div<UiLayoutStyle>`
  position: absolute;
  border: 1px solid black;
  width: ${({width}) => `${width}px`};
  height: ${({height}) => `${height}px`};
  left: ${({left}) => `${left}px`};
  top: ${({top}) => `${top}px`};
  background-color: gray;
  cursor: move;
`

export type UiPortalLayoutStatusType = "render" | "moving"

export interface UiPortalLayoutProps {
  id: string,
  height: string,
  width: string,
  top: number,
  left: number,
  colSize: number,
  rowSize: number,
  uiPortalHook: UiPortalHookInterface,
  startPositionPoint: Object,
  status: UiPortalLayoutStatusType
}

export const UiPortalLayout = ({
  width = '100px',
  height = '100px',
  left = 0,
  top = 0,
  colSize = 0,
  rowSize = 0,
  id = '',
  uiPortalHook,
  startPositionPoint = {},
  status = 'render'
}: UiPortalLayoutProps) => {
  const layoutRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (event: DragEvent) => {
    const dragObject = {id: id, colSize: colSize, rowSize: rowSize, type: 'move'};
    const dragStringObject = JSON.stringify(dragObject);
    uiPortalHook.setFocusThumbnail(dragObject);
    uiPortalHook.deleteBatchedLayerPositionMap(id);
    uiPortalHook.updateLayoutStatus(id, 'moving');
    
    event.dataTransfer.clearData();
    event.dataTransfer.setData('text/plain', dragStringObject);
  }

  return (
    <Layout
      ref={layoutRef}
      draggable
      height={height}
      width={width}
      top={top}
      left={left}
      status={status}
      onDragStart={handleDragStart}
    >
      테스트
    </Layout>
  )
}