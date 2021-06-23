<template>
  <div id="board" style="width: 400px"></div>
  <h1>Superman23</h1>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { Chess } from 'chess.js';
import useChess from '../composables/useChess';
import useBestMove from '../composables/useBestMove';

export default defineComponent({
  setup() {
    let boardObject = { board: null };

    const game = new Chess();

    // TODO put this into useChess
    const renderMoveHistory = (moves) => {
      console.log(moves);
    };

    const { makeBestMove } = useBestMove(boardObject, game, renderMoveHistory);
    useChess(boardObject, game, renderMoveHistory, makeBestMove);

    console.log(boardObject);
  },
});
</script>
