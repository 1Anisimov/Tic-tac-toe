import cls from './PlayGround.module.css';
import {memo, useCallback, useEffect} from "react";
import {CrossAnimation} from "../../shared/ui/CrossAnimation/CrossAnimation.tsx";
import {GridAnimation} from "../../shared/ui/GridAnimation/GridAnimation.tsx";
import {OvalAnimation} from "../../shared/ui/OvalAnimation/OvalAnimation.tsx";
import {FieldButton} from "../../shared/ui/FieldButton/FieldButton.tsx";
// import {getRandomFieldId} from "../../shared/lib/getRandomFieldId";
import {FieldType} from "../../shared/types";
// import {findTheWinner} from "../../shared/lib/findTheWinner";
import {useReactiveState} from "../../shared/hooks/useReactiveState.tsx";
import {playgroundService, PlayGroundStateType} from "../../shared/services/PlaygroundService.tsx";

export type MatrixElementType = '' | 'cross' | 'oval';

const PlayGround = () => {

    const playgroundState = useReactiveState(
        useCallback(
            () => playgroundService.getState(), []),
        useCallback(
            () => playgroundService.getCurrentState(), []),
        useCallback(
            (a: PlayGroundStateType, b: PlayGroundStateType) =>
                a === b && a.fieldsData === b.fieldsData, []),
    );

    // const hasRestartedRef = useRef(false);


    // const moveComputer = useCallback(() => {
    //     if(!playgroundState.isEndGame && playgroundState.isComputerMove === true) {
    //         const fieldId = getRandomFieldId(
    //             playgroundState.fieldsData
    //         );
    //         playgroundService.setField({id: fieldId, figure: 'cross', isEmpty: false, isAnimation: false})
    //         playgroundService.setState({isComputerMove: false})
    //     }
    // }, [playgroundState.fieldsData, playgroundState.isComputerMove, playgroundState.isEndGame])

    useEffect(() => {
        console.log(playgroundState)
    }, [playgroundState]);

    const handleComplete = useCallback(() => {
        playgroundService.setLoadGrid()
    }, []);

    // useEffect(() => {
    //     const matrix: MatrixElementType[] = [
    //         '', '', '',
    //         '', '', '',
    //         '', '', ''
    //     ]
    //     // let freeFields = 9;
    //     // Object.values(playgroundState.fieldsData).forEach((field: FieldType) => {
    //     //     if(field.figure) {
    //     //         matrix[Number(field.id)] = field.figure;
    //     //     }
    //     // })
    //     const winnerResult = findTheWinner(matrix);
    //     if(winnerResult && !playgroundState.isEndGame) {
    //         playgroundService.setAnimation(winnerResult);
    //
    //         setTimeout(() => {
    //             playgroundService.setEndGame();
    //         }, 1500)
    //         return;
    //
    //     }
    //     // if(playgroundState.isComputerMove === true) {
    //     //     moveComputer()
    //     //     return;
    //     // }
    //
    //     if(playgroundState.freeFields === 0 && !winnerResult) {
    //         setTimeout(() => {
    //             playgroundService.setEndGame();
    //         }, 1500)
    //     }
    //
    //     // else if(playgroundState.isEndGame) {
    //     //         playgroundService.restartGame();
    //     // }
    //
    // }, [playgroundState.freeFields,playgroundState.fieldsData, playgroundState.isEndGame, playgroundState.isComputerMove])

    

    const tabField =  useCallback((field: FieldType) => {
        if(playgroundState.isComputerMove === false && !playgroundState.isEndGame) {
            if(playgroundState.fieldsData[field.id].isEmpty){

                playgroundService.setField({id: field.id, figure: 'oval', isEmpty: false, isAnimation: false});
            }
        }
    }, [playgroundState.fieldsData, playgroundState.isComputerMove, playgroundState.isEndGame])

    // function handleCompleteOval() {
    //     playgroundService.setState({freeFields: playgroundState.freeFields - 1})
    //     playgroundService.setState({isComputerMove: true})
    // }

    // const handleCompleteCross = useCallback(() => {
    //     playgroundService.setState({freeFields: playgroundState.freeFields - 1, isComputerMove: false})
    //
    //     if(playgroundState.freeFields === 0) {
    //         playgroundService.setState({isAnimatedEndGame: true})
    //         setTimeout(() => {
    //             playgroundService.setEndGame();
    //         }, 3500);
    //     }
    //
    // }, [playgroundState.freeFields])

 return (
     <div className={cls.Grid}>
         <GridAnimation handleComplete={handleComplete} />
         <div className={cls.playGround}>
             {Object.values(playgroundState.fieldsData).map((field) => (
                 <FieldButton
                     isAnimating={field.isAnimation || playgroundState.isAnimatedEndGame}
                     key={field.id}
                     field={field}
                     onClick={() => tabField(field)}
                 >
                     {!playgroundState.fieldsData[field.id].isEmpty && playgroundState.loadGrid && (
                         playgroundState.fieldsData[field.id].figure === 'cross'
                             ? <CrossAnimation />
                             : <OvalAnimation />
                     )}
                 </FieldButton>
             ))}
         </div>
     </div>
 );
}
export const PlayGroundMemo = memo(PlayGround)