const e2p = (s) => s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const p2e = (s) =>
  s.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

// const sp = (number) => {
//   const seperatedNumber = number
//     .toString()
//     .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
//   const joinedNumber = seperatedNumber.join(",");
//   return e2p(joinedNumber);
// };
const sp = (number) => {
  const integerPart = Math.floor(number).toString();
  const separatedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return e2p(separatedInteger);
};

export { e2p, p2e, sp };
