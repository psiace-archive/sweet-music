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
    <div>
      <Tuner @unsupported-browser="onUnsupportedBrowser" @cents-changed="onCentsChanged" />
      <Spectrogram />
    </div>
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
      backgroundColor: "rgb(25, 228, 76)",
      unsupportedBrowser: false
    };
  },
  methods: {
    onUnsupportedBrowser() {
      this.unsupportedBrowser = true;
    },
    onCentsChanged(cents) {
      this.backgroundColor =
        Math.abs(cents) > 10 ? "rgb(248, 17, 17)" : "rgb(25, 228, 76)";
    }
  }
};
</script>

<style>
#app {
  font-family: "Helvetica", Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #3b073ffa;
  height: 100vh;
  width: 100vw;
  margin: 0;
}
</style>
