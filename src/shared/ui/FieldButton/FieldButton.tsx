import cls from './FieldButton.module.css';
import { ReactNode } from "react";
import { FieldType } from "src/shared/types";
import { classNames, Mods } from "src/shared/lib/classNames";

type FieldButtonProps = {
    field: FieldType,
    onClick: (field: FieldType) => void,
    children?: ReactNode,
    isAnimating?: boolean,
}


export const FieldButton = (
    { field, onClick, children, isAnimating }: FieldButtonProps) => {

    const animateMods: Mods = {
        [cls.animateMod]: isAnimating
    }

    return (
        <button
            className={classNames(cls.FieldButton, animateMods, [])}
            onClick={() => onClick(field)}
        >
            {children}
        </button>
    );
};
