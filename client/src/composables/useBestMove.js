import $ from 'jquery';

export default function useBestMove(boardObject, game, renderMoveHistory) {
  // The first, root case. Do the first depth right here
  var minimaxRoot = function (depth, game, isMaximisingPlayer) {
    var newGameMoves = game.moves();
    var bestMove = -9999;
    var bestMoveFound;

    for (var i = 0; i < newGameMoves.length; i++) {
      var newGameMove = newGameMoves[i];
      game.move(newGameMove); // Makes a move
      var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer); // We are essentially doing the first depth already because we're doing every single move
      // Also always !isMaximisingPlayer since this is the bot. Bot is black. Black wants negative score
      game.undo();
      if (value >= bestMove) {
        // Just get the one that yields the best results
        bestMove = value;
        bestMoveFound = newGameMove;
      }
    }
    return bestMoveFound;
  };

  var minimax = function (depth, game, alpha, beta, isMaximisingPlayer) {
    positionCount++; // Literally something just for the data at the bottom

    if (depth === 0) {
      // Base case of this recursion
      return -evaluateBoard(game.board());
    }

    var newGameMoves = game.moves();

    if (isMaximisingPlayer) {
      var bestMove = -9999;
      for (var i = 0; i < newGameMoves.length; i++) {
        game.move(newGameMoves[i]);
        bestMove = Math.max(
          bestMove,
          minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer)
        );
        game.undo();
        alpha = Math.max(alpha, bestMove);

        // The extra alpha-beta pruning magic
        if (beta <= alpha) {
          return bestMove;
        }
      }
      return bestMove;
    } else {
      // Always on the else statement because bot is black
      var bestMove = 9999;
      for (var i = 0; i < newGameMoves.length; i++) {
        game.move(newGameMoves[i]);
        bestMove = Math.min(
          bestMove,
          minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer)
        );
        game.undo();

        // The extra alpha-beta pruning magic
        if (beta <= alpha) {
          return bestMove;
        }
      }
      return bestMove;
    }
  };

  var reverseArray = function (array) {
    return array.slice().reverse();
  };

  var pawnEvalWhite = [
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
    [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
    [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
    [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
    [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
    [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
  ];

  var pawnEvalBlack = reverseArray(pawnEvalWhite);

  var knightEval = [
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
    [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
    [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
    [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
    [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
    [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
    [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
    [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
  ];

  var bishopEvalWhite = [
    [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
    [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
    [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
    [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
    [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
    [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
  ];

  var bishopEvalBlack = reverseArray(bishopEvalWhite);

  var rookEvalWhite = [
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0],
  ];

  var rookEvalBlack = reverseArray(rookEvalWhite);

  var evalQueen = [
    [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
    [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
    [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
    [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
  ];

  var kingEvalWhite = [
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
    [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0],
  ];

  var kingEvalBlack = reverseArray(kingEvalWhite);

  const evaluateBoard = (board) => {
    let totalEvaluation = 0;
    for (let i = 0; i < 8; i++) {
      for (let i2 = 0; i2 < 8; i2++) {
        totalEvaluation = totalEvaluation + getPieceValue(board[i][i2], i, i2);
      }
    }

    return totalEvaluation;
  };

  const getPieceValue = (piece, i, i2) => {
    if (piece === null) {
      return 0;
    }

    const pieceValues = {
      p: 10,
      r: 50,
      n: 30,
      b: 30,
      q: 90,
      k: 900,
    };

    const locationValues = {
      p: {
        white: pawnEvalWhite,
        black: pawnEvalBlack,
      },
      r: {
        white: rookEvalWhite,
        black: rookEvalBlack,
      },
      n: {
        white: knightEval,
        black: knightEval,
      },
      b: {
        white: bishopEvalWhite,
        black: bishopEvalBlack,
      },
      q: {
        white: evalQueen,
        black: evalQueen,
      },
      k: {
        white: kingEvalWhite,
        black: kingEvalBlack,
      },
    };

    var value = pieceValues[piece.type];
    const color = piece.color === 'w' ? 'white' : 'black';
    value += parseInt(locationValues[piece.type][color][i][i2]);

    //console.log('locationValues', locationValues[piece.type][color][i2][i]);

    return piece.color === 'w' ? value : -value;
  };

  var makeBestMove = function () {
    var bestMove = getBestMove(game);
    console.log('bestMove', bestMove); // Shown in a form from ASCII number to another ASCII number

    // Should uncomment the line under me and comment 2 lines under
    // game.ugly_move(bestMove);
    console.log('game.move(bestMove);', game.move(bestMove)); // Actually go ahead and make the move using the ugly_move(move) function

    // game.fen() goes ahead and generates the board configuration with Forsynth-Edwards Notation

    boardObject.board.position(game.fen());

    console.log('boardObject.board.position', boardObject.board.position);

    renderMoveHistory(game.history()); // After the bot makes a move, render it into the move history and add it into the table
    if (game.game_over()) {
      alert('Game over, the bot won');
    }
  };

  let positionCount;
  var getBestMove = function (game) {
    if (game.game_over()) {
      alert('Game over, you won!');
    }

    positionCount = 0;
    // const depth = parseInt($('#search-depth').find(':selected').text());
    const depth = 3;

    const d = new Date().getTime();
    const bestMove = minimaxRoot(depth, game, true);
    const d2 = new Date().getTime();
    const moveTime = d2 - d;
    $('#position-count').text(positionCount);
    $('#time').text(moveTime / 1000 + 's');

    return bestMove;
  };

  return {
    makeBestMove,
  };
}
