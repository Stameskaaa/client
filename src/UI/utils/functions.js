export const sentenceDivision = (sentence) => {
  const name = sentence.substring(0, sentence.indexOf(' '));
  const changedSentece = sentence.substring(sentence.indexOf(' ') + 1);
  return [name, changedSentece];
};
