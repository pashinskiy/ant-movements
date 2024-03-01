export namespace Responses {
    export interface IGetTasksAntMovements {
        validCellsCount: number;
        cells: Array<(1 | undefined)[]>;
        width: number;
        height: number;
    }
}
