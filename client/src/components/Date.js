export function displayDate(inputDate) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputDate)
  return [pad(d.getUTCDate()), pad(d.getUTCMonth()+1), d.getUTCFullYear()].join('/')
}
