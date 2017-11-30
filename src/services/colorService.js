// aka Multi-Layer Perceptron (MLP)


const randomInclusive = (min = 0, max = 1) => min + Math.round( Math.random() * (max - min) * 1000 )/1000
const newDataPoint = () => {
    return {
        h: Math.round(randomInclusive()*360),
        s: Math.round(randomInclusive()*100),
        l: Math.round(randomInclusive()*100) 
    }
}




export function generateRandomColor() {
    return newDataPoint()
}

export function formatHSL({h,s,l}) {
    return `hsl(${h},${s}%,${l}%)`
}