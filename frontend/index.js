const translateBtn = document.getElementById('translateBtn');
const speakBtn = document.getElementById('speakBtn');
const sourceText = document.getElementById('sourceText');
const targetLang = document.getElementById('targetLang');
const translatedText = document.getElementById('translatedText');
const resultSection = document.getElementById('resultSection');
const translateSpinner = document.getElementById('translateSpinner');

async function translateText() {
    const text = sourceText.value.trim();
    if (!text) return;

    // Show loading state
    translateBtn.disabled = true;
    translateSpinner.classList.remove('d-none');
    resultSection.style.display = 'none';

    try {
        const langCode = targetLang.value;
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${langCode}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.responseStatus === 200) {
            translatedText.textContent = data.responseData.translatedText;
            resultSection.style.display = 'block';
        } else {
            throw new Error('Translation failed');
        }
    } catch (error) {
        alert('Error during translation. Please try again.');
    } finally {
        // Hide loading state
        translateBtn.disabled = false;
        translateSpinner.classList.remove('d-none');
    }
}

function speakText() {
    const text = translatedText.textContent;
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = targetLang.value;
    speechSynthesis.speak(utterance);
}

// Event Listeners
translateBtn.addEventListener('click', translateText);
speakBtn.addEventListener('click', speakText);

// Handle Enter key in textarea
sourceText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        translateText();
    }
});
