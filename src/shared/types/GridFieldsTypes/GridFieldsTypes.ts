

export type KeysOnFieldsType = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
export type FigureTextType = 'cross' | 'oval' | null;
export type FieldType = {
    id: KeysOnFieldsType,
    isEmpty: boolean,
    figure: FigureTextType | null,
    isAnimation: boolean,
}
export type GridFieldsType = Record<KeysOnFieldsType, FieldType>;