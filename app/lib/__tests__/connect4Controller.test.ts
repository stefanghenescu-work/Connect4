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

    it("should put a piece over another one when same column is selected by 2 players", () => {
      const controller = new Connect4Controller(2, 2);
      controller.newGame();

      controller.makeMove(0);
      const statusOverLastPiece = controller.makeMove(0);

      expect(statusOverLastPiece).not.toBeNull();
      expect(statusOverLastPiece?.board[0][0]).toBe(2);
    });

    it("should not change the grid or the current player turn when outside of the grid", () => {
      const controller = new Connect4Controller(1, 1);
      controller.newGame();

      const status = controller.makeMove(-1);

      expect(status).toBeNull();
      expect(controller.getStatus().currentPlayer).toBe(1);
    });

    it("should not change the grid or the current player turn when column in full", () => {
      const controller = new Connect4Controller(1, 1);
      controller.newGame();

      const status = controller.makeMove(0);
      const statusFullRow = controller.makeMove(0);

      expect(status).not.toBeNull();

      expect(statusFullRow).toBeNull();
      expect(controller.getStatus().currentPlayer).toBe(2);
    });

    it("should change the current player turn after one places the counter", () => {
      const controller = new Connect4Controller(2, 2);
      controller.newGame();

      const status = controller.makeMove(0);
      const statusChangePlayer = controller.makeMove(1);

      expect(status?.currentPlayer).toBe(2);

      expect(statusChangePlayer?.currentPlayer).toBe(1);
    });
  });
});
