//保留n位小数
export default function roundFun(value = 0, n = 0) {
  return Math.round(value * 10 ** n) / 10 ** n;
}
