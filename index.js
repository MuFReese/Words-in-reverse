const inputTitle = document.getElementById('title')
const result = document.getElementById('result')

inputTitle.addEventListener('keyup', event => {
  value = event.target.value
  if ( event.code === 'Enter') {
    if ( inputTitle.value.length === 0) {
      result.style.color = 'red'
      result.innerHTML = 'Напишите что-нибудь!'
    } else {
      result.style.color = 'white'
      result.innerHTML = reverseString(value)
    }
  }
})

function defineSignAndIndex( sign, strSign , index, massiv, indexMassiv) {
  index = massiv[indexMassiv].indexOf(strSign)

  if (index === -1) {
    index = 0
    sign = ''
  } else {
    index = massiv[indexMassiv].length - index
    sign = strSign
  }

  return [index, sign]
}

function defineSign(indexI, indexJ, massiv, stringDefine) {
  if ( massiv[indexI][massiv[indexI].length - 1 - indexJ] === ',') {
    stringDefine = stringDefine
  } else if ( massiv[indexI][massiv[indexI].length - 1 - indexJ]  === '.') {
    stringDefine = stringDefine
  } else {
    stringDefine = stringDefine + massiv[indexI][massiv[indexI].length - 1 - indexJ] 
  }
  return stringDefine
}

function hyphenOrApostrofe(indexF, indexA, newStringSign, massiv, massivIndex, apostropheSign, hyphenSign) {
  if( indexF > indexA) {
    for( let j = indexF; j < massiv[massivIndex].length; j++) {

      newStringSign = defineSign(massivIndex, j, massiv, newStringSign)

    }
    apostropheSign = ''
  } else {
    for( let j = indexA; j < massiv[massivIndex].length; j++) {

      newStringSign = defineSign(massivIndex, j, massiv, newStringSign)

    } 
    hyphenSign = '' 
  }
  return [newStringSign, apostropheSign, hyphenSign]
}

function computedSign( massivComputed, iComputed, newStringComputed, apostropheComputed, hyphenComputed) {
  if ( apostropheComputed === '`') {
    for( let j = massivComputed[iComputed].indexOf('`'); j < massivComputed[iComputed].length; j++) {
      if ( massivComputed[iComputed][j] === ',') {
        newStringComputed = newStringComputed
      } else if ( massivComputed[iComputed][j]  === '.') {
        newStringComputed = newStringComputed 
      } else {
        newStringComputed = newStringComputed + massivComputed[iComputed][j] 
      }
    }
  } else if ( hyphenComputed === '-' ) {
    for( let j = massivComputed[iComputed].indexOf('-'); j < massivComputed[iComputed].length; j++) {
      if ( massivComputed[iComputed][j] === ',') {
        newStringComputed = newStringComputed
      } else if ( massivComputed[iComputed][j]  === '.') {
        newStringComputed = newStringComputed 
      } else {
        newStringComputed = newStringComputed + massivComputed[iComputed][j] 
      }
    }
  }
  return newStringComputed
}

function reverseString(string) {
  let mass = string.split(' ')
  let massivQuotes = []
  let massivString = []
  let massivIQuotes = []
  let iQuotes = 0
  let iString = 0
  for(let i = 0; i < mass.length; i++){

    if ( mass[i][0] === '"') {
      massivQuotes[iQuotes] = mass[i]
      massivIQuotes[iQuotes] = i 
      iQuotes += 1
    } else {
      massivString[iString] = mass[i]
      iString += 1
    }
  }
  iQuotes = 0
  let signComma = ''
  let signDot = ''
  let newString = ''
  let hyphen 
  let indexHyphen
  let indexApostrophe
  let apostrophe

  for( let i = 0; i < massivString.length; i++) {

    if ( massivIQuotes[iQuotes] === massivString.length - i + 1) {
      console.log(massivQuotes[iQuotes])
      newString = newString + massivQuotes[iQuotes] + ' '
      iQuotes += 1
    }

    indexApostrophe = defineSignAndIndex( hyphen, '`', indexHyphen, massivString, i)[0]
    apostrophe = defineSignAndIndex( hyphen, '`', indexHyphen, massivString, i)[1]

    indexHyphen = defineSignAndIndex(hyphen, '-', indexHyphen, massivString, i)[0]
    hyphen = defineSignAndIndex( hyphen, '-', indexHyphen, massivString, i)[1]

    if ( massivString[i][massivString[i].length - 1] === ',') {
      signComma = ','
    } else if ( massivString[i][massivString[i].length - 1] === '.') {
      signDot = '.'
    }

    newString = hyphenOrApostrofe(indexHyphen, indexApostrophe, newString, massivString, i, apostrophe, hyphen)[0]
    apostrophe = hyphenOrApostrofe(indexHyphen, indexApostrophe, newString, massivString, i, apostrophe, hyphen)[1]
    hyphen = hyphenOrApostrofe(indexHyphen, indexApostrophe, newString, massivString, i, apostrophe, hyphen)[2]
  
    newString = computedSign( massivString, i, newString, apostrophe, hyphen)

    signComma === ',' ? newString = newString + signComma + ' ' : newString = newString + signDot + ' '
    signComma = ''
    signDot = ''
    

  }
  inputTitle.value = ''
  return newString.trimEnd()
}