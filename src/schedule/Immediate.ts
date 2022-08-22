import Scheduler from "./Scheduler";

export const IMMEDIATE = new class implements Scheduler {
    schedule<R>(f: () => Promise<R>): Promise<R> {
        return f()
    }
}
