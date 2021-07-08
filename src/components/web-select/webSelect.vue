<template>
  <div class="web_select">
    <input
      :value="displayValue"
      @click="showOptions()"
      :disabled="disabled"
      :placeholder="placeholder"
      type="text"
      readonly="readonly"
    />
  </div>
</template>

<script>
  export default {
    name: "WebSelect",
    data() {},
    watch: {},
    created() {},
    methods: {},
  };
</script>

<style scoped>

</style>
