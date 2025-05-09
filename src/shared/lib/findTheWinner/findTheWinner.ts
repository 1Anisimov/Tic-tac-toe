import { KeysOnFieldsType, MatrixElementType } from "src/shared/types";

const winnerVariants: Array<Array<KeysOnFieldsType>> = [
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '1', '2'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '4', '8'],
    ['2', '4', '6']
]

export function findTheWinner(matrix: MatrixElementType[]): Array<KeysOnFieldsType> | false{
    const result: Array<Array<KeysOnFieldsType>> = winnerVariants.filter((variant: Array<KeysOnFieldsType>) => {
        const isAllCrosses = variant.every((item: KeysOnFieldsType) => matrix[item] === "cross")
        if (isAllCrosses) {
            return true;
        }
        return variant.every((item: KeysOnFieldsType) => matrix[item] === "oval")
    })
    return result.length > 0 ? result[0] : false
}