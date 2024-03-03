import { Responses } from '../../types/rest/responses';
import { checkSumAllCoordinateDigits } from '../../utils/antMovementsTask/checkSumAllCoordinateDigits';

interface IArgs {
    x: number;
    y: number;
    maxSum: number;
}

interface ICell {
    x: number;
    y: number;
}

export const getSolveOfAntMovementsTask = async ({ x, y, maxSum }: IArgs): Promise<Responses.IGetTasksAntMovements> => {
    const cells: Array<(1 | undefined)[]> = [];
    const cellsQueue: ICell[] = [{ x, y }];

    let validCellsCount = 0;
    const croppedField: Responses.IGetTasksAntMovements['croppedField'] = {
        minX: x,
        minY: y,
        maxX: x,
        maxY: y,
    };

    const addCell = (cell: ICell) => {
        if (!cells[cell.y]) {
            cells[cell.y] = [];
        }

        cells[cell.y][cell.x] = 1;
        validCellsCount++;
        croppedField.maxX = Math.max(croppedField.maxX, cell.x);
        croppedField.maxY = Math.max(croppedField.maxY, cell.y);
        croppedField.minX = Math.min(croppedField.minX, cell.x);
        croppedField.minY = Math.min(croppedField.minY, cell.y);
    };

    addCell(cellsQueue[0]);

    while (cellsQueue.length) {
        const cell = cellsQueue.shift() as ICell;

        const leftCell = { x: cell.x - 1, y: cell.y };
        const rightCell = { x: cell.x + 1, y: cell.y };
        const upCell = { x: cell.x, y: cell.y + 1 };
        const downCell = { x: cell.x, y: cell.y - 1 };

        [leftCell, rightCell, upCell, downCell].forEach((c) => {
            if (cells[c.y]?.[c.x] !== undefined || c.x < 0 || c.y < 0) {
                return;
            }

            if (checkSumAllCoordinateDigits({ ...c, maxSum })) {
                cellsQueue.push(c);
                addCell(c);
            }
        });
    }

    return {
        validCellsCount,
        cells,
        croppedField,
    };
};
