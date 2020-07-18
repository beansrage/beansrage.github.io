
///listens for page to load, then loads content
document.addEventListener('DOMContentLoaded', () => {
    
    const squares = document.querySelectorAll('.grid div')
    const resultDisplay = document.querySelector('#result')
    let width = 15
    let currentShooterIndex = 200
    let currentShooter2Index = 204
    let currentInvaderIndex = 0
    let alienInvadersTakenDown = []
    let result = 0
    let direction = 1
    let invaderId




    
    ///defines aliens in array
    const alienInvaders = [
        0,1,2,3,4,5,6,7,8,9,15,16,
        17,18,19,20,21,22,23,24,30,
        31,32,33,34,35,36,37,38,39
    ]

    //draws aliens
    alienInvaders.forEach(invader => squares[currentInvaderIndex + invader].classList.add('invader'))

    //draws players
    squares[currentShooterIndex].classList.add('shooter')
    squares[currentShooter2Index].classList.add('shooter2')

    //moves player 1
    function moveShooter(e) {
        squares[currentShooterIndex].classList.remove('shooter')
        switch(e.keyCode) {
            case 65:
                if (currentShooterIndex % width !== 0) currentShooterIndex -=1
                break
            case 68:
                if (currentShooterIndex % width < width -1) currentShooterIndex +=1
                break
        }
        squares[currentShooterIndex].classList.add('shooter')
    }
    document.addEventListener('keydown', moveShooter)

    //move player 2
    function moveShooter2(e) {
        squares[currentShooter2Index].classList.remove('shooter2')
        switch(e.keyCode) {
            case 37:
                event.preventDefault()
                if (currentShooter2Index % width !== 0) currentShooter2Index -=1
                break
            case 39:
                event.preventDefault()
                if (currentShooter2Index % width < width -1) currentShooter2Index +=1
                break
        }
        squares[currentShooter2Index].classList.add('shooter2')
    }
    document.addEventListener('keydown', moveShooter2)
    
    //move aliens
    function moveInvaders() {
        const leftEdge = alienInvaders[0] % width === 0 
        const rightEdge = alienInvaders[alienInvaders.length-1] % width === width -1

        if ((leftEdge && direction === -1) || (rightEdge&&direction ===1)){
            direction=width
        } else if (direction === width){
            if (leftEdge) direction = 1
            else direction = -1
        }
        for (let i = 0; i <=alienInvaders.length-1; i++){
            squares[alienInvaders[i]].classList.remove('invader')
        }
        for (let i = 0; i <=alienInvaders.length-1; i++){
            alienInvaders[i] += direction
        }
        for (let i = 0; i <=alienInvaders.length-1; i++){
            if (!alienInvadersTakenDown.includes(i)){
            squares[alienInvaders[i]].classList.add('invader')   
            }
        }

       


    //shoot function
    function shoot(e) {
        let laserId
        let currentLaserIndex = currentShooterIndex
        
        //move laser
        function moveLaser() {
            squares[currentLaserIndex].classList.remove('laser')
            currentLaserIndex-=width
            squares[currentLaserIndex].classList.add('laser')
            if (squares[currentLaserIndex].classList.contains('invader')){
                squares[currentLaserIndex].classList.remove('laser')
                squares[currentLaserIndex].classList.remove('invader')
                squares[currentLaserIndex].classList.add('boom')

                setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250)
                clearInterval(laserId)

                const alienTakenDown = alienInvaders.indexOf(currentLaserIndex)
                alienInvadersTakenDown.push(alienTakenDown)
                result++
                resultDisplay.textContent = result
            }

            if(currentLaserIndex < width){
                clearInterval(laserId)
                setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100)
            }
        }
        switch(e.keyCode) {
            case 32:
                q
                laserId = setInterval(moveLaser, 100)
                break
        }
    }document.addEventListener('keypress', shoot)

    //shoot 2
    function shoot2(e) {
        let laserId
        let currentLaser2Index = currentShooter2Index
        
        //move laser2
        function moveLaser2() {
            squares[currentLaser2Index].classList.remove('laser')
            currentLaser2Index-=width
            squares[currentLaser2Index].classList.add('laser')
            if (squares[currentLaser2Index].classList.contains('invader')){
                squares[currentLaser2Index].classList.remove('laser')
                squares[currentLaser2Index].classList.remove('invader')
                squares[currentLaser2Index].classList.add('boom')

                setTimeout(() => squares[currentLaser2Index].classList.remove('boom'), 250)
                clearInterval(laserId)

                const alienTakenDown = alienInvaders.indexOf(currentLaser2Index)
                alienInvadersTakenDown.push(alienTakenDown)
                result++
                resultDisplay.textContent = result
            }

            if(currentLaserIndex < width){
                clearInterval(laserId2)
                setTimeout(() => squares[currentLaser2Index].classList.remove('laser2'), 100)
            }
        }
        switch(e.keyCode) {
            case 13:
                event.preventDefault()
                laserId = setInterval(moveLaser2, 100)
                break
        }
    }document.addEventListener('keypress', shoot2)
    
            //win state\\ 
    if(alienInvadersTakenDown.length === alienInvaders.length) {
        resultDisplay.textContent = 'Winner!!'
        clearInterval(invaderId)
        alert('...ready for more?')
    } 


    //game over state 
    if(squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
        resultDisplay.textContent = 'Game Over'
        squares[currentShooterIndex].classList.add('boom')
        clearInterval(invaderId)
    }
    for (let i=0; i<=alienInvaders.length-1; i++) {
        if(alienInvaders[i]>(squares.length-(width-1))){
            resultDisplay.textContent = 'Game Over'
            clearInterval(invaderId)
        }
    }


    //restart function 

}

invaderId = setInterval(moveInvaders, 250)


        
}) 


