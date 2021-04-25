export function minMax(items) {
  return items.reduce((acc, val) => {
    acc[0] = (acc[0] === undefined || val < acc[0]) ? val : acc[0];
    acc[1] = (acc[1] === undefined || val > acc[1]) ? val : acc[1];
    return acc;
  }, []);
}
