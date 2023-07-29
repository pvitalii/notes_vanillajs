export function dateParse(content) {
  const dates = content.match(/((0[0-9]|[0-9])|[12][0-9]|3[01])\/((0[1-9]|[1-9])|1[1,2])\/(19|20)\d{2}/g);
  return dates;
}