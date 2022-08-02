
function rectangularCollision({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
      
    )
}

function determineWiner({player, enemy, timerId}){
    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex'
    if (player.health === enemy.health){
        document.querySelector('#displayText').innerHTML = 'Tie'
    } else if (player.health > enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
    } else if (player.health < enemy.health) {
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
    }

}

let timer = 60
let timerId
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML =  timer 
    }
    if (timer === 0){
        determineWiner({player, enemy, timerId})
    }   

} 

function mechanicAttack(player, enemy) {
    // mechanic attack normal and critical attack
    if (player.fury <= 0 && player.critical_attack > 0){
        enemy.health -= player.damage * 2
        enemy.fury -= 20
        player.critical_attack -= 1
    

    } else if (player.fury >= 0){
        enemy.health -= player.damage
        enemy.fury -= 20
        
    }

}

function checkFury(player, furyId){
     // check fyry if < 0, return 100%
     if (player.fury <= 0 && player.critical_attack <= 0) {
        player.fury = 100
        player.critical_attack = 2 
        gsap.to(furyId, {
            width: player.fury + '%'
        })
    }
}


function jumpFighter(player, direction, keys){
    if (player.velocity.y <  0) {
        player.switchSprites('jump' + direction)
        keys = false
    } else if(player.velocity.y > 0){
        player.switchSprites('fall' + direction)
    } else if (keys){
        player.velocity.y = -20
    }

}