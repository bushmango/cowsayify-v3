export interface Styles {
  'infiniteLoaderBar': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
