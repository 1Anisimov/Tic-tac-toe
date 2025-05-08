import cls from './PlayGround.module.css';
import { memo, useCallback } from "react";
import { GridAnimation } from "src/shared/ui/GridAnimation/GridAnimation";
import { FieldButton } from "src/shared/ui/FieldButton/FieldButton";
import { FieldType } from "src/shared/types";
import { useReactiveState } from "src/shared/hooks/useReactiveState";
import { playgroundService } from "src/shared/services/PlaygroundService";
import { PlayGroundAnimation } from "./PlayGroundAnimation";
import { WHOSE_MOVE } from "src/shared/enums";

const PlayGroundComponent = () => {

    const playgroundState = useReactiveState(playgroundService.store)

    const handleComplete = useCallback(() => {
        playgroundService.setLoadGrid()
    }, []);

    const tabField =  useCallback((field: FieldType) => {
        if(playgroundState.whoseMove === WHOSE_MOVE.PLAYER && !playgroundState.isEndGame) {
            if(playgroundState.fieldsData[field.id].isEmpty){

                playgroundService.setField({ id: field.id, figure: 'oval', isEmpty: false, isAnimation: false });
                playgroundService.setWhoseMove(WHOSE_MOVE.LOADING);
            }
        }
    }, [playgroundState.fieldsData, playgroundState.whoseMove, playgroundState.isEndGame])

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
                            <PlayGroundAnimation fieldId={field.id} />
                        )}
                    </FieldButton>
                ))}
            </div>
        </div>
    );
}
export const PlayGroundMemo = memo(PlayGroundComponent)