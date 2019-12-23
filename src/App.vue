<template>
  <div id="app" :style="`background-color: ${backgroundColor};`">
    <Alert v-show="unsupportedBrowser">
      Uh-oh! Your browser doesn't support web audio.
      Don't worry, Upgrade your browser today!
      <a
        href="https://browsehappy.com/"
        target="_blank"
        rel="noopener noreferrer"
      >Please Check Here.</a>.
    </Alert>
    <Tuner @unsupported-browser="onUnsupportedBrowser" @cents-changed="onCentsChanged" />
    <Spectrogram @unsupported-browser="onUnsupportedBrowser"/>
  </div>
</template>

<script>
import Alert from "./components/Alert";
import Tuner from "./components/Tuner";
import Spectrogram from "./components/Spectrogram";

export default {
  name: "app",
  components: {
    Alert,
    Tuner,
    Spectrogram
  },
  data() {
    return {
      backgroundColor: "#2c0",
      unsupportedBrowser: false
    };
  },
  methods: {
    onUnsupportedBrowser() {
      this.unsupportedBrowser = true;
    },
    onCentsChanged(cents) {
      this.backgroundColor = Math.abs(cents) > 10 ? "#c20" : "#2c0";
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #e7ebf0;
  height: 100vh;
  width: 100vw;
  margin: 0;
}
</style>
