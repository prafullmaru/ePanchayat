export function manageProcessProgress(entity) {
  const interval = setInterval(() => {
    if (entity.processProgress <= 95) {
      entity.processProgress += Math.floor(Math.random() * (3 - 5)) + 8;
    } else if (entity.processProgress > 95 && entity.processProgress < 99) {
      entity.processProgress++;
    } else {
      entity.processProgress = 75;
    }
  }, 1000);

  return () => clearInterval(interval);
}
