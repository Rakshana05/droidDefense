const canvas = document.getElementById('board')
const ctx = canvas.getContext('2d')

canvas.width = document.body.clientWidth
canvas.height = innerHeight

class Player {
    constructor() {
        this.velocity = {
            x:0,
            y:0
        }
        this.width = 10
        this.height = 40
        this.position = {
            x:canvas.width/2 - this.width/2,
            y:(canvas.height)-this.height-50
        }
        this.angle = 0
        this.rotation = 0
        this.radius = 20
    }

    draw() {
        ctx.save()
        ctx.translate(
            player.position.x+this.width/2 ,
            player.position.y+this.height
        )
        ctx.rotate(this.rotation)
        ctx.translate(
            -(player.position.x +this.width/2) ,
            -(player.position.y+ this.height)
        )

        ctx.fillStyle = 'grey'
        ctx.fillRect(this.position.x,this.position.y,this.width,this.height)
        ctx.beginPath()
        ctx.fillStyle = 'purple'
        ctx.arc(this.position.x+this.width/2,this.position.y+40,this.radius,0,2*Math.PI)
        ctx.fill()

        ctx.restore()
        
    }

    update() {
        this.draw()
        this.position.x+=this.velocity.x
    }
}

class Projectile {
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity

        this.radius = 3
    }

    draw(){
        ctx.beginPath()
        ctx.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
        ctx.fillStyle = 'red'
        ctx.fill()
        ctx.closePath()
    }

    update(){
        this.draw()
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
    }
}

// image of shooter has to be imlemented

const player = new Player()
const projectiles = []
const keys = {
    ArrowLeft : {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}
player.draw()

function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    projectiles.forEach(projectile => {
        projectile.update()
    })
    if (keys.ArrowLeft.pressed && player.position.x >=0) {
        player.velocity.x = -5
    } 
    else if(keys.ArrowRight.pressed && 
        player.position.x +player.width <= canvas.width
    ){
        player.velocity.x = 5
    }
    else{
        player.velocity.x = 0
    }
}

animate()

addEventListener('keydown', (e)=>{
    switch(e.key){
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            break
        case ' ':
            projectiles.push(new Projectile({
                position:{
                    x:player.position.x+player.width/2 ,
                    y:player.position.y+player.height
                },
                velocity: {
                    x: Math.sin(player.rotation)*5,
                    y:- Math.cos(player.rotation)*5
                }
            }))
            
            break
        case 'ArrowUp':
            if(player.rotation < 1)
                player.rotation += Math.PI * 30 / 180
            break
        case 'ArrowDown':
            if(player.rotation > -1)
                player.rotation -=  Math.PI * 30 / 180
            break
    }
})

addEventListener('keyup', (e)=>{
    switch(e.key){
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break
        case ' ':
            break
    }
})



























// //Creating the shooter
// const shooterW = 50
// const shooterH = 30
// let shooterX = canvas.width / 2 - shooterW / 2
// let shooterY = canvas.height - 60

// //Draw Shooter
// ctx.fillStyle = "purple"
// ctx.fillRect(shooterX,shooterY,shooterW,shooterH)

// //Creating Bullet
// const bulletR = 5
// let bulletX
// let bulletY = 400

// //Using keys to move
// window.addEventListener(click,()=>{console.log("clicked")})

// //moving shooter
// if(key === ArrowLeft){
//     shooterX -= 10
// }else if(key === ArrowRight){
//     shooterX += 10
// }