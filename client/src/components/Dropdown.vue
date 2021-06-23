<template>
  Search Depth: {{ depth }}
  <select v-model="depth" @change="emitDepth">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3" selected>3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'Dropdown',
  setup(props, ctx) {
    const depth = ref('3');
    const emitDepth = () => {
      ctx.emit('depth', depth.value);
    };

    return {
      depth,
      emitDepth,
    };
  },
});
</script>

<style></style>
