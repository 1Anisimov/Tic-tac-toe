import { useEffect, useReducer, useRef } from "react";
import { TReadonlyResult } from "src/shared/types";


export function useReactiveState<T>(store: TReadonlyResult<T>): T {
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);
    const stateRef = useRef<T>(store.initial);

    useEffect(() => {
        const sub = store.state.subscribe((store: T) => {

            if(store !== stateRef.current) {
                stateRef.current = store;
                forceUpdate();
            }
        })
        return () => sub.unsubscribe();
    }, [stateRef, forceUpdate, store.state]);

    return stateRef.current;
}