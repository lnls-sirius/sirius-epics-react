import { Dict } from "./interfaces"

// Component default colors
const default_colors: Dict<Dict<string>> = {
    led: {
        'normal': 'radial-gradient(#1bff1d, #14a200)',
        'alert': 'radial-gradient(#f8ff1b, #a29800)',
        'alarm': 'radial-gradient(#ff1b1b, #a20000)',
        'nc': 'radial-gradient(#dedede, #9e9e9e)'
    },
    chart: {
        'normal': '#18d81a',
        'alert': '#d9df17',
        'alarm': '#e11919'
    }
}

// Main led shapes
const led_shape: Dict<string> = {
    circle: `
        border-radius: 2em;`,
    squ_circ: `
        border-radius: 0.5em;`,
    square: ``
}

export {
    default_colors,
    led_shape
}
