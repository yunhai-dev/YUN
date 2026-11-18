export type MediaWallRect = {
    key: string;
    column: number;
    row: number;
    slotIndex: number;
    x: number;
    y: number;
    width: number;
    height: number;
    area: number;
};

export type MediaWallTile = {
    rect: MediaWallRect;
    itemIndex: number;
};

export type MediaWallBounds = {
    left: number;
    right: number;
    top: number;
    bottom: number;
};

export const MEDIA_WALL_METRICS = { cellSize: 128, gap: 8 } as const;

const BLOCK_COLS = 12;
const BLOCK_ROWS = 8;
const SLOTS_PER_BLOCK = 12;
const FIELD_ASPECT = 2.2;
const MAX_RENDERED_TILES = 360;
const PITCH = MEDIA_WALL_METRICS.cellSize + MEDIA_WALL_METRICS.gap;
const BLOCK_WIDTH = BLOCK_COLS * PITCH;
const BLOCK_HEIGHT = BLOCK_ROWS * PITCH;

type BlockSlot = { x: number; y: number; cols: number; rows: number };

// Four upstream Folia block compositions provide the mixed aspect ratios visible in the wall.
const TEMPLATES: BlockSlot[][] = [
    [
        { x: 0, y: 0, cols: 3, rows: 2 }, { x: 3, y: 0, cols: 6, rows: 4 }, { x: 9, y: 0, cols: 3, rows: 2 },
        { x: 0, y: 2, cols: 3, rows: 2 }, { x: 9, y: 2, cols: 3, rows: 4 }, { x: 0, y: 4, cols: 4, rows: 4 },
        { x: 4, y: 4, cols: 2, rows: 2 }, { x: 6, y: 4, cols: 3, rows: 2 }, { x: 4, y: 6, cols: 2, rows: 2 },
        { x: 6, y: 6, cols: 2, rows: 2 }, { x: 8, y: 6, cols: 2, rows: 2 }, { x: 10, y: 6, cols: 2, rows: 2 },
    ],
    [
        { x: 0, y: 0, cols: 2, rows: 3 }, { x: 2, y: 0, cols: 2, rows: 3 }, { x: 4, y: 0, cols: 2, rows: 3 },
        { x: 6, y: 0, cols: 6, rows: 4 }, { x: 0, y: 3, cols: 6, rows: 2 }, { x: 6, y: 4, cols: 2, rows: 4 },
        { x: 8, y: 4, cols: 2, rows: 4 }, { x: 10, y: 4, cols: 2, rows: 2 }, { x: 0, y: 5, cols: 2, rows: 3 },
        { x: 2, y: 5, cols: 2, rows: 3 }, { x: 4, y: 5, cols: 2, rows: 3 }, { x: 10, y: 6, cols: 2, rows: 2 },
    ],
    [
        { x: 0, y: 0, cols: 6, rows: 4 }, { x: 6, y: 0, cols: 6, rows: 3 }, { x: 6, y: 3, cols: 4, rows: 3 },
        { x: 10, y: 3, cols: 2, rows: 2 }, { x: 0, y: 4, cols: 4, rows: 2 }, { x: 4, y: 4, cols: 2, rows: 2 },
        { x: 10, y: 5, cols: 2, rows: 3 }, { x: 0, y: 6, cols: 2, rows: 2 }, { x: 2, y: 6, cols: 2, rows: 2 },
        { x: 4, y: 6, cols: 2, rows: 2 }, { x: 6, y: 6, cols: 2, rows: 2 }, { x: 8, y: 6, cols: 2, rows: 2 },
    ],
    [
        { x: 0, y: 0, cols: 2, rows: 2 }, { x: 2, y: 0, cols: 2, rows: 2 }, { x: 4, y: 0, cols: 4, rows: 3 },
        { x: 8, y: 0, cols: 2, rows: 4 }, { x: 10, y: 0, cols: 2, rows: 4 }, { x: 0, y: 2, cols: 2, rows: 3 },
        { x: 2, y: 2, cols: 2, rows: 2 }, { x: 4, y: 3, cols: 4, rows: 3 }, { x: 2, y: 4, cols: 2, rows: 2 },
        { x: 8, y: 4, cols: 4, rows: 4 }, { x: 0, y: 5, cols: 2, rows: 3 }, { x: 2, y: 6, cols: 6, rows: 2 },
    ],
];

const flipX = (slots: BlockSlot[]) => slots.map(slot => ({ ...slot, x: BLOCK_COLS - slot.x - slot.cols }));
const flipY = (slots: BlockSlot[]) => slots.map(slot => ({ ...slot, y: BLOCK_ROWS - slot.y - slot.rows }));

const hashBlock = (column: number, row: number) => {
    let value = Math.imul(column, 0x9e3779b1) ^ Math.imul(row, 0x85ebca6b);
    value = Math.imul(value ^ (value >>> 15), 0x2c1b3c6d);
    return (value ^ (value >>> 12)) >>> 0;
};

const getBlockTemplate = (column: number, row: number) => {
    const template = ((column + row * 2) % TEMPLATES.length + TEMPLATES.length) % TEMPLATES.length;
    const reflection = hashBlock(column, row) % 4;
    const source = TEMPLATES[template];
    if (reflection === 1) return flipX(source);
    if (reflection === 2) return flipY(source);
    if (reflection === 3) return flipX(flipY(source));
    return source;
};

const mod = (value: number, divisor: number) => ((value % divisor) + divisor) % divisor;

const getPeriod = (itemCount: number) => {
    const blocks = Math.max(1, Math.ceil(Math.max(0, itemCount) / SLOTS_PER_BLOCK));
    const blocksPerRow = blocks <= 1
        ? 1
        : Math.max(1, Math.round(Math.sqrt(FIELD_ASPECT * blocks * BLOCK_ROWS / BLOCK_COLS)));
    return { blocksPerRow, blockRows: Math.ceil(blocks / blocksPerRow) };
};

export const getMediaWallBlockSize = () => ({ width: BLOCK_WIDTH, height: BLOCK_HEIGHT });

export const getMediaWallSlots = (column: number, row: number): MediaWallRect[] => (
    getBlockTemplate(column, row).map((slot, slotIndex) => ({
        key: `${column},${row},${slotIndex}`,
        column,
        row,
        slotIndex,
        x: column * BLOCK_WIDTH + slot.x * PITCH,
        y: row * BLOCK_HEIGHT + slot.y * PITCH,
        width: slot.cols * PITCH - MEDIA_WALL_METRICS.gap,
        height: slot.rows * PITCH - MEDIA_WALL_METRICS.gap,
        area: slot.cols * slot.rows,
    }))
);

export const getMediaWallTiles = (
    itemCount: number,
    bounds: MediaWallBounds,
    overscan = 420,
): MediaWallTile[] => {
    if (itemCount <= 0) return [];
    const period = getPeriod(itemCount);
    const visible = {
        left: bounds.left - overscan,
        right: bounds.right + overscan,
        top: bounds.top - overscan,
        bottom: bounds.bottom + overscan,
    };
    const fromColumn = Math.floor(visible.left / BLOCK_WIDTH);
    const toColumn = Math.floor(visible.right / BLOCK_WIDTH);
    const fromRow = Math.floor(visible.top / BLOCK_HEIGHT);
    const toRow = Math.floor(visible.bottom / BLOCK_HEIGHT);
    const tiles: MediaWallTile[] = [];

    for (let row = fromRow; row <= toRow; row += 1) {
        for (let column = fromColumn; column <= toColumn; column += 1) {
            const blockIndex = mod(row, period.blockRows) * period.blocksPerRow + mod(column, period.blocksPerRow);
            for (const rect of getMediaWallSlots(column, row)) {
                if (rect.x >= visible.right || rect.x + rect.width <= visible.left || rect.y >= visible.bottom || rect.y + rect.height <= visible.top) continue;
                tiles.push({ rect, itemIndex: (blockIndex * SLOTS_PER_BLOCK + rect.slotIndex) % itemCount });
                if (tiles.length >= MAX_RENDERED_TILES) return tiles;
            }
        }
    }
    return tiles;
};

/**
 * Rect of the copy of `itemIndex` nearest to `near` (world units). Used to restore the
 * session's last opened track, and to move keyboard focus onto the filtered wall.
 */
export const getMediaWallItemRect = (
    itemCount: number,
    itemIndex: number,
    near: { x: number; y: number } = { x: 0, y: 0 },
): MediaWallRect | null => {
    if (itemCount <= 0) return null;
    const period = getPeriod(itemCount);
    const index = mod(itemIndex, itemCount);
    const blockOffset = Math.floor(index / SLOTS_PER_BLOCK) % (period.blocksPerRow * period.blockRows);
    const slotIndex = index % SLOTS_PER_BLOCK;
    const baseColumn = blockOffset % period.blocksPerRow;
    const baseRow = Math.floor(blockOffset / period.blocksPerRow);
    const repeatX = Math.round((near.x / BLOCK_WIDTH - baseColumn) / period.blocksPerRow);
    const repeatY = Math.round((near.y / BLOCK_HEIGHT - baseRow) / period.blockRows);
    const column = baseColumn + repeatX * period.blocksPerRow;
    const row = baseRow + repeatY * period.blockRows;
    return getMediaWallSlots(column, row)[slotIndex] ?? null;
};
