import {FieldType, GridFieldsType, KeysOnFieldsType} from "../types";
import {BehaviorSubject, Observable} from "rxjs";
import {gridFields} from "../consts/gridFields.tsx";

export type PlayGroundStateType = {
    loadGrid: boolean,
    fieldsData: GridFieldsType,
    isComputerMove: boolean | string,
    isFinishGame: boolean,
    isEndGame: boolean,
}

class PlaygroundService {
    private state$ = new BehaviorSubject<PlayGroundStateType>({
        fieldsData: gridFields,
        isComputerMove: false,
        isFinishGame: false,
        loadGrid: false,
        isEndGame: false,
    })

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

    setField(field: FieldType) {
        const currentState = this.getCurrentState();
        this.setState({
            fieldsData: {
                ...currentState.fieldsData,
                [field.id]: field
            },
            isComputerMove: currentState.isComputerMove,
            isFinishGame: currentState.isFinishGame,
            loadGrid: currentState.loadGrid,

        })
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

    setEndGame(){
        this.setState({
            isEndGame: true,
        })
    }

    restartGame() {
        this.setState({
            fieldsData: gridFields,
            isComputerMove: false,
            isFinishGame: false,
            loadGrid: true,
            isEndGame: false,
        })
    }
}

export const playgroundService = new PlaygroundService();

