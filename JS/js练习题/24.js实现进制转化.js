function getNums36 () {
  var nums36 = [];
  for (var i = 0; i < 36; i++) {
    if (i >= 0 && i <= 9) {
      nums36.push(i);
    } else {
      nums36.push(String.fromCharCode(i + 87));
    }
  }
  return nums36;
}

//十进制数转成36进制
function scale36 (n) {
  var arr = [];
  var nums36 = getNums36();
  while (n) {
    var res = n % 36;
    //作为下标，对应的36进制数，转换成
    arr.unshift(nums36[res]);
    //去掉个位
    n = parseInt(n / 36);
  }
  return arr.join("");
}