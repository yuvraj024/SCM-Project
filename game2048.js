document.addEventListener("DOMContentLoaded", () => {
    //CHECK FOR TYPOS LMAOOO
    const gridDisplay = document.querySelector(".grid")
    const resultDisplay = document.getElementById("result")
    const width = 4 //board size
    let squaresArray = []

    //creating grid for playing
    function createBoard() {
        for (let i = 0; i < width * width; i += 1) {
            square = document.createElement("div")
            square.setAttribute("class", "zero")
            square.innerHTML = 0
            gridDisplay.appendChild(square)
            squaresArray.push(square)
        }
        generate()
        generate()
    }
    createBoard()

    //starting number random
    function generate() {
        // random int b/w 1 and 16
        let randomNumber = Math.floor(Math.random() * squaresArray.length)
        //checks validity to switch to 2
        if (squaresArray[randomNumber].innerHTML == 0) {
            squaresArray[randomNumber].innerHTML = 2
            checkForGameOver()
        } else generate()
    }

    // swipe right (right arrow key)
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squaresArray[i].innerHTML
                let totalTwo = squaresArray[i + 1].innerHTML
                let totalThree = squaresArray[i + 2].innerHTML
                let totalFour = squaresArray[i + 3].innerHTML
                //let row = [(totalOne), (totalTwo), (totalThree), (totalFour),]
                //string don't add, they concatenate ;-;
                let row = [
                    parseInt(totalOne),
                    parseInt(totalTwo),
                    parseInt(totalThree),
                    parseInt(totalFour),
                ]
                // console.log(row)
                //making new arrays after sliding
                let filteredRow = row.filter((num) => num)
                // console.log(filteredRow)
                let missing = width - filteredRow.length
                let zeroes = Array(missing).fill(0)
                // console.log(zeroes)
                let newRow = zeroes.concat(filteredRow)
                // console.log(newRow)

                //replaces old row with new row
                squaresArray[i].innerHTML = newRow[0]
                squaresArray[i + 1].innerHTML = newRow[1]
                squaresArray[i + 2].innerHTML = newRow[2]
                squaresArray[i + 3].innerHTML = newRow[3]
            }
        }
    }
    //haha copy paste go brrr
    // swipe left (left arrow key)
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squaresArray[i].innerHTML
                let totalTwo = squaresArray[i + 1].innerHTML
                let totalThree = squaresArray[i + 2].innerHTML
                let totalFour = squaresArray[i + 3].innerHTML
                //let row = [(totalOne), (totalTwo), (totalThree), (totalFour),]
                //string don't add, they concatenate ;-;
                let row = [
                    parseInt(totalOne),
                    parseInt(totalTwo),
                    parseInt(totalThree),
                    parseInt(totalFour),
                ]
                // console.log(row)
                //making new arrays after sliding
                let filteredRow = row.filter((num) => num)
                // console.log(filteredRow)
                let missing = width - filteredRow.length
                let zeroes = Array(missing).fill(0)
                // console.log(zeroes)
                let newRow = filteredRow.concat(zeroes)
                // console.log(newRow)

                //replaces old row with new row
                squaresArray[i].innerHTML = newRow[0]
                squaresArray[i + 1].innerHTML = newRow[1]
                squaresArray[i + 2].innerHTML = newRow[2]
                squaresArray[i + 3].innerHTML = newRow[3]
            }
        }
    }

    //swipe down(down arrow key)
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squaresArray[i].innerHTML
            let totalTwo = squaresArray[i + width].innerHTML
            let totalThree = squaresArray[i + 2 * width].innerHTML
            let totalFour = squaresArray[i + 3 * width].innerHTML
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour),
            ]
            let filteredColumn = column.filter((num) => num)
            let missing = 4 - filteredColumn.length
            let zeroes = Array(missing).fill(0)
            let newColumn = zeroes.concat(filteredColumn)

            squaresArray[i].innerHTML = newColumn[0]
            squaresArray[i + width].innerHTML = newColumn[1]
            squaresArray[i + 2 * width].innerHTML = newColumn[2]
            squaresArray[i + 3 * width].innerHTML = newColumn[3]
        }
    }

    //swipe up(up arrow key)
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squaresArray[i].innerHTML
            let totalTwo = squaresArray[i + width].innerHTML
            let totalThree = squaresArray[i + 2 * width].innerHTML
            let totalFour = squaresArray[i + 3 * width].innerHTML
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour),
            ]
            let filteredColumn = column.filter((num) => num)
            let missing = 4 - filteredColumn.length
            let zeroes = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeroes)

            squaresArray[i].innerHTML = newColumn[0]
            squaresArray[i + width].innerHTML = newColumn[1]
            squaresArray[i + 2 * width].innerHTML = newColumn[2]
            squaresArray[i + 3 * width].innerHTML = newColumn[3]
        }
    }

    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squaresArray[i].innerHTML === squaresArray[i + 1].innerHTML) {
                let combinedTotal =
                    parseInt(squaresArray[i].innerHTML) + parseInt(squaresArray[i + 1].innerHTML)
                squaresArray[i].innerHTML = combinedTotal
                squaresArray[i + 1].innerHTML = 0
            }
        }
        checkForWin()
    }
    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squaresArray[i].innerHTML === squaresArray[i + width].innerHTML) {
                let combinedTotal =
                    parseInt(squaresArray[i].innerHTML) +
                    parseInt(squaresArray[i + width].innerHTML)
                squaresArray[i].innerHTML = combinedTotal
                squaresArray[i + width].innerHTML = 0
            }
        }
        checkForWin()
    }
    //assigning keycodes
    function control(e) {
        if (e.keyCode === 39 || e.keyCode === 68) {
            arrowRight()
        } else if (e.keyCode === 37 || e.keyCode === 65) {
            arrowLeft()
        } else if (e.keyCode === 38 || e.keyCode === 87) {
            arrowUp()
        } else if (e.keyCode === 40 || e.keyCode === 83) {
            arrowDown()
        }
    }
    document.addEventListener("keyup", control)

    function arrowRight() {
        moveRight()
        combineRow()
        moveRight()
        generate()
    }
    function arrowLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }
    function arrowUp() {
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }
    function arrowDown() {
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }
    //check for the number 2048 in the squares to win
    function checkForWin() {
        for (let i = 0; i < squaresArray.length; i++)
            {if (squaresArray[i].innerHTML == 2048) {
                resultDisplay.innerHTML = "You Win!"
                document.removeEventListener("keyup", control)
            }}
    }
    function checkForGameOver() {
        let zeroes = 0
        for (let i = 0; i < square.length; i++) {
            if (squaresArray[i].innerHTML == 0) {
                zeroes++
            }
            if (zeroes === 0) {
                resultDisplay.innerHTML = "You Lose!"
                document.removeEventListener("keyup", control)
            }
        }
    }
    function colorChanger(){
        for(let i = 0; i < square.length; i++){
            if (squaresArray[i].innerHTML == 0) {
                squaresArray[i].setAttribute("class", "joemama")
            }
        }
    }
    colorChanger()
})
