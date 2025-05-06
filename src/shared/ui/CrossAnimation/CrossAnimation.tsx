import Lottie from "lottie-react";
import {LottieRefCurrentProps} from 'lottie-react'
import animationData from "../../../shared/assets/tic-tac-toe-assets/cross.json";
import {useRef, useEffect, memo} from "react";
import {playgroundService} from "../../services/PlaygroundService.tsx";

type CrossAnimationType = {
    className?: string;
    handleComplete?: () => void;
}

export const CrossAnimation = memo((
    {className}: CrossAnimationType) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        lottieRef.current?.setSpeed(0.75);
    }, []);

    return (
        <Lottie
            className={className}
            onComplete={playgroundService.completeCross}
            lottieRef={lottieRef}
            animationData={animationData}
            loop={0.5}
        />
    )
})