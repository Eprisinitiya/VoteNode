document.addEventListener("DOMContentLoaded", () => {
    const pollForm = document.getElementById("poll-form");
    const pollContainer = document.getElementById("poll-container");
    const pollCreatedMessage = document.getElementById("poll-created-message");

    let currentPoll = null;

    // Create Poll
    pollForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("poll-title").value;
        const options = document.getElementById("poll-options").value.split(",").map(option => option.trim());

        currentPoll = {
            title: title,
            options: options,
            votes: Array(options.length).fill(0)
        };

        pollCreatedMessage.textContent = "Poll created successfully!";
        renderPoll();
    });

    // Render Poll
    function renderPoll() {
        if (!currentPoll) {
            pollContainer.innerHTML = "<p>No poll available. Create one to get started.</p>";
            return;
        }

        const pollHTML = `
            <h3>${currentPoll.title}</h3>
            <ul>
                ${currentPoll.options.map((option, index) => `
                    <li>
                        <button onclick="vote(${index})">${option}</button>
                    </li>
                `).join("")}
            </ul>
            <p>Results:</p>
            <ul>
                ${currentPoll.options.map((option, index) => `
                    <li>${option}: ${currentPoll.votes[index]} votes</li>
                `).join("")}
            </ul>
        `;

        pollContainer.innerHTML = pollHTML;
    }

    // Vote Function
    window.vote = (index) => {
        if (currentPoll) {
            currentPoll.votes[index]++;
            renderPoll();
        }
    };
});