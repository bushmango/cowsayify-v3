export interface Styles {
  'dud': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
