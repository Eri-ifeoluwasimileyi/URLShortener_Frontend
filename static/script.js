document.getElementById('urlForm').addEventListener('submit', async (e) => {
    
    e.preventDefault();
    const originalUrl = document.getElementById('originalUrl').value;
    const resultDiv = document.getElementById('result');

    try {
        const response = await fetch('http://localhost:5000/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ long: originalUrl }),
        });

        if (!response.ok) {
            throw new Error('Failed to shorten URL');
        }

        const data = await response.json();
        resultDiv.innerHTML = `
            <div class="result-box">
                <p> Your shortened URL:</p>
                <a id="shortUrl" href="${data.shortened_url}" target="_blank">${data.shortened_url}</a>
                <br><br>
                <button onclick="copyToClipboard('${data.shortened_url}')">Copy</button>
            </div>    
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard!');
    });
}
