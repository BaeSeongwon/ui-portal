import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { UiPortalHookInterface } from '../../hooks/UiPortalHookInterface';

const UiPortalTuhmbnailContainer = styled.div`
  flex: 0 0 auto;
  width: 100px;
  height: 100px;
  margin: 3px;
  padding: 5px;
  background-color: #464a50;
  cursor: move;
`

const UiPortalThumbnailLabelContainer = styled.div`
  width: 100%;
  text-align: center;
  margin: 5px 0px;
`

const UiPortalThumbnailLabel = styled.span`
  color: white;
`

interface UiPortalThumbnailProps {
  id: string,
  label: string,
  colSize: number,
  rowSize: number,
  uiPortalHook: UiPortalHookInterface
}

export const UiPortalThumbnail = ({
  id,
  label,
  colSize,
  rowSize,
  uiPortalHook
}: UiPortalThumbnailProps) => {
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    thumbnailContainerRef.current?.addEventListener('dragstart', (event: DragEvent) => {
      if(event && event.dataTransfer) {
        const dragObject = {id: id, colSize: colSize, rowSize: rowSize};
        const dragStringObject = JSON.stringify(dragObject);
        uiPortalHook.setFocusThumbnail(dragObject);
        
        event.dataTransfer.clearData();
        event.dataTransfer.setData('text/plain', dragStringObject);
      }
    })
  }, [])

  return (
    <UiPortalTuhmbnailContainer
      id={id}
      ref={thumbnailContainerRef}
      draggable
    >
      <div>

      </div>
      <UiPortalThumbnailLabelContainer>
        <UiPortalThumbnailLabel>{label}</UiPortalThumbnailLabel>
      </UiPortalThumbnailLabelContainer>    
    </UiPortalTuhmbnailContainer>
  )
}