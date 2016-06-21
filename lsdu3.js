var q = [
  [38,1,4,4],
  [9,2,2,5],
  [36,3,8],
  [0,7,14],
  [38,1,1]
], maxLength = 17 // недостаточно информации для большей длины

function chaikaEncode(str) {
  str = str.replace(/\s/g, '')
  if(str.length > maxLength)
    return {error: 'Строка не может быть длиннее '+maxLength+' символов'}
  str = str.toUpperCase()
  var chars = str.split(''), blocks = []
  for (var i = 0; i < chars.length; i++) {
    var char = chars[i]
    var code = char.charCodeAt()
    if(code === 1025 || (code >= 1040 && code <= 1071)) { //русский алфавит
      // 1025 это буква Ё
      if(code > 1046) code++
      if(code === 1025) code = 1046
      chars[i] = code - 1030
    }
    else {
      code = +char
      console.log(char, code, isNaN(code))
      if(!isNaN(code))
        chars[i] = code
      else return {error: 'Недопустимые символы'}
    }
  }
  for(var pos = 0; pos <= 4; pos++) {
    blocks[pos] = []
    for(i = 0; i <= 3; i++) {
      var offset = i * 5
      if(chars[pos+offset])
        blocks[pos].push(chars[pos+offset])
    }
  }
  var sums = []
  for (var i = 0; i < blocks.length; i++) {
    sums[i] = 0
    blocks[i].forEach(function(num, j) {
      sums[i] += num * q[i][j]
    })
  }
  var res = ""
  sums.forEach(function(sum) {
    var rem = sum % 43
    if(rem < 10)
      res += rem
    else {
      var code = rem + 1030
      if(code === 1046) code = 1025
      if(code > 1046) code--
      res += String.fromCharCode(code)
    }
  })
  return {
    error: false,
    result: res
  }
}
