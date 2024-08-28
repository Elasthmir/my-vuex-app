<style>
  body{
    background-image: radial-gradient(circle, #fff 10%, #ccc);
    padding: 0px;
    margin: 0px;
    box-sizing: border-box;
  }
  .content{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
<template>
  <div class="content">
    <InputForm />
    <DisplayData />
  </div>
</template>

<script>
import InputForm from '~/components/InputForm.vue';
import DisplayData from '~/components/DisplayData.vue';

export default {
  components: {
    InputForm,
    DisplayData
  },
  async fetch({ store }) {
    await store.dispatch('fetchData');
  }
};
</script>
