<template>
  <div id="app" class="app">
    <AppHeader />
    <router-view></router-view>
    <AppFooter />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import AppHeader from './components/AppHeader'
  import AppFooter from './components/AppFooter'
  import SymptomAdviser from './components/SymptomAdviser'

  export default {
    name: 'App',
    computed: {
      ...mapState({
        isError: state => state.api.isError
      })
    },
    components: {
      AppHeader,
      AppFooter,
      SymptomAdviser,
      Error
    }
  }
</script>

<style lang="scss">
  body {
    display: flex;
    flex: 1;
    min-height: 100vh;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
  }

  .app {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
  }
</style>
