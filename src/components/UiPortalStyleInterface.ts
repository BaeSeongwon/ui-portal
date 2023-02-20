import { UiPortalLayoutStatusType } from "./layout/UiPortalLayout"

export interface UiPortalStyle {
  backgroud: PortalBackgroudTdStyle
}

export interface PortalBackgroudTdStyle {
  backgroudTdWidth?: string,
  backgroudTdHeight?: string
}

export interface UiLayoutStyle {
  width: string,
  height: string,
  left: number,
  top: number,
  status: UiPortalLayoutStatusType
}

export interface UiLayoutContainerStyle {
  top: number,
  left: number,
  width: number,
  height: number
}