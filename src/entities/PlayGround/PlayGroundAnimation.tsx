import { memo } from "react";
import { useReactiveState } from "src/shared/hooks/useReactiveState";
import { playgroundService } from "src/shared/services/PlaygroundService";
import { CrossAnimation } from "src/shared/ui/CrossAnimation/CrossAnimation";
import { OvalAnimation } from "src/shared/ui/OvalAnimation/OvalAnimation";
import { KeysOnFieldsType } from "src/shared/types";

type AnimationComponentPropsType = {
    fieldId: KeysOnFieldsType;
}

const AnimationComponent = ({ fieldId }: AnimationComponentPropsType): React.JSX.Element => {
    const { fieldsData } = useReactiveState(playgroundService.store);

    return (
        fieldsData[fieldId].figure === 'cross'
            ? <CrossAnimation />
            : <OvalAnimation />
    );
}

export const PlayGroundAnimation = memo(AnimationComponent);