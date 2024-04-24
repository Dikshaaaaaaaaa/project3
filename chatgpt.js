const socket = new WebSocket('ws://localhost:3000');

socket.onopen = function(event) {
  console.log('WebSocket connection established');
};

socket.onmessage = function(event) {
  const chatLog = document.getElementById('chat-log');
  chatLog.innerHTML += `<p><strong>Bot:</strong> ${event.data}</p>`;
  chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
};

socket.onclose = function(event) {
  console.log('WebSocket connection closed');
};

document.getElementById('send-button').addEventListener('click', function() {
  const userInput = document.getElementById('message-input').value;
  const chatLog = document.getElementById('chat-log');
  chatLog.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
  chatLog.scrollTop = chatLog.scrollHeight; // Scroll to bottom
  socket.send(userInput);
  document.getElementById('message-input').value = '';
});

document.getElementById('message-input').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    document.getElementById('send-button').click();
  }
});
