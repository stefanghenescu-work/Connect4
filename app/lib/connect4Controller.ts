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

  private changePlayer(): void {
    switch (this.currentPlayer) {
      case 1:
        this.currentPlayer = 2;
        break;

      case 2:
        this.currentPlayer = 1;
        break;
    }
  }

  public newGame(): GameStatus {
    this.board = this.initializeBoard();
    this.currentPlayer = 1;
    this.gameState = "ongoing";
    return this.getStatus();
  }

  public makeMove(column: number): GameStatus | null {
    // validate column
    if (column < 0 || column >= this.width)
      return null;

    // find lowest row available in the column
    let minRowIndex = -1;
    
    for (let i = this.height - 1; i >= 0; i--) {
      if (this.board[i][column] == 0) {		// empty space
        minRowIndex = i;
				break;
				// I can break because I start searching from bottom
			}
    }

		if (minRowIndex === -1) // column is full
			return null;
    
		// place a counter
		this.board[minRowIndex][column] = this.currentPlayer;
		
		console.log("Dropping a token into a column:", column);

    // change player's turn
    this.changePlayer();

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
