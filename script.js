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
        pollCreatedMessage.classList.add("animate-bounce");
        setTimeout(() => pollCreatedMessage.classList.remove("animate-bounce"), 2000);
        renderPoll();
    });

    // Render Poll
    function renderPoll() {
        if (!currentPoll) {
            pollContainer.innerHTML = "<p class='text-gray-400'>No poll available. Create one to get started.</p>";
            return;
        }

        const pollHTML = `
            <h3 class="text-3xl font-bold mb-4">${currentPoll.title}</h3>
            <div class="space-y-4">
                ${currentPoll.options.map((option, index) => `
                    <button onclick="vote(${index})"
                        class="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition transform hover:scale-105">
                        ${option}
                    </button>
                `).join("")}
            </div>
            <p class="text-lg text-gray-300 mt-6">Results:</p>
            <ul class="mt-4 space-y-2">
                ${currentPoll.options.map((option, index) => `
                    <li class="text-white">${option}: ${currentPoll.votes[index]} votes</li>
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
