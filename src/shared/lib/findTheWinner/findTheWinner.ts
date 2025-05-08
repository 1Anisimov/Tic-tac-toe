import { MatrixElementType } from "../../../entities/PlayGround/PlayGround.tsx";
import { KeysOnFieldsType } from "../../types";

export function findTheWinner(matrix: MatrixElementType[]): KeysOnFieldsType[] | false {
    if((matrix[0] === 'cross' && matrix[3] === 'cross' && matrix[6] === 'cross') ||
        (matrix[0] === 'oval' && matrix[3] === 'oval' && matrix[6] === 'oval')) {
        return ['0', '3', '6'];
    }
    else if((matrix[1] === 'cross' && matrix[4] === 'cross' && matrix[7] === 'cross') ||
        (matrix[1] === 'oval' && matrix[4] === 'oval' && matrix[7] === 'oval')) {
        return ['1', '4', '7'];
    }
    else if((matrix[2] === 'cross' && matrix[5] === 'cross' && matrix[8] === 'cross') ||
        (matrix[2] === 'oval' && matrix[5] === 'oval' && matrix[8] === 'oval')) {
        return ['2', '5', '8'];
    }
    else if((matrix[0] === 'cross' && matrix[1] === 'cross' && matrix[2] === 'cross') ||
        (matrix[0] === 'oval' && matrix[1] === 'oval' && matrix[2] === 'oval')) {
        return ['0', '1', '2'];
    }
    else if((matrix[3] === 'cross' && matrix[4] === 'cross' && matrix[5] === 'cross') ||
        (matrix[3] === 'oval' && matrix[4] === 'oval' && matrix[5] === 'oval')) {
        return ['3', '4', '5'];
    }
    else if((matrix[6] === 'cross' && matrix[7] === 'cross' && matrix[8] === 'cross') ||
        (matrix[6] === 'oval' && matrix[7] === 'oval' && matrix[8] === 'oval')) {
        return ['6', '7', '8'];
    }
    else if(matrix[0] === 'cross' && matrix[4] === 'cross' && matrix[8] === 'cross') {
        return ['0', '4', '8'];
    }
    else if(matrix[2] === 'cross' && matrix[4] === 'cross' && matrix[6] === 'cross') {
        return ['2', '4', '6'];
    }

    return false;
}