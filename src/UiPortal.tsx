import React, { useRef } from 'react';
import { UiPortalBackground } from './components/background/UiPortalBackground';
import { UiPortalThumbnailPalette } from './components/thumbnail/UiPortalThumbnailPalette';
import { UiPortalDndUtil } from './utils/UiPortalDndUtil';

import './portal.css';

export const UiPortal = () => {
  const uiPortalDndUtil = UiPortalDndUtil();
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbnails = [
    { id: '1', label: '테스트', colSize: 4, rowSize: 4 },
    { id: '2', label: '테스트', colSize: 4, rowSize: 4 },
    { id: '3', label: '테스트', colSize: 4, rowSize: 4 },
    { id: '4', label: '테스트', colSize: 4, rowSize: 4 }
  ]
  return (
    <div ref={containerRef}>
      <UiPortalBackground
        uiPortalDndUtil={uiPortalDndUtil}
        colSize={10}
        rowSize={10}
      />
      <UiPortalThumbnailPalette
        uiPortalDndUtil={uiPortalDndUtil}
        thumbnails={thumbnails}
      />
    </div>
  )
}