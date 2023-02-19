import React, { RefObject } from 'react';
import styled from 'styled-components';

import { UiPortalThumbnail } from './UiPortalTumbnail';
import { UiPortalHookInterface } from '../../hooks/UiPortalHookInterface';

const UiPortalThumbnailPaletteContainer = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  background-color: #31353c;
  padding: 10px;
  overflow: auto;
`

const UiPortalThumbnailPaletteInnerContainer = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-content: center;
  justify-content: center;
  overflow: auto;
`

interface UiPortalThumbnailType {
  id: string,
  label: string,
  colSize: number,
  rowSize: number
}

interface UiPortalThumbnailPaletteProps {
  uiPortalHook: UiPortalHookInterface,
  thumbnails: Array<UiPortalThumbnailType>
}

export const UiPortalThumbnailPalette = ({
  uiPortalHook,
  thumbnails = []
}: UiPortalThumbnailPaletteProps) => {
  return (
    <UiPortalThumbnailPaletteContainer>
      <UiPortalThumbnailPaletteInnerContainer>
        {thumbnails.map((item: UiPortalThumbnailType) => {
          return (
            <UiPortalThumbnail 
              key={item.id} 
              id={item.id} 
              label={item.label} 
              colSize={item.colSize}
              rowSize={item.rowSize}
              uiPortalHook={uiPortalHook}
            />
          )
        })}
      </UiPortalThumbnailPaletteInnerContainer>
    </UiPortalThumbnailPaletteContainer>
  )
}