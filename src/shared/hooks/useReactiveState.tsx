import {Observable} from "rxjs";
import {useEffect, useReducer, useRef} from "react";


export function useReactiveState<T>(
    observable$: () => Observable<T>,
    getCurrentState: () => T,
    compareFn: (a: T, b: T) => boolean = (a, b) => a === b,
    ): T {
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);
    const stateRef = useRef<T>(getCurrentState());


    useEffect(() => {
        const sub = observable$().subscribe(() => {
            const newState = getCurrentState();
            if(!compareFn(stateRef.current, newState)) {
                stateRef.current = newState;
                forceUpdate();
            }

        })
        return () => sub.unsubscribe();
    }, [compareFn, getCurrentState, observable$]);

    return stateRef.current;
}