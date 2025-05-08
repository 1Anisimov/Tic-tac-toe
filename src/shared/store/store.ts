import {BehaviorSubject, Observable} from "rxjs";

export type TReadonlyResult<T> = {
    state: Observable<T>;
    initial: T;
}

export class Store<T> {
    private state$: BehaviorSubject<T> = new BehaviorSubject<T>({} as T)

    constructor(initialState: T) {
        this.state$.next(initialState);
    }

    asObservable(): TReadonlyResult<T> {
        return { state: Object.seal(this.state$.asObservable()), initial: this.state$.value};
    }

    getState() {
        return this.state$.getValue();
    }

    update(stateValue: Partial<T>) {
        const currentState = this.getState();
        this.state$.next({...currentState, ...stateValue});
    }
}