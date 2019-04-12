export interface Styles {
  cowBox: string
}

export type ClassNames = keyof Styles

declare const styles: Styles

export default styles
