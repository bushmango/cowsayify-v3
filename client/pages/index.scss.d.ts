export interface Styles {
  'testSass': string;
  'welcome': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
