document.addEventListener('DOMContentLoaded', (event) => {
    let startChatBtn = document.getElementById('new-chat-btn');
    let formFields = document.getElementById('grade-subject-fields');
    let errorMessage = document.getElementById('error-message');
    let chatForm = document.getElementById('chat-form');
    let chatContent = document.getElementById('chat-content');
    let gradeSelect = document.getElementById('grade');
    let subjectSelect = document.getElementById('subject');
    let pastConversations = document.querySelectorAll('.past-conversations a');

    let intervalId;

    function scrollToBottom() {
        let chatHistory = document.querySelector('.chat-history');
        if (chatHistory) {
            chatHistory.scrollTop = chatHistory.scrollHeight;
            console.log("Scroll to bottom function called");
            clearInterval(intervalId);
        }
    }

    function hideError() {
        errorMessage.style.display = 'none';
    }

    function showError(message) {
        errorMessage.innerHTML = message;
        errorMessage.style.display = 'block';
    }

    function populateSelect(selectElem, items) {
        selectElem.innerHTML = '';

        let placeholderOption = document.createElement('option');
        placeholderOption.value = '';
        placeholderOption.textContent = 'Select...';
        selectElem.appendChild(placeholderOption);

        items.forEach(function(item) {
            let option = document.createElement('option');
            option.value = item.id;
            option.textContent = item.name;
            selectElem.appendChild(option);
        });

        selectElem.addEventListener('click', function() {
            this.style.backgroundColor = 'white';
            this.style.color = 'black';
        });
    }

//    function handleTextToSpeechClick(event) {
//        console.log('Hi i was called');
//        console.log(event.target);
//        console.log(event.target.dataset);
//        let aiResponse = event.target.dataset.message;
//        console.log(aiResponse);
//        let utterance = new SpeechSynthesisUtterance(aiResponse);
//        window.speechSynthesis.speak(utterance);
//    }



    // New function to add event listeners to all "Speak" buttons
//    function addTextToSpeechEventListeners() {
//        console.log('addTextToSpeechEventListeners called');
//        let speakBtns = document.querySelectorAll('.speak-btn');
//        speakBtns.forEach((btn) => {
//            btn.addEventListener('click', handleTextToSpeechClick);
//        });
//    }

    window.startNewChat = function() {
        fetch('/chatbot/get-grades-and-subjects/')
            .then(response => response.json())
            .then(data => {
                populateSelect(gradeSelect, data.grades);
                populateSelect(subjectSelect, data.subjects);

                chatForm.style.display = 'block';
                chatContent.style.display = 'none';

//                addTextToSpeechEventListeners();
            })
            .catch(error => console.error('Error:', error));

        let subjectId = subjectSelect.value;
        let gradeId = gradeSelect.value;

        if (!gradeId) {
            showError('Please select a grade.');
            return false;
        }



        if (!subjectId) {
            showError('Please select a subject.');
            return false;
        }



        hideError();

        document.getElementById('new_chat_state').value = 'Start Conversation';

        return true;
    };

    document.getElementById('new-chat-form').onsubmit = window.startNewChat;

    document.addEventListener('click', function(event) {
        if (event.target.matches('.past-conversations a') || event.target.matches('#submit-btn')) {
            intervalId = setInterval(scrollToBottom, 500);
        }
    });

    pastConversations.forEach(link => {
        link.addEventListener('click', () => {
            chatForm.style.display = 'none';
//            addTextToSpeechEventListeners();
        });
    });

    // Call the new function to add event listeners to the "Speak" buttons in the past messages
//    console.log('DOMContentLoaded event triggered');
//    addTextToSpeechEventListeners();

//    console.log("Script is loaded");
}
);
