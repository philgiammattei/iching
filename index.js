let changeLinesToggled = false;

const generateReading = () => {
  //reset from previous readings
  const hexagram = document.getElementById('hexagram');
  while (hexagram.hasChildNodes()) {
    hexagram.removeChild(hexagram.firstChild);
  }

  const lineReadings = [];
  for (let line = 0; line < 6; line++) {
    numberOfStalks = 50;
    numberOfStalks--;

    const firstResult = resolveSeparation(numberOfStalks);
    numberOfStalks -= firstResult;
    const secondResult = resolveSeparation(numberOfStalks);
    numberOfStalks -= secondResult;
    const thirdResult = resolveSeparation(numberOfStalks);

    const finalResult =
      (firstResult === 9 ? 2 : 3) +
      (secondResult === 8 ? 2 : 3) +
      (thirdResult === 8 ? 2 : 3);

    switch (finalResult) {
      case 6:
        lineReadings.push('old yin');
        //lineReadings.push('yin');
        break;

      case 7:
        lineReadings.push('young yang');
        //lineReadings.push('yang');
        break;
      case 8:
        lineReadings.push('young yin');
        //lineReadings.push('yin');
        break;
      case 9:
        lineReadings.push('old yang');
      //lineReadings.push('yang');

      default:
        break;
    }
  }

  console.log(lineReadings);
  drawHexagram(lineReadings);
};

const drawHexagram = (lineReadings) => {
  const hexagram = document.getElementById('hexagram');
  lineReadings.forEach((lineReading) => {
    let lineText;
    switch (lineReading) {
      case 'old yang':
        lineText = '---o---';
        break;
      case 'young yang':
        lineText = '--------';
        break;
      case 'old yin':
        lineText = '---x---';
        break;
      case 'young yin':
        lineText = '---  ---';
        break;
      default:
        lineText = 'error';
        break;
    }
    const textElement = document.createElement('h2');
    const textNode = document.createTextNode(lineText);
    textElement.appendChild(textNode);
    hexagram.prepend(textElement);
  });
};

const resolveSeparation = (numberOfStalks) => {
  let left = Math.ceil(Math.random() * (numberOfStalks - 10)) + 5;
  let right = numberOfStalks - left;

  //Pick up a yarrow stalk from the pile on the RIGHT, and put it between the little finger and the ring finger of the LEFT hand. This is the 2nd stalk.
  const stalksBetweenRingAndLittleFingersOfLeftHand = 1;
  right--;

  //Pick up the remaining yarrow stalks from the pile on the LEFT with your LEFT hand.
  //Remove 4 stalks at a time from the LEFT hand, and put them on the table, in individual piles of 4 stalks each. This process is stopped when there are 4 or less stalks left. Put these remaining stalks held on the LEFT hand between the ring finger and the middle finger of the LEFT hand.
  while (left > 4) {
    left -= 4;
  }
  const stalksBetwenMiddleAndRingFingersOfLeftHand = left;

  //Now, pick up the RIGHT hand heap, and sort it by fours in the same way,
  //placing the remainder into the next gap between your fingers.
  while (right > 4) {
    right -= 4;
  }
  const stalksBetwenIndexAndMiddleFingersOfLeftHand = right;

  //Count the stalks you are holding in your LEFT hand. This first total is either 5 or 9. (The various possibilities are 1+4+4, or 1+3+1, or 1+2+2, or 1+1+3.)
  return (
    stalksBetwenIndexAndMiddleFingersOfLeftHand +
    stalksBetwenMiddleAndRingFingersOfLeftHand +
    stalksBetweenRingAndLittleFingersOfLeftHand
  );
};



document.querySelector('#generate-reading').addEventListener('click', generateReading);