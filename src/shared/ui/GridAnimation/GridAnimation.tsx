import Lottie from "lottie-react";
import { LottieRefCurrentProps } from 'lottie-react'
import animationData from "src/shared/assets/tic-tac-toe-assets/grid.json";
import { useRef, useEffect } from "react";
import cls from './GridAnimation.module.css'

type GridAnimationProps = {
    handleComplete: () => void;
}

export const GridAnimation = ({ handleComplete }:GridAnimationProps) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        lottieRef.current?.setSpeed(1);
    }, []);

    return (
        <Lottie
            onComplete={handleComplete}
            lottieRef={lottieRef}
            animationData={animationData}
            loop={0.5}
            className={cls.GridLottie}
        />
    )
};