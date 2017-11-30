const R = require('ramda')


// constants to test functions
const hex="#247ef0"
const shortHex="#eef"
const rgb="rgb(36, 126, 240)"
const hsb="hsb(214°, 85%, 94%)"
const hsl="hsl(214°, 87%, 54%)"

const colorCodes = {hex,rgb,hsb,hsl}

// HEX => RGB 
// RGB => HSL
// RGB => HSL 
// HSL => RGB 

// parse functions
const convertHexToDec = hex => parseInt(hex,16)
const convertDecToHex = dec => (+dec).toString(16)

// small helper functions
const splitList = R.split(',')
const joinList = R.join(',')
const joinListClean = R.join("")
const double = val => val + val
const round = val => Math.round(val)


// formatting functions
const unformatHex = R.replace(/[^0-9a-fA-F]/gi, "")
const unformatColor = R.replace(/[^0-9,]/gi,"")

const formatHex = str => "#" + str
const formatRgb = colors => `rgb(${colors[0]},${colors[1]},${colors[2]})` 
const formatHslAndHsb = R.curry( (type,colors) => `${type}(${colors[0] + "°"},${colors[1] + "%"},${colors[2] + "%"})` )

// HEX TO RGB
//========================================================================================//

// hex helper functions
const length6 = str => str.length === 6 ? str : null
const length3 = str => str.length === 3 ? str : null

// hex custom middleware funcs
const checkHexLength = str => length6(str) ? R.splitEvery(2,str) : 
                              length3(str) ? R.map(double,R.split("",str)) : 
                              null



// final hex=>rgb conversion function
const hexToRgb = R.pipe(unformatHex, checkHexLength, R.map(convertHexToDec),formatRgb) // returns string with rgb values

console.log("hex to rgb", hex, hexToRgb(hex) )

// RGB TO HEX
//========================================================================================//

// final rgb=>hex conversion function
const rgbToHex = R.pipe(unformatColor,splitList,R.map(convertDecToHex),joinListClean,formatHex);

console.log("rgb to hex", rgb, rgbToHex(rgb) )


// RGB TO HSL 
//========================================================================================//


// convert rgb to values on a 0-1 scale
//    val / 255 
// find the min and max values of r, g, and b 
// luminace is the average of the max and min values 
//    luminance = (max + min) / 2 
// saturation:
//    if (min === max) saturation = 0 
//    if (r = g = b) there is no hue, hue = 0 
//    if (luminance < 0.5) saturation = (max - min) / (max + min)
//    if (luminance > 0.5) saturation = (max - min) / (2.0 - max - min)
// hue: 
//    if (red is max) hue = (g-b)/(max - min)
//    if (green is max) hue = 2.0 + (b-r)/(max-min)
//    if (blue is max) hue = 4.0 + (r-g)/(max-min)
//    convert to degrees
//      hue = hue * 60 > 0 ? hue * 60 : (hue * 60) + 360


const scaleToDecimal = num => num / 255

const findMin = arr => Math.min(...arr)
const findMax = arr => Math.max(...arr)

const calculateLuminance = (min,max) => (min+max)/2 * 100

const findSaturation = (min,max,luminance) => luminance < 0.5 ? (max-min)/(max+min) * 100 : (max-min)/(max+min) * 100
const calculateSaturation = (min,max,luminance) => R.equals(min,max) ? 0 : findSaturation(min,max,luminance)

const checkForHue = (r,g,b) => r == g && g == b ? false : true
const hueFromRedMax = (r,g,b,min,max) => (g-b)/(max-min)
const hueFromGreenMax = (r,g,b,min,max) => 2.0 + (b-r)/(max-min)
const hueFromBlueMax = (r,g,b,min,max) => 4.0 + (r-g)/(max-min)
const hueToDegrees = hue => hue * 60 > 0 ? hue * 60 : (hue * 60) + 360


const calculateHue = (r,g,b,min,max) => {
  let hue = 0
  if (!checkForHue(r,g,b)) return hue
  if (max == r) {
    hue = hueFromRedMax(r,g,b,min,max)
  } else if (max == g) {
    hue = hueFromGreenMax(r,g,b,min,max)
  } else if (max == b) {
    hue = hueFromBlueMax(r,g,b,min,max)
  }
  if(hue) {
    hue = hueToDegrees(hue)
  }
  return hue
}


// final function
const convertValuesToHsl = rgb => {
  let arr = R.map(scaleToDecimal,rgb)
  const min = findMin(arr)
  const max = findMax(arr)
  
  const hsl = R.map(round, [
                            calculateHue(...arr,min,max),
                            calculateSaturation(min,max,calculateLuminance(min,max)),
                            calculateLuminance(min,max)
                            ])
  console.log(hsl)
  
  return hsl
}

const rgbToHsl = R.pipe(unformatColor,splitList,convertValuesToHsl,formatHslAndHsb('hsl'))

console.log("rgb to hsl", rgb, rgbToHsl(rgb) )

  
  
  
  
  
  // HSL TO RGB
//========================================================================================//

// function hslToRgb(h, s, l){
//     // placeholders for red, green, and blue values
//     var r, g, b;

//     // if there is no saturation, all color values are equal to the lightness
//     if(s === 0){
//         r = g = b = l; // achromatic
//     }else{
//         // 
//         var hue2rgb = function hue2rgb(p, q, t){
//             if(t < 0) t += 1;
//             if(t > 1) t -= 1;
//             if(t < 1/6) return p + (q - p) * 6 * t;
//             if(t < 1/2) return q;
//             if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
//             return p;
//         }

//         var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//         var p = 2 * l - q;
//         r = hue2rgb(p, q, h + 1/3);
//         g = hue2rgb(p, q, h);
//         b = hue2rgb(p, q, h - 1/3);
//     }

//     return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
// }

// if (saturation = 0) 
//      r = g = b = luminance * 255
// if (luminance < 50%) 
//      temp1 = luminance * (saturation+1.0)
// if(luminance > 50%)
//      temp1 = temp1 = luminance + saturation - (luminance * saturation)
// tem2 = (2 * luminance) - temp1
// convert hue to 0-1 value 
//      hue = hue/360
// temporary variables for each color
//      tempR = hue + 1.0/3.0 
//      tempG = hue 
//      tempB = hue - 1.0/3.0 
// Color Check for Each Channel (red used in example)
//      if (tempR * 6 < 1) red = temp2 + (temp1-temp2) * 6 * tempR
//      else if (2 * tempR < 1) red = temp1 
//      else if (3 * tempR < 2) red = temp2 + (temp1 - temp2) * (2.0/3.0-tempR)*6 
//      else red = temp2 
// Convert colors to 8 bit by multiplying by 255
//      color = color*255 

const convertToEightBit = val => val * 255
const calcTemp1 = (l,s) => l < 50 ? 
                l * (s + 1.0) : 
                l + s - (l * s)
const calcTemp2 = (l,temp1) => (2*l) - temp1

const makeTempR = hue => hue + 1.0/3.0
const makeTempG = hue => hue 
const makeTempB = hue => hue - 1.0/3.0

const makeTempColors = (hue) => [makeTempR(hue),makeTempG(hue),makeTempB(hue)]

const convertTempColor = (temp1,temp2,tempColor) => {
  if (tempColor * 6 < 1) {
    return temp2 + (temp1-temp2) * 6 * tempColor
  } else if (2*tempColor < 1) {
    return temp1
  } else if (3 * tempColor < 2) {
    return temp2 + (temp1 - temp2) * (2.0/3.0 - tempColor) * 6
  } else {
    return temp2
  }
}


const hslToRgb = (hsl) => {
  let [h,s,l] = hsl
  h = h/360
  s = s / 100 
  l = l / 100
  
  if (!s) {
    return convertToEightBit(l)
  }
  
  const temp1 = calcTemp1(l,s)
  const temp2 = calcTemp2(l,temp1)
  const tempColors = makeTempColors(h)
  
  const rgb = tempColors.map(val => convertTempColor(temp1,temp2,val))
  
  return rgb.map(val => Math.round(val*255))
}

console.log("hsl to rgb", hsl, hslToRgb(hsl) )










// HSL TO HSB
//========================================================================================//

const convertSLtoSB = ([h,s,l]) => {
  const temp = s * (l<0.5 ? l : 1 - l)
  const b = l + temp
  const newS = l > 0 ? 2*temp/b : s
  return [h,newS,b]
}

const hslToHsb = R.pipe(unformatColor,convertSLtoSB,formatHslAndHsb('hsb'))


console.log("hsl to hsb", hsl, hslToHsb(hsl) )



// HSB TO HSL
//========================================================================================//


const convertSBtoSL = ([h,s,b]) => {
  const l = (2-s)*b/2 
  const newS = l && l < 1 ? s*b/( l < 0.5 ? l*2 : 2-(l*2) ) : s
  return [h,newS,l]
}

const hsbToHsl = R.pipe(unformatColor,convertSBtoSL,formatHslAndHsb('hsl'))

console.log("hsb to hsl", hsb, hsbToHsl(hsb) )

// function sb2sl(saturation, brightness) {
//   const lightness = (2 - saturation) * brightness / 2 
//   const newSaturation = lightness && lightness < 1 ? saturation*brightness/(lightness < 0.5 ? lightness*2 : 2 - lightness*2)
//   SL.s = SL.l&&SL.l<1 ? SB.s*SB.b/(SL.l<0.5 ? SL.l*2 : 2-SL.l*2) : SL.s;
// }




