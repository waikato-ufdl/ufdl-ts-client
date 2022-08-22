export default interface Scheduler {

    schedule<R>(f: () => Promise<R>): Promise<R>;

}
