let audioElement,
  audioCtx,
  analyser,
  source,
  bufferLength,
  dataArray,
  frameID,
  myContainer = []; //存储 需保持的图形(会动的)
const canvas = document.querySelector("canvas");
const canvasCtx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvasCtx.save();
function initAudio() {
  //获取媒体元素,用来生成声音源
  audioElement = document.querySelector("audio");
  // 设置允许跨域,audioContext连接对跨域有限制
  audioElement.crossOrigin = "anonymous";
  audioCtx = new AudioContext();
  //利用接口得到分析器
  analyser = audioCtx.createAnalyser();
  //得到音源
  source = audioCtx.createMediaElementSource(audioElement);
  // source=>middle
  source.connect(analyser);
  //middle=>termial
  analyser.connect(audioCtx.destination);
  // 设置傅里叶变化的参数,用来设置分析范围
  analyser.fftSize = 128;
  //根据范围得到不同音频的数量的长度
  bufferLength = analyser.frequencyBinCount;
  //生成8位为一个item,长度为bufferLength的array
  dataArray = new Uint8Array(bufferLength);
}

function drawBar() {
  canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  const bar_w = canvas.width / bufferLength;
  for (let i = 0; i < bufferLength; i++) {
    let bar_x = i * bar_w;
    let bar_h = (dataArray[i] / 255) * canvas.height;
    let bar_y = canvas.height - bar_h;
    canvasCtx.fillStyle = `green`;
    canvasCtx.fillRect(bar_x, bar_y, bar_w, bar_h);
  }
}

function drawCircleBar() {
  canvasCtx.clearRect(
    -canvas.width,
    -canvas.height,
    2 * canvas.width,
    2 * canvas.height
  );
  const bar_w = canvas.width / bufferLength;
  for (let i = 0; i < bufferLength; i++) {
    canvasCtx.rotate(Math.PI / (bufferLength / 2));
    let bar_x = 0;
    let bar_h = ((dataArray[i] / 255) * canvas.height) / 2;
    let bar_y = -60 - bar_h;
    canvasCtx.fillStyle = `rgba(98, 233, 121, ${i / 100 + 0.3})`;
    canvasCtx.fillRect(bar_x, bar_y, bar_w, bar_h);
  }
}

// musicBall
class MusicBall {
  constructor(x, y, speedX, speedY, radius, color) {
    this.x = x;
    this.y = y;
    this.SpdX = speedX;
    this.SpdY = speedY;
    this.radius = radius;
    this.color = color;
  }
  static create(bufferLength, container, detail) {
    for (let i = 0; i < bufferLength; i++) {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height;
      let speedX = (Math.random() - 0.5) * 1;
      let speedY = (Math.random() - 0.5) * 1;
      let color =
        detail.colorList[Math.floor(Math.random() * detail.colorList.length)];
      let radius = 0;
      container.push(new MusicBall(x, y, speedX, speedY, radius, color));
    }
  }

  static drawBall() {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    myContainer.forEach((ball, index) => ball.update(dataArray[index]));
  }
  draw() {
    canvasCtx.beginPath(); //开始绘制

    canvasCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    canvasCtx.fillStyle = this.color;
    canvasCtx.fill();
  }
  update(frequencyVolume) {
    this.draw();
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.SpdX = -this.SpdX;
      this.x = this.x + this.SpdX;
    }
    if (this.y + this.radius > canvas.heyight || this.y - this.radius < 0) {
      this.SpdY = -this.SpdY;
      this.y = this.y + this.SpdY;
    }
    this.x = this.x + this.SpdX;
    this.y = this.y + this.SpdY;
    this.radius = frequencyVolume - 90 > 0 ? (frequencyVolume - 90) * 1.5 : 0;
  }
}

function rockMusic(drawFnc) {
  // requestAnimationFrame 保证与屏幕刷新率一致,在每次执行时绘制canvas数据
  frameID = requestAnimationFrame(rockMusic.bind(this, drawFnc));
  analyser.getByteFrequencyData(dataArray);
  drawFnc();
}

window.onload = () => initAudio();

document.querySelector(".normalBar").addEventListener("click", () => {
  canvasCtx.restore();
  canvasCtx.save();
  frameID ? cancelAnimationFrame(frameID) : "";
  audioCtx.resume().then(() => rockMusic(drawBar));
});
document.querySelector(".circleBar").addEventListener("click", () => {
  //由于做环绕图形需要移动画布,所以每次更改图形时需要恢复画布
  canvasCtx.restore();
  canvasCtx.save();
  frameID ? cancelAnimationFrame(frameID) : "";
  canvasCtx.translate(canvas.width / 2, canvas.height / 2);
  audioCtx.resume().then(() => rockMusic(drawCircleBar));
});
document.querySelector(".ball").addEventListener("click", () => {
  canvasCtx.restore();
  canvasCtx.save();
  MusicBall.create(bufferLength, myContainer, {
    colorList: ["#F7B2B78a", "#F7717D8a", "#DE639A8a", "#7F29828a", "#16001E8a"]
  });
  frameID ? cancelAnimationFrame(frameID) : "";
  audioCtx.resume().then(() => rockMusic(MusicBall.drawBall));
});

document.querySelector("audio").addEventListener("pause", () => {
  frameID ? cancelAnimationFrame(frameID) : "";
});
