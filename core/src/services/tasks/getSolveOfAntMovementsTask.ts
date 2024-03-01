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
    let maxX = 0;

    const addCell = (cell: ICell) => {
        if (!cells[cell.y]) {
            cells[cell.y] = [];
        }

        cells[cell.y][cell.x] = 1;
        validCellsCount++;
        maxX = Math.max(maxX, cell.x);
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
        width: maxX,
        height: cells.length,
    };
};
