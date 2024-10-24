document.addEventListener('DOMContentLoaded', () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

    const loginBtn = document.getElementById('login');
    const signupBtn = document.getElementById('signup');

    if (loginBtn && signupBtn) {
        loginBtn.addEventListener('click', () => {
            document.getElementById('login-modal').style.display = 'flex';
        });

        document.getElementById('login-submit').addEventListener('click', () => {
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                currentUser = user;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                window.location.href = "flashcards.html";
            } else {
                alert('Invalid credentials!');
            }
            document.getElementById('login-modal').style.display = 'none';
        });

        signupBtn.addEventListener('click', () => {
            document.getElementById('signup-modal').style.display = 'flex';
        });

        document.getElementById('signup-submit').addEventListener('click', () => {
            const username = document.getElementById('signup-username').value;
            const password = document.getElementById('signup-password').value;

            if (users.find(user => user.username === username)) {
                alert('Username already exists!');
            } else {
                const newUser = { username, password, flashcards: [] };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                alert('Signup successful! You can now log in.');
            }
            document.getElementById('signup-modal').style.display = 'none';
        });
    }

    if (window.location.pathname.includes('flashcards.html')) {
        if (!currentUser) {
            window.location.href = "index.html";
        }

        const flashcardsContainer = document.getElementById('flashcards-container');
        const modal = document.getElementById('flashcard-modal');
        const detailsModal = document.getElementById('flashcard-details-modal');

        function renderFlashcards() {
            flashcardsContainer.innerHTML = '';
            currentUser.flashcards.forEach((flashcard, index) => {
                const card = document.createElement('div');
                card.classList.add('flashcard');
                card.innerText = `Q: ${flashcard.question}`;
                flashcardsContainer.appendChild(card);

                card.addEventListener('click', () => {
                    document.getElementById('modal-question').innerText = flashcard.question;
                    document.getElementById('modal-answer').innerText = flashcard.answer;
                    detailsModal.style.display = 'flex';
                });
            });
        }

        document.getElementById('create-flashcard').addEventListener('click', () => {
            modal.style.display = 'flex';
        });

        document.getElementById('save-flashcard').addEventListener('click', () => {
            const questionInput = document.getElementById('question');
            const answerInput = document.getElementById('answer');

            const question = questionInput.value;
            const answer = answerInput.value;

            if (question && answer) {
                currentUser.flashcards.push({ question, answer });
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                renderFlashcards();
                modal.style.display = 'none';
                questionInput.value = '';
                answerInput.value = '';
            } else {
                alert("Please enter both question and answer.");
            }
        });

        document.getElementById('signout').addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            window.location.href = "index.html";
        });

        document.getElementById('close-modal').addEventListener('click', () => {
            detailsModal.style.display = 'none';
        });

        renderFlashcards();

        window.addEventListener('click', (e) => {
            if (e.target === modal || e.target === detailsModal) {
                modal.style.display = 'none';
                detailsModal.style.display = 'none';
            }
        });
    }

    const images = document.querySelectorAll('.hero-image');
    let currentImageIndex = 0;

    setInterval(() => {
        images[currentImageIndex].style.display = 'none';
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].style.display = 'block';
    }, 3000);
});
