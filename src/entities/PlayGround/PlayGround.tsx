import cls from './PlayGround.module.css';
import {memo, useCallback, useEffect} from "react";
import {CrossAnimation} from "../../shared/ui/CrossAnimation/CrossAnimation.tsx";
import {GridAnimation} from "../../shared/ui/GridAnimation/GridAnimation.tsx";
import {OvalAnimation} from "../../shared/ui/OvalAnimation/OvalAnimation.tsx";
import {FieldButton} from "../../shared/ui/FieldButton/FieldButton.tsx";
import {getRandomFieldId} from "../../shared/lib/getRandomFieldId";
import {FieldType} from "../../shared/types";
import {findTheWinner} from "../../shared/lib/findTheWinner";
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

    console.log(playgroundState);

    const moveComputer = useCallback(() => {
        if(!playgroundState.isFinishGame && playgroundState.isComputerMove === true) {
            const fieldId = getRandomFieldId(
                playgroundState.fieldsData
            );
            playgroundService.setField({id: fieldId, figure: 'cross', isEmpty: false, isAnimation: false})
            playgroundService.setState({isComputerMove: false})
        }
    }, [playgroundState.fieldsData, playgroundState.isComputerMove, playgroundState.isFinishGame])

    useEffect(() => {
        
        const matrix: MatrixElementType[] = [
            '', '', '',
            '', '', '',
            '', '', ''
        ]
        let freeFields = 9;
        Object.values(playgroundState.fieldsData).forEach((field: FieldType) => {
            if(field.figure) {
                matrix[Number(field.id)] = field.figure;
                freeFields -= 1;
            }
        })
        const winnerResult = findTheWinner(matrix);
        if(winnerResult) {
            playgroundService.setAnimation(winnerResult);
            playgroundService.setState({isFinishGame: true})
        } else if(playgroundState.isComputerMove) {
            moveComputer()
        } else if(freeFields === 0) {
            playgroundService.setEndGame();
        }
        if(playgroundState.isEndGame || playgroundState.isFinishGame) {
            setTimeout(() => {
                playgroundService.restartGame();
            }, 3500);

        }
    }, [playgroundState.fieldsData, moveComputer, playgroundState.isComputerMove,
        playgroundState.isEndGame, playgroundState.isFinishGame])

    

    const tabField =  (field: FieldType) => {
        if(!playgroundState.isComputerMove && !playgroundState.isFinishGame) {
            if(playgroundState.fieldsData[field.id].isEmpty){

                playgroundService.setField({id: field.id, figure: 'oval', isEmpty: false, isAnimation: false});
                playgroundService.setState({isComputerMove: 'loading'})

            }
        }
    }

    function handleCompleteOval() {
        playgroundService.setState({isComputerMove: true})
    }

 return (
     <div className={cls.Grid}>
         <GridAnimation handleComplete={() => {
             playgroundService.setState({loadGrid: true})
         }
          } />
         <div className={cls.playGround}>
             {Object.values(playgroundState.fieldsData).map((field) => (
                 <FieldButton
                     isAnimating={field.isAnimation || playgroundState.isEndGame}
                     key={field.id}
                     field={field}
                     onClick={() => tabField(field)}
                 >
                     {!playgroundState.fieldsData[field.id].isEmpty && playgroundState.loadGrid && (
                         playgroundState.fieldsData[field.id].figure === 'cross'
                             ? <CrossAnimation />
                             : <OvalAnimation handleComplete={handleCompleteOval} />
                     )}
                 </FieldButton>
             ))}
         </div>
     </div>
 );
}
export const PlayGroundMemo = memo(PlayGround)