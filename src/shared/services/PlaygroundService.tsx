import {FieldType, GridFieldsType, KeysOnFieldsType} from "../types";
import {BehaviorSubject, Observable} from "rxjs";
import {gridFields} from "../consts/gridFields.tsx";
import {findTheWinner} from "../lib/findTheWinner";
import {MatrixElementType} from "../../entities/PlayGround/PlayGround.tsx";
import {getRandomFieldId} from "../lib/getRandomFieldId";

export type PlayGroundStateType = {
    loadGrid: boolean,
    fieldsData: GridFieldsType,
    isComputerMove: boolean | string,
    isEndGame: boolean,
    freeFields: number,
    isAnimatedEndGame: boolean,
    isRestartGame: boolean,
    matrix: Array<MatrixElementType>,
    winnerResult: KeysOnFieldsType[] | false
}

const initialState: PlayGroundStateType = {
    fieldsData: gridFields,
    isComputerMove: false,
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
    private state$ = new BehaviorSubject<PlayGroundStateType>(initialState)

    public readonly stateObservable: Observable<PlayGroundStateType> = this.state$.asObservable();

    // Methods
    getState() {
        return this.state$.asObservable();
    }

    getCurrentState() {
        return this.state$.getValue();
    }

    setState(stateValue: Partial<PlayGroundStateType>) {
        const currentState = this.getCurrentState();
        this.state$.next({...currentState, ...stateValue});
    }

    checkIsWinner = (): void => {
        const { matrix, isEndGame } = this.getCurrentState();
        const winnerResult = findTheWinner(matrix);
        if(winnerResult && !isEndGame) {
            this.setAnimation(winnerResult);
            this.setState({ winnerResult, isEndGame: true })
            this.setCallbackDelay(this.setEndGame, 2500);
            return;
        }
    }

    checkHasFreeFields = (): void => {
        const { freeFields, winnerResult } = this.getCurrentState();
        if(freeFields === 0 && !winnerResult) {
            this.setState({ isEndGame: true, isAnimatedEndGame: true })
            this.setCallbackDelay(this.setEndGame, 2500);
        }
    }

    setField(field: FieldType) {
        const currentState = this.getCurrentState();
        const oldMatrix = currentState.matrix;
        const newMatrix: Array<MatrixElementType> = oldMatrix.map((item: MatrixElementType, index: number) => {
            if(index === Number(field.id) && field.figure) {
                return field.figure
            }
            return item
        })
        this.setState({
            fieldsData: {
                ...currentState.fieldsData,
                [field.id]: field
            },
            matrix: newMatrix
        })

        this.checkIsWinner();
        if(currentState.isComputerMove === true) {
            this.moveComputer()
        }
        this.checkHasFreeFields();
    }

    moveComputer = (): void => {
        const { isEndGame, fieldsData } = this.getCurrentState();
        if (isEndGame) {
            return;
        }
        const fieldId = getRandomFieldId(fieldsData);
        this.setState({isComputerMove: false})
        this.setField({id: fieldId, figure: 'cross', isEmpty: false, isAnimation: false})
    }

    completeOval = (): void => {
        const { freeFields } = this.getCurrentState();
        this.setState({ freeFields: freeFields - 1, isComputerMove: true })
        this.moveComputer();
    }

    completeCross = (): void => {
        const { freeFields } = this.getCurrentState()

        this.setState({freeFields: freeFields - 1, isComputerMove: false})
    }

    setLoadGrid = (): void => {
        this.setState({ loadGrid: true })
    }

    setAnimation(fieldIdArr: KeysOnFieldsType[]) {

        fieldIdArr.forEach((fieldId) => {
            const currentState = this.getCurrentState();
            if(currentState.fieldsData[fieldId].isAnimation) return;

            this.setState({
                fieldsData: {
                    ...currentState.fieldsData,
                    [fieldId]: {...currentState.fieldsData[fieldId], isAnimation: true}
                }
            })
        })
    }

    setCallbackDelay = (callback: VoidFunction, delay: number): void => {
        setTimeout(() => {
            callback();
        }, delay)
    }

    setEndGame = (): void => {
        this.setState({
            fieldsData: {...gridFields, "4": {id: "4", isEmpty: true, isAnimation: false, figure: null}},
            isComputerMove: false,
            freeFields: 8,
            isAnimatedEndGame: false,
        })
        this.setCallbackDelay(this.restartGame, 1000);
    }

    restartGame = (): void => {
        this.setState(initialState)
        this.setLoadGrid();
    }
}

export const playgroundService = new PlaygroundService();

