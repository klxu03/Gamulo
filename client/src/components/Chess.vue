<template>
  <div id="board1" style="width: 400px"></div>
  <h1>Superman</h1>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import ChessBoard from 'chessboardjs-vue';

export default defineComponent({
  setup() {
    onMounted(() => {
      const config = {
        position: 'start',
      };

      ChessBoard('board1', config);
    });
  },
});
</script>
