import Lottie from "lottie-react";
import { LottieRefCurrentProps } from 'lottie-react'
import animationData from "src/shared/assets/tic-tac-toe-assets/oval.json";
import { useRef, useEffect } from "react";
import { playgroundService } from "src/shared/services/PlaygroundService";

type OvalAnimationProps = {
    className?: string;
}

export const OvalAnimation = (
    { className }: OvalAnimationProps) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        lottieRef.current?.setSpeed(0.5);
    }, []);
    return (
        <Lottie
            className={className}
            onComplete={playgroundService.completeOval}
            lottieRef={lottieRef}
            animationData={animationData}
            loop={0.5}
        />
    )
};