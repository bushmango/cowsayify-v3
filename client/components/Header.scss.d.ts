export interface Styles {
  'header': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
