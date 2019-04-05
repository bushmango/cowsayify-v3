export interface Styles {
  'section': string;
  'keyword': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
