export interface Styles {
  'dNdContainer': string;
  'dNdItem': string;
  'dndSelected': string;
  'dndSelectedLine': string;
  'noTextSelect': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
