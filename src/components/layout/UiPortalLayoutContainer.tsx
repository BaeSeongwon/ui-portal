import React from 'react';
import styled from 'styled-components';
import { UiPortalContainerBoundingClientRectInterface } from '../background/UiPortalBackground';
import { UiPortalLayout, UiPortalLayoutProps } from './UiPortalLayout';
import { UiLayoutContainerStyle } from '../UiPortalStyleInterface';

const LayoutContainer = styled.div<UiLayoutContainerStyle>`
  overflow: hidden;
  height: 0px;
  /* top: ${({top}) => `${top}px`};
  left: ${({left}) => `${left}px`};
  width: ${({width}) => `${width}px`};
  height: ${({height}) => `${height}px`}; */
`

interface UiPortalLayoutContainerProps {
  layouts: Array<UiPortalLayoutProps>,
  containerBoundingClientRect: UiPortalContainerBoundingClientRectInterface | null
}

export const UiPortalLayoutContainer = ({
  layouts = [],
  containerBoundingClientRect = null
}: UiPortalLayoutContainerProps) => {
  console.log(layouts)
  return (
    containerBoundingClientRect ? (
      <LayoutContainer {...containerBoundingClientRect}>
        {layouts.map((layout: UiPortalLayoutProps) => (
          <UiPortalLayout {...layout}/>
        ))}
      </LayoutContainer>
    ) : (<></>)
  )
}