class Sprite {
    constructor({ position, imageSrc, scale = 1, frameMax = 1, offset = {x: 0, y:0}}) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image();
        this.image.src = imageSrc
        this.scale = scale
        this.frameMax = frameMax
        this.faramesCurrent = 0
        this.faramesElapsed = 0
        this.faramesHold = 5
        this.offset = offset

    }
    draw() {
        c.drawImage(
            this.image,
            this.faramesCurrent * (this.image.width / this.frameMax),
            0,
            this.image.width / this.frameMax,
            this.image.height, 
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.frameMax) * this.scale, 
            this.image.height * this.scale
        )

    }
    animateFrames(){
        this.faramesElapsed++
        if (this.faramesElapsed % this.faramesHold === 0) {
            if (this.faramesCurrent < this.frameMax -1) {
                this.faramesCurrent++
            } else {
                this.faramesCurrent = 0
            }
        }
    }
    update() {
        this.draw()
        this.animateFrames()
    }

    destroy() {
        c.clearRect(this.position.x, this.position.y, this.width, this.height)
    }


}

class Fighter extends Sprite{
    constructor({
        position, 
        velocity, 
        color = 'red', 
        imageSrc, 
        scale = 1, 
        frameMax = 1,
        offset = {x: 0, y: 0},
        sprites,
        attackBox = {offset: {}, width: undefined, height: undefined}
    }) {
        super({
            position,
            imageSrc,
            scale,
            frameMax,
            offset
        })
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset: attackBox.offset,
            width : attackBox.width,
            height: attackBox.height,

        }
        this.color = color
        this.isAttacking = false
        this.health = 100
        this.fury = 100
        this.faramesCurrent = 0
        this.faramesElapsed = 0
        this.faramesHold = 5
        this.sprites = sprites
        this.dead = false
        this.critical_attack = 2
        this.damage = 10

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }

        console.log(this.sprites)
    }
    
    update() {
        this.draw()
        if (!this.dead) this.animateFrames()

        
        // Attack boxes
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // draw the attack box
       // c.fillRect(
         //   this.attackBox.position.x,
         //   this.attackBox.position.y,
        //    this.attackBox.width,
        //    this.attackBox.height
       // )

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // gravity function
        if (this.position.y + this.height + this.velocity.y >= canvas.height -96) {
            this.velocity.y = 0
            this.position.y = 330
        }
        else this.velocity.y += gravity

        // width canavs function
        if (this.position.x > canvas.width){
            
            this.position.x = canvas.width - 1024
         
        } else if(this.position.x < 0){
            this.position.x = canvas.width 
        }
        
         
    }

    attack(direction) {
        this.switchSprites('attack1' + direction)
        this.isAttacking = true
        
    }

    takeHit(direction) {
        
        if (this.health <= 0 ) {
            this.switchSprites('death' + direction)
        } else this.switchSprites('takeHit' + direction)

    }
    
    
    switchSprites(sprite) {

        if (this.image === this.sprites.death.image) {
            if (this.faramesCurrent === this.sprites.death.framesMax - 1)
                this.dead = true
            return
            
        }
        if (this.image === this.sprites.death_left.image) {
            if (this.faramesCurrent === this.sprites.death_left.framesMax - 1)
                this.dead = true
            return
            
        }
        // overriding all other animations with the attack animation
        if (
            this.image === this.sprites.attack1.image && 
            this.faramesCurrent < this.sprites.attack1.framesMax - 1
        )
            return

        
        if (
            this.image === this.sprites.attack1_left.image && 
            this.faramesCurrent < this.sprites.attack1_left.framesMax - 1
        ) 
            return
            
        // override when fighter gets hit
        if (this.image === this.sprites.takeHit.image && 
            this.faramesCurrent < this.sprites.takeHit.framesMax - 1
        ) 
            return
        
        if (this.image === this.sprites.takeHit_left.image && 
            this.faramesCurrent < this.sprites.takeHit_left.framesMax - 1
        ) 
            return

        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.frameMax = this.sprites.idle.framesMax
                    this.faramesCurrent = 0
                }
                    
            break
            case 'run' :
                if (this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.frameMax = this.sprites.run.framesMax
                    this.faramesCurrent = 0
                }

            break
            case 'jump' :
                if (this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image
                    this.frameMax = this.sprites.jump.framesMax
                    this.faramesCurrent = 0
                }
            break
            
            case 'fall' :
                if (this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image
                    this.frameMax = this.sprites.fall.framesMax
                    this.faramesCurrent = 0
                }
            break
            case 'attack1' :
                if (this.image !== this.sprites.attack1.image){
                    this.image = this.sprites.attack1.image
                    this.frameMax = this.sprites.attack1.framesMax
                    this.faramesCurrent = 0
                }
            break
            
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                  this.image = this.sprites.takeHit.image
                  this.frameMax = this.sprites.takeHit.framesMax
                  this.faramesCurrent = 0
                }
            break
            
            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.frameMax = this.sprites.death.framesMax
                    this.faramesCurrent = 0
                    }
            break
            case 'idle_left':
                if (this.image !== this.sprites.idle_left.image) {
                    this.image = this.sprites.idle_left.image
                    this.frameMax = this.sprites.idle_left.framesMax
                    this.faramesCurrent = 0
                    }
                        
    
                break
            case 'run_left' :
                if (this.image !== this.sprites.run_left.image){
                    this.image = this.sprites.run_left.image
                    this.frameMax = this.sprites.run_left.framesMax
                    this.faramesCurrent = 0
                    }
                break
            case 'jump_left' :
                if (this.image !== this.sprites.jump_left.image){
                    this.image = this.sprites.jump_left.image
                    this.frameMax = this.sprites.jump_left.framesMax
                    this.faramesCurrent = 0
                    }
                break
                
            case 'fall_left' :
                if (this.image !== this.sprites.fall_left.image){
                    this.image = this.sprites.fall_left.image
                    this.frameMax = this.sprites.fall_left.framesMax
                    this.faramesCurrent = 0
                    }
                break
            case 'attack1_left' :
                if (this.image !== this.sprites.attack1_left.image){
                    this.image = this.sprites.attack1_left.image
                    this.frameMax = this.sprites.attack1_left.framesMax
                    this.faramesCurrent = 0
                    }
                break
                
            case 'takeHit_left':
                if (this.image !== this.sprites.takeHit_left.image) {
                      this.image = this.sprites.takeHit_left.image
                      this.frameMax = this.sprites.takeHit_left.framesMax
                      this.faramesCurrent = 0
                    }
                    break
                
            case 'death_left':
                if (this.image !== this.sprites.death_left.image) {
                    this.image = this.sprites.death_left.image
                    this.frameMax = this.sprites.death_left.framesMax
                    this.faramesCurrent = 0
                        }
                break
        } 
    }
    
}