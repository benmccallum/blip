function giveGrade (score) {
  if (score < 10) return 'F';
  if (score < 20) return 'E';
  if (score < 50) return 'D';
  if (score < 75) return 'C';
  if (score < 90) return 'B';
  return 'A';
}

export const mozillaObservatoryResult = function () {
  var score = Math.floor(Math.random() * 100);
  return {
    score: score,
    grade: giveGrade(score),
    tests_passed: 5,
    tests_quantity: 10
  };
};
