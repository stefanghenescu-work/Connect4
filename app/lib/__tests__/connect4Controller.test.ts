import { Connect4Controller } from "../connect4Controller";

describe("Connect4Controller", () => {
  describe("makeMove", () => {
    it("should fill a 1x1 grid when making a move in column 0", () => {
      const controller = new Connect4Controller(1, 1);
      controller.newGame();

      const status = controller.makeMove(0);

      expect(status).not.toBeNull();
      expect(status?.board[0][0]).toBe(1);
    });
  });

  describe("makeMove over a piece of the other player", () => {
    it("should put a piece over another one if same column is selected by 2 players", () => {
      const controller = new Connect4Controller(2, 2);
      controller.newGame();

      const status = controller.makeMove(0);
      const statusOverLastPiece = controller.makeMove(0);

      expect(status).not.toBeNull();
      expect(status?.board[1][0]).toBe(1);

      expect(statusOverLastPiece).not.toBeNull();
      expect(statusOverLastPiece?.board[0][0]).toBe(2);
    });
  });

  describe("makeMove outside of the grid", () => {
    it("should not change the grid or the current player turn", () => {
      const controller = new Connect4Controller(1, 1);
      controller.newGame();

      const status = controller.makeMove(-1);

      expect(status).not.toBeNull();
      expect(status?.board[0][0]).toBe(0);
      expect(status?.currentPlayer).toBe(1);
    });
  });

  describe("makeMove on full column", () => {
    it("should not change the grid or the current player turn", () => {
      const controller = new Connect4Controller(1, 1);
      controller.newGame();

      const status = controller.makeMove(0);
      const statusFullRow = controller.makeMove(0);

      expect(status).not.toBeNull();
      expect(status?.board[0][0]).toBe(1);

      expect(statusFullRow).not.toBeNull();
      expect(statusFullRow?.board[0][0]).toBe(1);
      expect(statusFullRow?.currentPlayer).toBe(2);
    });
  });

  describe("makeMove change player", () => {
    it("should change the current player turn after one placed the counter", () => {
      const controller = new Connect4Controller(2, 2);
      controller.newGame();

      const status = controller.makeMove(0);
      const statusChangePlayer = controller.makeMove(1);

      expect(status?.currentPlayer).toBe(2);

      expect(statusChangePlayer?.currentPlayer).toBe(1);
    });
  });
});
