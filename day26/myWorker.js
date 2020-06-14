self.onmessage = function ({ data: colorArray }) {
  const redAve = getAveColor(colorArray, 0);
  const greenAve = getAveColor(colorArray, 1);
  const blueAve = getAveColor(colorArray, 2);
  self.postMessage(`rgb(${redAve},${greenAve},${blueAve})`);
};

function getAveColor(colorArray, offset) {
  let sumColor = 0;
  for (let i = offset; i < colorArray.length; i += 4) {
    sumColor += colorArray[i];
  }

  return Math.round(sumColor / (colorArray.length / 4));
}
