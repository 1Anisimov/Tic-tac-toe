import Lottie from "lottie-react";
import {LottieRefCurrentProps} from 'lottie-react'
import animationData from "../../../shared/assets/tic-tac-toe-assets/cross.json";
import {useRef, useEffect} from "react";

type CrossAnimationType = {
    className?: string;
}

export const CrossAnimation = (
    {className}: CrossAnimationType) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        lottieRef.current?.setSpeed(0.75);
    }, []);

    return (
        <Lottie
            className={className}
            lottieRef={lottieRef}
            animationData={animationData}
            loop={0.5}
        />
    )
};