const canvas = document.querySelector('canvas');
const body = document.querySelector('body');
// conver canvas in 2D grafic
const c = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

// Global const
const gravity = 0.7

c.fillRect(0, 0, canvas.width, canvas.height)


const keys = {
    a : {
        pressed: false
    },

    d : {
        pressed: false
    },

    w : {
        pressed: false
    },
    ArrowRight : {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    Enter: {
        pressed: false
    }
    
}

//myAudio.play()
let direction_enemy = '_left'
let direction_player = ''

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    beackgraund.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.15)'
    c.fillRect(0, 0, canvas.width, canvas.height)
    torch.update()
    torch_bakeground.update()


    // start Game
    if(keys.Enter.pressed) {
        //myAudio.play()
        player.update()
        enemy.update()

        // stop player
        player.velocity.x = 0
        enemy.velocity.x = 0

        // check fyry if < 0, return 100%
        checkFury(player, '#playerPower')
        checkFury(enemy, '#enemyPower')
       
        // Player movement
        if (keys.a.pressed && player.lastKey === 'a') { 
            direction_player = '_left'
            player.attackBox.offset.x = -200
            player.velocity.x = -5
            player.switchSprites('run' + direction_player)
        } else if (keys.d.pressed && player.lastKey === 'd'){ 
            direction_player = ''
            player.attackBox.offset.x = 15
            player.velocity.x = 5
            player.switchSprites('run' + direction_player)
            
        } else {
            player.switchSprites('idle' + direction_player)
        }
       
       

        // Jumping player 
        jumpFighter(player, direction_player, keys.w.pressed)
        
        // Enemy movement
        if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
             direction_enemy = '_left'
             enemy.attackBox.offset.x = -160
             enemy.velocity.x = -5
             enemy.switchSprites('run' + direction_enemy)
         } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
             direction_enemy = ''
             enemy.attackBox.offset.x = 30
             enemy.velocity.x = 5
             enemy.switchSprites('run') 
         } else {
             enemy.switchSprites('idle' + direction_enemy)
         }

        // Jumping enemy
        jumpFighter(enemy, direction_enemy, keys.ArrowUp.pressed)
        

        // detect for collision
        if (rectangularCollision({
            rectangle1: player,
            rectangle2: enemy,
        }) && 
        player.isAttacking && player.faramesCurrent === 4
        ) {
            // mechanic attack normal and critical attack
            mechanicAttack(player, enemy)
           
            enemy.takeHit(direction_enemy)
            player.isAttacking = false

            gsap.to('#enemyHealth', {
                width: enemy.health + '%'
            })

            gsap.to('#enemyPower', {
                width: enemy.fury + '%'
            })
        }

        // if player missing
        if (player.isAttacking && player.faramesCurrent === 6){
            player.isAttacking = false
        }

        // this is where our player gets hit

        if (rectangularCollision({
            rectangle1: enemy,
            rectangle2: player,
        }) && 
        enemy.isAttacking && enemy.faramesCurrent === 2
        ) {
            // mechanic attack normal and critical attack
            mechanicAttack(enemy, player)
           
            player.takeHit(direction_player)
            enemy.isAttacking = false
            
            gsap.to('#playerHealth', {
                width: player.health + '%'
            })
            
            
            gsap.to('#playerPower', {
                width: player.fury + '%'
            })
        }

        // if enemy missing
        if (enemy.isAttacking && enemy.faramesCurrent === 2){
            enemy.isAttacking = false
        }


        if (enemy.health <= 0 || player.health <= 0) {
            determineWiner({player, enemy, timerId})

        }

    } else press_the_enter.update()

   
}

animate()

window.addEventListener('keydown', (event) => {
    //console.log(event.key)
    if(!keys.Enter.pressed) {
        switch (event.key) {
            case 'Enter':
                // time start
                decreaseTimer()

                keys.Enter.pressed = true

                //stop scroll
                body.style.overflow = 'hidden'
                break

        }
    }

    if(!player.dead) {
        switch (event.key) {
            case 'd':
                keys.d.pressed = true
                player.lastKey = 'd'
                break
            case 'a':
                keys.a.pressed = true
                player.lastKey = 'a'
                break
        
            case 'w':
                keys.w.pressed = true
                break
        
            case ' ':
                player.attack(direction_player)
                break
        }
    }
       if(!enemy.dead){ 
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
                break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                break
            
            case 'ArrowUp':
                keys.ArrowUp.pressed = true
                break
            
            case 'ArrowDown':
                enemy.attack(direction_enemy)
                break
        }
    }
    
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break

        case 'w':
            keys.w.pressed = false
            break

        // enemy keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break

        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break
        
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
            
    }
    
})
function stopScrolling() {
    body.style.overflow = ''

}
window.addEventListener('mouseup', (event) => {
    console.log(event)
    switch (event.button) {
        case 0:
            // run scroll
            body.style.overflow = ''
            break

        }
    
})







