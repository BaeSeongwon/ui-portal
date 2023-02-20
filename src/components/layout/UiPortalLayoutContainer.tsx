import React from 'react';
import styled from 'styled-components';
import { UiPortalContainerBoundingClientRectInterface } from '../background/UiPortalBackground';
import { UiPortalLayout, UiPortalLayoutProps } from './UiPortalLayout';
import { UiLayoutContainerStyle } from '../UiPortalStyleInterface';
import { UiPortalHookInterface } from '../../hooks/UiPortalHookInterface';

const LayoutContainer = styled.div<UiLayoutContainerStyle>`
  overflow: hidden;
  height: 0px;
  /* top: ${({top}) => `${top}px`};
  left: ${({left}) => `${left}px`};
  width: ${({width}) => `${width}px`};
  height: ${({height}) => `${height}px`}; */
`

interface UiPortalLayoutContainerProps {
  uiPortalHook: UiPortalHookInterface,
  layouts: Array<UiPortalLayoutProps>,
  containerBoundingClientRect: UiPortalContainerBoundingClientRectInterface | null
}

export const UiPortalLayoutContainer = ({
  layouts = [],
  containerBoundingClientRect = null,
  uiPortalHook
}: UiPortalLayoutContainerProps) => {
  const renderPortalLayout = () => {
    return (
      layouts
        .map((layout: UiPortalLayoutProps, index: number) => (
          <UiPortalLayout 
            key={index}
            id={layout.id}
            top={layout.top}
            left={layout.left}
            width={layout.width}
            height={layout.height}
            colSize={layout.colSize}
            rowSize={layout.rowSize}
            startPositionPoint={layout.startPositionPoint}
            uiPortalHook={uiPortalHook}
            status={layout.status}
          />
        ))
    )
  }

  return (
    containerBoundingClientRect ? (
      <LayoutContainer {...containerBoundingClientRect}>
        {renderPortalLayout()}
      </LayoutContainer>
    ) : (<></>)
  )
}