document.getElementById('generateBtn').addEventListener('click', generateConlang);

function generateConlang() {
    const phonemes = ['ka', 'to', 'ri', 'mi', 'lu', 'za', 'po', 'ni', 'sha', 've'];
    const grammarRules = ['SVO (Subject-Verb-Object)', 'SOV (Subject-Object-Verb)', 'VSO (Verb-Subject-Object)'];
    const vocabularySize = Math.floor(Math.random() * 50) + 50;

    const generatedWords = [];
    for (let i = 0; i < vocabularySize; i++) {
        const wordLength = Math.floor(Math.random() * 3) + 2;
        let word = '';
        for (let j = 0; j < wordLength; j++) {
            word += phonemes[Math.floor(Math.random() * phonemes.length)];
        }
        generatedWords.push(word);
    }

    const grammarRule = grammarRules[Math.floor(Math.random() * grammarRules.length)];

    document.getElementById('conlangResult').innerHTML = `
        <strong>Grammar:</strong> ${grammarRule}<br>
        <strong>Sample Vocabulary (${vocabularySize} words):</strong> ${generatedWords.join(', ')}
    `;

    document.getElementById('output').style.display = 'block';
}
