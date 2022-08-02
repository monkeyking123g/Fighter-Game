var myAudio = document.createElement("audio");
myAudio.src = "./music/music_bg.mp3";
    
const press_the_enter = new Sprite({
    position: {
        x: 401,
        y: 576 / 2,
    },
    imageSrc: "./img/press-enter-text.png",
    scale: 2.5
})
const beackgraund = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: "./img/background/bg_4.png"
})

const torch = new Sprite({
    position: {
       x: 972,
        y: 371,
    },
    imageSrc: "./img/torch_big_blue_1.png",
    scale: 2.75,
    frameMax: 6,
})

const torch_bakeground = new Sprite({
    position: {
       x: 16,
       y: 371,
    },
    imageSrc: "./img/torch_big_blue_1.png",
    scale: 2.75,
    frameMax: 6
    
})

const player = new Fighter({
    position: {
        x: 100,
        y: 0
    },
    
    velocity : {
        x: 0,
        y: 0 
    },
    offset: {
        x: 0,
        y: 0,
    },

    imageSrc: "./img/Martial Hero 3/Right/idle.png",
    frameMax: 10,
    scale: 2.7,
    offset: {
        x: 196,
        y: 5,
    },
    sprites: {
        idle:{
            imageSrc: "./img/Martial Hero 3/Right/idle.png",
            framesMax: 10,
            
        },
        run: {
            imageSrc: "./img/Martial Hero 3/Right/Run.png",
            framesMax: 8,
           
        },
        jump :  {imageSrc: "./img/Martial Hero 3/Right/Going Up.png",
                framesMax: 3,
                
        },
        fall :  {imageSrc: "./img/Martial Hero 3/Right/Going Down.png",
                framesMax: 3,
               
        },
        attack1 :  {imageSrc: "./img/Martial Hero 3/Right/Attack2.png",
            framesMax: 6,
            
        },
        takeHit :  {imageSrc: "./img/Martial Hero 3/Right/Take hit.png ",
            framesMax: 3,
            
        },
        death :  {imageSrc: "./img/Martial Hero 3/Right/Death.png ",
            framesMax: 11,
            
        },
        idle_left:{
            imageSrc: "./img/Martial Hero 3/Left/idle.png",
            framesMax: 10,
            
        },
        run_left: {
            imageSrc: "./img/Martial Hero 3/Left/Run.png",
            framesMax: 8,
           
        },
        jump_left :  {imageSrc: "./img/Martial Hero 3/Left/Going Up.png",
                framesMax: 3,
                
        },
        fall_left :  {imageSrc: "./img/Martial Hero 3/Left/Going Down.png",
                framesMax: 3,
               
        },
        attack1_left :  {imageSrc: "./img/Martial Hero 3/Left/Attack3.png",
            framesMax: 6,
            
        },
        takeHit_left :  {imageSrc: "./img/Martial Hero 3/Left/Take hit.png ",
            framesMax: 3,
            
        },
        death_left :  {imageSrc: "./img/Martial Hero 3/Left/Death.png ",
            framesMax: 11,
            
        }
    },
    attackBox: {
        offset: {
            x: 15,
            y: 140,
        },
        width: 160,
        height: 50
    }
    
    
})


const enemy = new Fighter({
    position: {
        x: 800,
        y: 100
    },
    velocity : {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0,
    },
    imageSrc: "./img/Artur_king/Left/idle.png",
    frameMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 45,
    },
    sprites: {
        idle:{
            imageSrc: "./img/Artur_king/Right/idle.png",
            framesMax: 8,
            
        },
        run: {
            imageSrc: "./img/Artur_king/Right/Run.png",
            framesMax: 8,
            
        },
        jump :  {
            imageSrc: "./img/Artur_king/Right/Jump.png",
            framesMax: 2,
        },
                
        fall :  {
            imageSrc: "./img/Artur_king/Right/Fall.png",
            framesMax: 2,
                
        },
        attack1 :  {
            imageSrc: "./img/Artur_king/Right/Attack1.png",
            framesMax: 4,
            
        },
        takeHit :  {
            imageSrc: "./img/Artur_king/Right/Take hit.png ",
            framesMax: 4,
            
        },
        death : {
            imageSrc: "./img/Artur_king/Right/Death.png ",
            framesMax: 6,
        },

        idle_left:{
            imageSrc: "./img/Artur_king/Left/idle.png",
            framesMax: 8,
            
        },
        run_left: {
            imageSrc: "./img/Artur_king/Left/Run.png",
            framesMax: 8,
            
        },
        jump_left :  {
            imageSrc: "./img/Artur_king/Left/Jump.png",
            framesMax: 2,
        },
                
        fall_left :  {
            imageSrc: "./img/Artur_king/Left/Fall.png",
            framesMax: 2,
                
        },
        attack1_left :  {
            imageSrc: "./img/Artur_king/Left/Attack.png",
            framesMax: 4,
            
        },
        takeHit_left :  {
            imageSrc: "./img/Artur_king/Left/Take hit.png ",
            framesMax: 4,
            
        },
        death_left : {
            imageSrc: "./img/Artur_king/Left/Death.png ",
            framesMax: 6,
        }
    },
    attackBox: {
        offset: {
            x: -160,
            y: 140
        },
        width: 170,
        height: 50
    }
    
})