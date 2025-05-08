import { Observable } from "rxjs";
import { GridFieldsType, KeysOnFieldsType } from "src/shared/types";
import { WHOSE_MOVE } from "src/shared/enums";

export type TReadonlyResult<T> = {
    state: Observable<T>;
    initial: T;
}

export type MatrixElementType = '' | 'cross' | 'oval';

export type PlayGroundStateType = {
    loadGrid: boolean,
    fieldsData: GridFieldsType,
    whoseMove: WHOSE_MOVE,
    isEndGame: boolean,
    freeFields: number,
    isAnimatedEndGame: boolean,
    isRestartGame: boolean,
    matrix: Array<MatrixElementType>,
    winnerResult: KeysOnFieldsType[] | false
}