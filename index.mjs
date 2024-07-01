const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
ctx.fill = "red"
// turn off image aliasing
ctx.msImageSmoothingEnabled = false
ctx.mozImageSmoothingEnabled = false
ctx.webkitImageSmoothingEnabled = false
ctx.imageSmoothingEnabled = false
let img = "./1-48.jpg"
// let img = "./rk.jpg";
// let img = "./rk-48.jpg";
const width = 800,
    height = 800

// const density = ' _.,-=+:;cba!?0123456789$W#@Ñ'
const density = "Ñ@#W$9876543210?!abc;:+=-,._ "

function getIndex(v) {
    let max = 255
    return Math.min(density.length - 1, Math.floor((v / max) * density.length))
}

let base_image = new Image()
base_image.src = img

base_image.onload = function () {
    const imgw = base_image.width,
        imgh = base_image.height

    ctx.drawImage(base_image, 0, 0, imgw, imgh)

    let imageData = ctx.getImageData(0, 0, imgw, imgh)

    ctx.clearRect(0, 0, width, height)

    ctx.fill = "black"

    let w = width / imgw,
        h = height / imgh

    for (let i = 0; i < imgw; i++) {
        for (let j = 0; j < imgh; j++) {
            // let pi = i * (imageData.width * 4) + j * 4;
            let pi = (i + j * imgw) * 4

            let r = imageData.data[pi]
            let g = imageData.data[pi + 1]
            let b = imageData.data[pi + 2]
            let val = (r + g + b) / 3

            // square(ctx, i * w, j * h, w, val);
            let char = density[getIndex(val)]
            text(ctx, char, i * w + w / 2, j * h + h / 2, val)
        }
    }
}

function square(ctx, x, y, size, fill) {
    ctx.beginPath()
    // ctx.fillStyle = fill
    ctx.fillStyle = `rgb(${fill}, ${fill}, ${fill})`
    ctx.fillRect(x, y, size, size)
    // ctx.rect(x, y, size, size);
    ctx.stroke()
}

function text(ctx, v, x, y, fill) {
    ctx.fillStyle = `rgb(${fill}, ${fill}, ${fill})`
    let imgh = 48
    // let imgh = 150
    ctx.font = `${width / imgh}px monospace`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(v, x, y)
}
