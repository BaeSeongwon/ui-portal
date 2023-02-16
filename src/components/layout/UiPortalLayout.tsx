import React from 'react';
import styled from 'styled-components';
import { UiLayoutStyle } from '../UiPortalStyleInterface';

const Layout = styled.div<UiLayoutStyle>`
  border: 1px solid black;
  width: ${({width}) => width};
  height: ${({height}) => height};
`

export interface UiPortalLayoutProps {
  width: string,
  height: string
}

export const UiPortalLayout = ({
  width = '100px',
  height = '100px'
}: UiPortalLayoutProps) => {
  return (
    <Layout
      width={width}
      height={height}
    >
      테스트
    </Layout>
  )
}