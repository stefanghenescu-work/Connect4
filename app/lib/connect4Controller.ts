export type GameState = "ongoing" | "won" | "draw" | "idle";
export type Player = 0 | 1 | 2; // 0 = empty, 1 = player 1, 2 = player 2

export interface GameStatus {
  state: GameState;
  winner?: Player;
  currentPlayer: Player;
  board: Player[][];
}

export class Connect4Controller {
  public width: number;
  private height: number;
  private board: Player[][];
  private currentPlayer: Player = 1;
  private gameState: GameState = "idle";

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.board = this.initializeBoard();
  }

  private initializeBoard(): Player[][] {
    return Array.from({ length: this.height }, () => Array(this.width).fill(0));
  }

  private countCountersInDirection(
    row: number,
    col: number,
    dx: number,
    dy: number,
    player: Player,
  ): number {
    if (row < 0 || row >= this.height || col < 0 || col >= this.width) {
      return 0;
    }

    if (this.board[row][col] !== player) {
      return 0;
    }

    return (
      this.countCountersInDirection(row + dx, col + dy, dx, dy, player) + 1
    );
  }

  private changeGameState(anyWinner: boolean): void {
    if (anyWinner) {
      this.gameState = "won";
    } else {
      this.gameState = "draw";

      for (let col = 0; col < this.width; col++) {
        if (this.board[0][col] === 0) {
          this.gameState = "ongoing";
          break;
        }
      }
    }
  }

  public checkWin(row: number, col: number, player: Player): boolean {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];

    for (const [dx, dy] of directions) {
      let countConnectedCounters = 1;

      countConnectedCounters += this.countCountersInDirection(
        row + dx,
        col + dy,
        dx,
        dy,
        player,
      );
      countConnectedCounters += this.countCountersInDirection(
        row - dx,
        col - dy,
        -dx,
        -dy,
        player,
      );

      if (countConnectedCounters >= 4) {
        return true;
      }
    }

    return false;
  }

  public newGame(): GameStatus {
    this.board = this.initializeBoard();
    this.currentPlayer = 1;
    this.gameState = "ongoing";
    return this.getStatus();
  }

  public makeMove(column: number): GameStatus | null {
    if (column < 0 || column >= this.width) return null;

    let minRowIndex = -1;

    for (let rowIndex = this.height - 1; rowIndex >= 0; rowIndex--) {
      if (this.board[rowIndex][column] === 0) {
        minRowIndex = rowIndex;
        break;
      }
    }

    if (minRowIndex === -1) return null;

    this.board[minRowIndex][column] = this.currentPlayer;

    console.log("Dropping a token into a column:", column);

    const currentPlayerWon = this.checkWin(
      minRowIndex,
      column,
      this.currentPlayer,
    );
    this.changeGameState(currentPlayerWon);

    if (!currentPlayerWon) {
      this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }

    return this.getStatus();
  }

  public getStatus(): GameStatus {
    return {
      board: this.board,
      state: this.gameState,
      winner: this.gameState === "won" ? this.currentPlayer : undefined,
      currentPlayer: this.currentPlayer,
    };
  }
}
