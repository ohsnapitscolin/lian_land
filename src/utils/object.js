export function next(object, value) {
  let values = Object.values(object);
  let nextIndex = values.indexOf(value) + 1;
  if (nextIndex === values.length) nextIndex = 0;
  return values[nextIndex];
}
