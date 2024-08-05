window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-palyer');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '' ,'' , '' ,'' , '' ,'' , '' ,''];
    let currentPlayer  = 'X';
    let isGameActive = true;

    const PLAYERX_WOW = 'PLAYER_WON';
    const PLAYERO_WOW = 'PALYERO_WON';
    const TIE = 'TIE';


    const winningconditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 8],
        [2, 4, 6],
    ];

    function handleResultValidation() {
        let roundation = false;
        for (let i = 0; i <= 7; i++) {
            const winCondtion = winningconditions[i];
            const a = board[winCondtion[0]];
            const b = board[winCondtion[1]];
            const c = board[winCondtion[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

       if (roundWon) {
        announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
       }

       if (!board.includes('')) {
        announce = (TIE);
       }
    

    const announce = (type) => {
        switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'player <span class = "playerO">O</span> WON';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'player <span class = "playerX">X</span> WON';
                break;
                case TIE:
                    announcer.innerText = 'tie';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return  false;
        }
        return true;
    }

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove('player${currentplayer}');
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive){
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentplayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () => {
        board = ['', '' ,'' , '' ,'' , '' ,'' , '' ,''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }


}

    tiles.forEach( (tile, indexe) => {
        tile.addEventListener('click', () => UserActivation(tile, index));
    }); 

 
     
    resetButton.addEventListener('click' , resetBoard);    
})