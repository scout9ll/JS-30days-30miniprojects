let canvas = document.querySelector(`canvas`)
console.log(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const crx = canvas.getContext("2d");
let mouse = {
    X: undefined,
    Y: undefined
}
window.addEventListener("mousemove", (e) => {
    mouse.X = e.x;
    mouse.Y = e.y;


})
const ColorList = [
    "#F7B2B7", "#F7717D", "#DE639A", "#7F2982", "#16001E"
]

function Ball(x, y, speedX, speedY, radius, color) {
    this.x = x
    this.y = y
    this.SpdX = speedX
    this.SpdY = speedY
    this.radius = radius
    this.draw = function() {
        crx.beginPath() //每次begin后，会自动标记并跟踪变化

        crx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        crx.fillStyle = color;
        crx.fill();
    }
    this.update = function() {
        this.draw()
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.SpdX = -this.SpdX;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.SpdY = -this.SpdY;
        }
        this.x = this.x + this.SpdX;
        this.y = this.y + this.SpdY;
        if (mouse.Y - 100 < this.y && mouse.Y + 100 > this.y && mouse.X + 100 > this.x && mouse.X - 100 < this.x) {
            if (this.radius < 100) {
                this.radius = this.radius + 3
            }
        } else {
            if (this.radius > 10) {
                this.radius = this.radius - 3
            }
        }

    }
}


//物体和

let CircleList = []

for (let i = 0; i < 100; i++) {
    let x = Math.random() * innerWidth
    let y = Math.random() * innerHeight
    let speedX = (Math.random() - 0.5) * 10
    let speedY = (Math.random() - 0.5) * 10
    let color = ColorList[Math.floor(Math.random() * ColorList.length)]
    let radius = (Math.random() * 50) + 5
    CircleList.push(new Ball(x, y, speedX, speedY, radius, color))
}

function animate() {

    requestAnimationFrame(animate); //和CSS3一样每16.7ms回调一次，保证渲染60fps
    crx.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < CircleList.length; i++) {
        CircleList[i].update()
    }


}
animate()