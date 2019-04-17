export interface Styles {
  'noTextSelect': string;
  'clickable': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
