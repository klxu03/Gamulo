import { onMounted } from 'vue';
import $ from 'jquery';
import ChessBoard from 'chessboardjs-vue';

export default function useChess(
  boardObject,
  game,
  renderMoveHistory,
  makeBestMove
) {
  onMounted(() => {
    console.log('onMounted being called');
    var onDragStart = function (source, piece, position, orientation) {
      if (
        game.in_checkmate() === true ||
        game.in_draw() === true ||
        piece.search(/^b/) !== -1
      ) {
        return false;
      }
    };

    var onDrop = function (source, target) {
      var move = game.move({
        from: source,
        to: target,
        promotion: 'q',
      });

      removeGreySquares();
      if (move === null) {
        return 'snapback';
      }

      renderMoveHistory(game.history(), true);
      window.setTimeout(makeBestMove, 250);
    };

    var onSnapEnd = function () {
      boardObject.board.position(game.fen());
    };

    var onMouseoverSquare = function (square, piece) {
      var moves = game.moves({
        square: square,
        verbose: true,
      });

      if (moves.length === 0) return;

      greySquare(square);

      for (var i = 0; i < moves.length; i++) {
        greySquare(moves[i].to);
      }
    };

    var onMouseoutSquare = function (square, piece) {
      removeGreySquares();
    };

    var removeGreySquares = function () {
      $('#board .square-55d63').css('background', '');
    };

    var greySquare = function (square) {
      var squareEl = $('#board .square-' + square);

      var background = '#a9a9a9';
      if (squareEl.hasClass('black-3c85d') === true) {
        background = '#696969';
      }

      squareEl.css('background', background);
    };
    /* Random stuff needed for CSS? ends here */

    // General settings for the board
    const cfg = {
      draggable: true,
      position: 'start',
      onDragStart: onDragStart,
      onDrop: onDrop,
      onMouseoutSquare: onMouseoutSquare,
      onMouseoverSquare: onMouseoverSquare,
      onSnapEnd: onSnapEnd,
    };
    // const cfg = {
    //   position: 'start',
    //   draggable: true,
    // };

    boardObject.board = ChessBoard('board', cfg);
  });
}
