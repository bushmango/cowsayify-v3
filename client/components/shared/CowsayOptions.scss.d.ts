export interface Styles {
  'cowForm': string;
  'cowFormRow': string;
  'cowFormLabel': string;
  'cowFormItem': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
