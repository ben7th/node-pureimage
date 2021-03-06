const pureimage = require('pureimage')
const fs = require('fs')
describe('draw curve',() => {
    let image;
    let c;
    const WHITE = 0xFFFFFFFF
    const BLACK = 0x000000FF

    beforeEach(() => {
        image = pureimage.make(200,200)
        c = image.getContext('2d')
        c.fillStyle = 'white'
        c.fillRect(0,0,200,200)
    })

    it('canvas is empty and clear', (done) => {
        expect(image.getPixelRGBA(0,0)).toBe(WHITE)
        done()
    })

    //draw square
    it('making a square', (done) => {
        c.beginPath()
        c.moveTo(10,10)
        c.lineTo(100,10)
        c.lineTo(100,100)
        c.lineTo(10,100)
        c.lineTo(10,10)
        c.fillStyle = 'black'
        c.fill()
        expect(image.getPixelRGBA(0,0)).toBe(WHITE)
        expect(image.getPixelRGBA(11,11)).toBe(BLACK)
        expect(image.getPixelRGBA(50,50)).toBe(BLACK)
        expect(image.getPixelRGBA(100,100)).toBe(WHITE)
        done()
    })

    //draw bezier curve
    it('bezier curve', (done) => {
        c.fillStyle = 'white'
        c.fillRect(0,0,200,200)

        c.fillStyle = 'black'
        c.beginPath()
        c.moveTo(10,10)
        c.bezierCurveTo(50,50, 100,50, 10,100)
        c.lineTo(10,10)
        c.fill()
        pureimage.encodePNGToStream(image, fs.createWriteStream('bezier1.png')).then(() => {
            console.log('wrote out bezier1.png')
            // expect(image.getPixelRGBA(0, 0)).toBe(0xFFFFFFFF)
            // expect(image.getPixelRGBA(19, 19)).toBe(0x0C0CFFFF)
            done()
        })

        // expect(image.getPixelRGBA(0,0)).toBe(WHITE)
        // expect(image.getPixelRGBA(20,15)).toBe(BLACK)
        // done()
    })


})
