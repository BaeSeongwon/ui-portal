import React, { useEffect, useState, useRef } from 'react';
import { UiPortalBackground } from './components/background/UiPortalBackground';
import { UiPortalThumbnailPalette } from './components/thumbnail/UiPortalThumbnailPalette';
import { UiPortalHook } from './hooks/UiPortalHook';

import './portal.css';
import { UiPortalLayoutContainer } from './components/layout/UiPortalLayoutContainer';
import { UiPortalContainerBoundingClientRectInterface } from './components/background/UiPortalBackground';

export const UiPortal = () => {
  const [ containerBoundingClientRect, setContainerBoundingClientRect ] = useState<UiPortalContainerBoundingClientRectInterface | null>(null); 
  const uiPortalHook = UiPortalHook();
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnails = [
    { id: '1', label: '테스트', colSize: 3, rowSize: 3 },
    { id: '2', label: '테스트', colSize: 3, rowSize: 3 },
    { id: '3', label: '테스트', colSize: 3, rowSize: 3 },
    { id: '4', label: '테스트', colSize: 3, rowSize: 3 }
  ];

  useEffect(() => {
    uiPortalHook.setBackgroundSize(10, 10);
  }, [])

  const getBackgroundBoundingClientRect = (rect: UiPortalContainerBoundingClientRectInterface | null) => {
    if(rect) {
      setContainerBoundingClientRect(rect);
    }
  }

  return (
    <div ref={containerRef}>
      <UiPortalBackground
        uiPortalHook={uiPortalHook}
        rowSize={10}
        colSize={10}
        getBackgroundBoundingClientRect={getBackgroundBoundingClientRect}
      />
      {
        containerBoundingClientRect && (
          <UiPortalLayoutContainer
            layouts={uiPortalHook.layouts}
            containerBoundingClientRect={containerBoundingClientRect}
          />
        )
      }
      <UiPortalThumbnailPalette
        uiPortalHook={uiPortalHook}
        thumbnails={thumbnails}
      />
    </div>
  )
}