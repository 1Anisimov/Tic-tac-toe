import { PlayGroundStateType } from "src/shared/types";
import { gridFields } from "src/shared/consts/gridFields";
import { WHOSE_MOVE } from "src/shared/enums";

export const initialState: PlayGroundStateType = {
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