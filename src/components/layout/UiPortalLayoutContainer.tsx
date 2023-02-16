import React from 'react';
import styled from 'styled-components';
import { UiPortalLayoutProps } from './UiPortalLayout';

const LayoutContainer = styled.div`
  position: absolute;
`


interface UiPortalLayoutContainerProps {
  layouts: Array<UiPortalLayoutProps>
}

export const UiPortalLayoutContainer = ({
  layouts = []
}: UiPortalLayoutContainerProps) => {
  return (
    <LayoutContainer>
      
    </LayoutContainer>
  )
}