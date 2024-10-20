<script>
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
                    window.Telegram.WebApp.ready();
                    updateStatus('Telegram.WebApp.ready() called successfully');
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
</script>
