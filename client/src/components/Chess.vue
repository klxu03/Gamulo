<template>
  <h3>Gamulo</h3>
  <div id="board" style="width: 400px; margin: auto"></div>
  <Dropdown @depth="setDepth($event)" />
  <div>Position: {{ positionCount }}</div>
  <div>Time that move: {{ time.move / 1000 }}s</div>
  <div>Time left: {{ time.left / 1000 }}s</div>
  <table>
    <tr>
      <th>White (You)</th>
      <th>Black (Bot)</th>
    </tr>
    <tr v-for="(move, i) in moves" :key="i">
      <th>{{ move[i].player }}</th>
      <th>{{ move[i].bot }}</th>
    </tr>
  </table>
</template>

<script>
// Libraries
import { ref, reactive, defineComponent } from 'vue';
import { Chess } from 'chess.js';

// Components
import Dropdown from '../components/Dropdown.vue';

// Composables
import useChess from '../composables/useChess';
import useBestMove from '../composables/useBestMove';

export default defineComponent({
  name: 'Chess',
  components: {
    Dropdown,
  },
  setup() {
    let boardObject = { board: null };
    const depth = ref('3');
    const positionCount = ref(0);
    const time = reactive({
      left: 10 * 60 * 1000,
      move: 0,
    });
    const moves = ref([]);
    // const time = ref(1500);

    const game = new Chess();

    // TODO put this into useChess
    const renderMoveHistory = (input, isPlayer) => {
      const latestMove = input[input.length - 1];
      console.log('Move played', latestMove);
      let move = {
        player: '-',
        bot: '-',
      };
      if (isPlayer) {
        move.player = latestMove;
        console.log('move', move);

        moves.value.push(move);
      } else {
        move.player = input[input.length - 2];
        move.bot = latestMove;
        console.log('move', move);

        moves.value.pop();
        moves.value.push(move);
      }
      console.log('moves.value', moves.value);
    };

    const setDepth = (val) => {
      depth.value = val;
      console.log('new depth.value', depth.value);
    };

    const getDepth = () => {
      return depth.value;
    };

    const { makeBestMove } = useBestMove(
      boardObject,
      game,
      renderMoveHistory,
      getDepth,
      positionCount,
      time
    );

    useChess(boardObject, game, renderMoveHistory, makeBestMove);

    console.log(boardObject);

    return {
      setDepth,
      positionCount,
      time,
      moves,
    };
  },
});
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 60%;
  margin: 0 auto;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: center;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
