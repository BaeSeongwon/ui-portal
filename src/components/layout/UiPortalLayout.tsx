import React from 'react';
import styled from 'styled-components';
import { UiLayoutStyle } from '../UiPortalStyleInterface';

const Layout = styled.div<UiLayoutStyle>`
  position: absolute;
  border: 1px solid black;
  width: ${({width}) => `${width}px`};
  height: ${({height}) => `${height}px`};
  left: ${({left}) => `${left}px`};
  top: ${({top}) => `${top}px`};
  background-color: gray;
`

export interface UiPortalLayoutProps {
  width: string,
  height: string,
  left: number,
  top: number,
  colSize: number,
  rowSize: number,
  id: string
}

export const UiPortalLayout = ({
  width = '100px',
  height = '100px',
  left = 0,
  top = 0,
  colSize = 0,
  rowSize = 0,
  id = ''
}: UiPortalLayoutProps) => {
  return (
    <Layout
      width={width}
      height={height}
      left={left}
      top={top}
    >
      테스트
    </Layout>
  )
}