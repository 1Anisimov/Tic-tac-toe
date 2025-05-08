import { FieldType, GridFieldsType, KeysOnFieldsType } from "../types";
import { gridFields } from "../consts/gridFields.tsx";
import { findTheWinner } from "../lib/findTheWinner";
import { MatrixElementType } from "../../entities/PlayGround/PlayGround.tsx";
import { getRandomFieldId } from "../lib/getRandomFieldId";
import { Store, TReadonlyResult } from "../store/store.ts";

export enum WHOSE_MOVE{
    COMPUTER = 'COMPUTER',
    PLAYER = 'PLAYER',
    LOADING = 'LOADING',
}

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

const initialState: PlayGroundStateType = {
    fieldsData: gridFields,
    whoseMove: WHOSE_MOVE.PLAYER,
    loadGrid: false,
    isEndGame: false,
    freeFields: 8,
    isAnimatedEndGame: false,
    isRestartGame: false,
    matrix: [
        '', '', '',
        '', 'cross', '',
        '', '', ''
    ],
    winnerResult: false
}

class PlaygroundService {
    private _store = new Store(initialState)

    public store: TReadonlyResult<PlayGroundStateType> = this._store.asObservable();

    setWhoseMove = (value: WHOSE_MOVE) => {
        this._store.update({ whoseMove: value })
    }

    checkIsWinner = (): void => {
        const { matrix, isEndGame } = this._store.getState();
        const winnerResult = findTheWinner(matrix);
        if(winnerResult && !isEndGame) {
            this.setAnimation(winnerResult);
            this._store.update({ winnerResult, isEndGame: true })
            this._setCallbackDelay(this.setEndGame, 2500);
            return;
        }
    }

    checkHasFreeFields = (): void => {
        const { freeFields, winnerResult } = this._store.getState();
        if(freeFields === 0 && !winnerResult) {
            this._store.update({ isEndGame: true, isAnimatedEndGame: true })
            this._setCallbackDelay(this.setEndGame, 2500);
        }
    }

    setField(field: FieldType) {
        const currentState = this._store.getState();
        const oldMatrix = currentState.matrix;
        const newMatrix: Array<MatrixElementType> = oldMatrix.map((item: MatrixElementType, index: number) => {
            if(index === Number(field.id) && field.figure) {
                return field.figure
            }
            return item
        })
        this._store.update({
            fieldsData: {
                ...currentState.fieldsData,
                [field.id]: field
            },
            matrix: newMatrix
        })

        this.checkIsWinner();
        if(currentState.whoseMove === WHOSE_MOVE.COMPUTER) {
            this.moveComputer()
        }
        this.checkHasFreeFields();
    }

    moveComputer = (): void => {
        const { isEndGame, fieldsData } = this._store.getState();
        if (isEndGame) {
            return;
        }
        const fieldId = getRandomFieldId(fieldsData);
        this._store.update({ whoseMove: WHOSE_MOVE.PLAYER })
        this.setField({ id: fieldId, figure: 'cross', isEmpty: false, isAnimation: false })
    }

    completeOval = (): void => {
        const { freeFields } = this._store.getState();
        this._store.update({ freeFields: freeFields - 1, whoseMove: WHOSE_MOVE.COMPUTER })
        this.moveComputer();
    }

    completeCross = (): void => {
        const { freeFields } = this._store.getState();
        this._store.update({ freeFields: freeFields - 1, whoseMove: WHOSE_MOVE.PLAYER })
    }

    setLoadGrid = (): void => {
        this._store.update({ loadGrid: true })
    }

    setAnimation(fieldIdArr: KeysOnFieldsType[]) {

        fieldIdArr.forEach((fieldId) => {
            const currentState = this._store.getState();
            if(currentState.fieldsData[fieldId].isAnimation) return;

            this._store.update({
                fieldsData: {
                    ...currentState.fieldsData,
                    [fieldId]: { ...currentState.fieldsData[fieldId], isAnimation: true }
                }
            })
        })
    }

    private _setCallbackDelay = (callback: VoidFunction, delay: number): void => {
        setTimeout(() => {
            callback();
        }, delay)
    }

    setEndGame = (): void => {
        this._store.update({
            fieldsData: { ...gridFields, "4": { id: "4", isEmpty: true, isAnimation: false, figure: null } },
            whoseMove: WHOSE_MOVE.PLAYER,
            freeFields: 8,
            isAnimatedEndGame: false
        })
        this._setCallbackDelay(this.restartGame, 1000);
    }

    restartGame = (): void => {
        this._store.update(initialState)
        this.setLoadGrid();
    }
}

export const playgroundService = new PlaygroundService();

