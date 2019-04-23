export interface Styles {
  'dNdContainer': string;
  'dNdItem': string;
  'dndSelectedLine': string;
  'dndSelected': string;
  'noTextSelect': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
