<template>
  <label class="button">
    <input type="checkbox">
    <span></span>
    <span></span>
    <span></span>
  </label>
</template>

<script>
  export default {
    name: 'slideButton'
  }
</script>

<style scoped>
  .button {
    display: block;
    position: relative;
    left: 50%;
    width: 42px;
    height: 20px;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 40px;
  }
  .button span {position: absolute;display: block;}
  .button span:first-of-type {
    z-index: 100;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    background: #ffffff;
    border-radius: 36px;
    transition: right 400ms cubic-bezier(1, 0, 0, 1);
  }
  .button span:nth-last-of-type(-n+2) {
    z-index: 0;
    width: 32px;
    height: 20px;
    transition: opacity 800ms ease 100ms;
    -webkit-transition: opacity 800ms ease 100ms;
  }
  .button span:nth-last-of-type(-n+2):after {}
  .button span:nth-of-type(2) {
    left: 0;
    background: linear-gradient(90deg, #409eff 100%, transparent 0%);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    opacity: 2;
  }
  .button span:nth-of-type(2):after {left: 22px;}
  .button span:last-of-type {
    right: 0;
    background: linear-gradient(90deg,#dcdfe6 100%, transparent 0%);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    opacity: 0;
  }
  .button span:last-of-type:after {right: 22px;}
  .button input[type="checkbox"] {display: none;}
  .button input[type="checkbox"]:checked ~ span:first-of-type {right: 22px;}
  .button input[type="checkbox"]:checked ~ span:nth-of-type(2) {opacity: 0.2;}
  .button input[type="checkbox"]:checked ~ span:last-of-type {opacity: 1;}
</style>
