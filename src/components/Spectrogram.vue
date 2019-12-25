<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    if ("mediaDevices" in navigator) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(stream => {
          const acontext = new (window.AudioContext ||
            window.webkitAudioContext)();
          const source = acontext.createMediaStreamSource(stream);
          var analyser = acontext.createAnalyser();

          source.connect(analyser);
          analyser.connect(acontext.destination);
          analyser.fftSize = 128; //必须是2的整数倍

          var bufferLength = analyser.frequencyBinCount; // = fftSize * 0.5

          //part1: 画布
          var canvas = document.getElementById("canvas");
          var context = canvas.getContext("2d");

          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
          var WIDTH = canvas.width;
          var HEIGHT = canvas.height;

          //part4: 变量
          var barWidth = WIDTH / bufferLength - 1; //间隔1px
          var barHeight;

          var dataArray = new Uint8Array(bufferLength); //8位无符号定长数组

          //part5: 动态监听
          function renderFrame() {
            requestAnimationFrame(renderFrame); //方法renderFrame托管到定时器，无限循环调度，频率<16.6ms/次

            context.fillStyle = "rgb(0, 0, 0)"; //黑色背景
            context.fillRect(0, 0, WIDTH, HEIGHT); //画布拓展全屏,动态调整

            analyser.getByteFrequencyData(dataArray); //获取当前时刻的音频数据

            //part6: 绘画声压条
            var x = 0;
            for (var i = 0; i < bufferLength; i++) {
              var data = dataArray[i]; //int,0~255

              var percentV = data / 255; //纵向比例
              var percentH = i / bufferLength; //横向比例

              barHeight = HEIGHT * percentV;

              //gbk,0~255
              var r = 255 * percentV; //值越大越红
              var g = 255 * percentH; //越靠右越绿
              var b = 80;

              context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
              context.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

              x += barWidth + 1; //间隔1px
            }
          }

          renderFrame();
        })
        .catch(() => {});
    } 
  }
};
</script>

<style scoped>
div {
  filter: alpha(Opacity=80);
  -moz-opacity: 0.5;
  opacity: 0.5;
}
.spectrogram {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  overflow: hidden;
}
#canvas {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>