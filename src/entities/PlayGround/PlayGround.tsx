import cls from './PlayGround.module.css';
import {memo, useCallback} from "react";
import {CrossAnimation} from "../../shared/ui/CrossAnimation/CrossAnimation.tsx";
import {GridAnimation} from "../../shared/ui/GridAnimation/GridAnimation.tsx";
import {OvalAnimation} from "../../shared/ui/OvalAnimation/OvalAnimation.tsx";
import {FieldButton} from "../../shared/ui/FieldButton/FieldButton.tsx";
import {FieldType} from "../../shared/types";
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

    const handleComplete = useCallback(() => {
        playgroundService.setLoadGrid()
    }, []);

    const tabField =  useCallback((field: FieldType) => {
        if(playgroundState.isComputerMove === false && !playgroundState.isEndGame) {
            if(playgroundState.fieldsData[field.id].isEmpty){

                playgroundService.setField({id: field.id, figure: 'oval', isEmpty: false, isAnimation: false});
            }
        }
    }, [playgroundState.fieldsData, playgroundState.isComputerMove, playgroundState.isEndGame])

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