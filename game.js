// Initialize Telegram WebApp
let tg;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    var gameContainer = document.getElementById('game-container');
    
    function updateStatus(message) {
        console.log(message);
        gameContainer.innerHTML += '<p>' + message + '</p>';
    }

    updateStatus('JavaScript is running');

    if (window.Telegram) {
        updateStatus('Telegram object is available');
        if (window.Telegram.WebApp) {
            updateStatus('Telegram.WebApp is available');
            try {
                tg = window.Telegram.WebApp;
                tg.ready();
                updateStatus('Telegram.WebApp.ready() called successfully');
                initGame();
            } catch (e) {
                updateStatus('Error calling Telegram.WebApp.ready(): ' + e.message);
            }
        } else {
            updateStatus('Telegram.WebApp is not available');
        }
    } else {
        updateStatus('Telegram object is not available');
    }
});

function initGame() {
    updateStatus('Initializing game...');
    tg.setHeaderColor('#4CAF50');

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        updateStatus('User is connected. Starting game...');
        startGame();
    } else {
        updateStatus('User not connected. Prompting for connection...');
        promptConnection();
    }
}

function promptConnection() {
    tg.showPopup({
        title: 'Connect Telegram Account',
        message: 'Please connect your Telegram account to play the game.',
        buttons: [
            {text: 'Connect', type: 'ok'},
            {text: 'Cancel', type: 'close'}
        ]
    }, function(buttonId) {
        if (buttonId === 'ok') {
            updateStatus('User agreed to connect. Requesting access...');
            tg.requestWriteAccess(function(result) {
                if (result) {
                    updateStatus('Access granted. Starting game...');
                    startGame();
                } else {
                    updateStatus('Access denied.');
                }
            });
        } else {
            updateStatus('User declined to connect.');
        }
    });
}

function startGame() {
    updateStatus('Game started!');
    // Add your game initialization logic here
}

function updateStatus(message) {
    console.log(message);
    document.getElementById('game-container').innerHTML += '<p>' + message + '</p>';
}
