const countLetters = (tasks) => {
  return tasks.reduce(
      (total, task) => total + task.replace(/\s/g, '').length,
      0
  );
}

module.exports = { countLetters };