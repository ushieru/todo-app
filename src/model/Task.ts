export class Task {
    constructor(
        readonly id: string,
        readonly title: string,
        readonly description: string,
        readonly userId: string,
        readonly state: TaskState,
    ) { }
}

export enum TaskState {
    todo = 'todo',
    inProgress = 'inProgress',
    complete = 'complete',
}