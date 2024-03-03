export namespace Responses {
    export interface IGetTasksAntMovements {
        validCellsCount: number;
        cells: Array<(1 | undefined)[]>;
        croppedField: {
            minX: number;
            minY: number;
            maxX: number;
            maxY: number;
        }
    }
}
