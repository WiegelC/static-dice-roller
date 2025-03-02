// Configuration
const SERVER_URL = 'https://dice-roller-node-js-server-dfe0ckepdmfxgbab.centralus-01.azurewebsites.net'; // Change this to your server's URL in production

// DOM Elements
const rollButton = document.getElementById('rollButton');
const diceResult = document.getElementById('diceResult');
const errorMessage = document.getElementById('error-message');
const instructions = document.getElementById('instructions');

// Event Listeners
rollButton.addEventListener('click', rollDice);

// Functions
async function rollDice() {
    try {
        // Disable button while rolling
        rollButton.disabled = true;
        rollButton.textContent = 'Rolling...';
        
        // Hide any previous error
        errorMessage.classList.add('hidden');
        
        // Call the server API
        const response = await fetch(`${SERVER_URL}/api/roll-dice`);
        
        if (!response.ok) {
            throw new Error('Server response was not ok');
        }
        
        const data = await response.json();
        diceResult.value = data.value;
    } catch (error) {
        console.error('Error rolling dice:', error);
        errorMessage.classList.remove('hidden');
        diceResult.value = '';
    } finally {
        // Re-enable button
        rollButton.disabled = false;
        rollButton.textContent = 'Roll Dice';
    }
}
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("rollButton").click();
    }
});
window.onload = function() {
    rollDice();
    document.getElementById("rollButton").focus();
};
function toggleInstructions() {
    instructions.classList.toggle('hidden');
} 