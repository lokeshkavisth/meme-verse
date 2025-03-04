export function getRandomDateISO() {
  const today = new Date();
  const randomTime = Math.random() * today.getTime(); // Random time up to now
  const randomDate = new Date(randomTime);
  return randomDate.toISOString();
}
