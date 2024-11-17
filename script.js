document.getElementById('generateBtn').addEventListener('click', generateConlang);

function generateConlang() {
    // Get user input or set defaults
    const consonants = document.getElementById('consonants').value.split(',').map(c => c.trim()).filter(Boolean);
    const vowels = document.getElementById('vowels').value.split(',').map(v => v.trim()).filter(Boolean);
    const syllableStructures = document.getElementById('syllables').value.split(',').map(s => s.trim()).filter(Boolean);
    const phonotacticConstraints = document.getElementById('phonotactic').value.split(',').map(rule => rule.trim()).filter(Boolean);
    const grammarRule = document.getElementById('grammar').value;

    // Validate input
    if (consonants.length === 0 || vowels.length === 0 || syllableStructures.length === 0) {
        alert('Please provide consonants, vowels, and syllable structures.');
        return;
    }

    // Simple English words for translations
    const translations = {
        noun: ['tree', 'sky', 'ocean', 'mountain', 'bird', 'stone', 'light', 'shadow', 'fire', 'wind'],
        verb: ['run', 'jump', 'fly', 'sing', 'write', 'think', 'swim', 'create', 'watch', 'build'],
        adjective: ['red', 'blue', 'bright', 'dark', 'quiet', 'loud', 'sharp', 'smooth', 'cold', 'warm'],
        adverb: ['quickly', 'silently', 'gracefully', 'boldly', 'softly', 'hastily', 'rarely', 'often', 'barely', 'always']
    };

    function isPhonotacticallyValid(word) {
        for (const rule of phonotacticConstraints) {
            if (rule.startsWith("no ")) {
                const pattern = rule.replace("no ", "").trim();
                if (word.includes(pattern)) {
                    return false;
                }
            }
        }
        return true;
    }

    function createWord(maxTries = 10) {
        for (let attempt = 0; attempt < maxTries; attempt++) {
            let word = '';
            const structure = syllableStructures[Math.floor(Math.random() * syllableStructures.length)];

            for (let i = 0; i < structure.length; i++) {
                if (structure[i] === 'C') {
                    word += consonants[Math.floor(Math.random() * consonants.length)];
                } else if (structure[i] === 'V') {
                    word += vowels[Math.floor(Math.random() * vowels.length)];
                }
            }

            if (isPhonotacticallyValid(word)) {
                return word;
            }
        }
        console.warn('Failed to create a valid word after max tries.');
        return '';
    }

    const dictionary = {
        noun: [],
        verb: [],
        adjective: [],
        adverb: []
    };

    function generateDictionary() {
        for (const part in dictionary) {
            const wordCount = Math.min(translations[part].length, Math.floor(Math.random() * 5) + 5);
            for (let i = 0; i < wordCount; i++) {
                const baseWord = createWord();
                if (baseWord) {
                    dictionary[part].push({ word: baseWord, translation: translations[part][i] });
                }
            }
        }
    }

    function generateExampleSentence() {
        const subjects = dictionary['noun'];
        const verbs = dictionary['verb'];
        const objects = dictionary['noun'];

        if (subjects.length && verbs.length && objects.length) {
            let sentence;
            switch (grammarRule) {
                case 'SVO':
                    sentence = `${subjects[0].word} ${verbs[0].word} ${objects[1].word}.`;
                    break;
                case 'SOV':
                    sentence = `${subjects[0].word} ${objects[1].word} ${verbs[0].word}.`;
                    break;
                case 'VSO':
                    sentence = `${verbs[0].word} ${subjects[0].word} ${objects[1].word}.`;
                    break;
                case 'OSV':
                    sentence = `${objects[1].word} ${subjects[0].word} ${verbs[0].word}.`;
                    break;
                default:
                    return 'Invalid grammar rule.';
            }

            // Translation of the example sentence
            const sentenceTranslation = `${subjects[0].translation} ${verbs[0].translation} ${objects[1].translation}.`;
            return { sentence, translation: sentenceTranslation };
        }
        return { sentence: 'Insufficient words to generate an example sentence.', translation: '' };
    }

    generateDictionary();

    // Display the dictionary with translations
    let dictionaryHTML = '';
    for (const part in dictionary) {
        dictionaryHTML += `<strong>${part.charAt(0).toUpperCase() + part.slice(1)}s:</strong><br>`;
        dictionary[part].forEach(entry => {
            dictionaryHTML += `${entry.word} - ${entry.translation}<br>`;
        });
    }
    document.getElementById('dictionaryOutput').innerHTML = dictionaryHTML;

    // Display the example sentence
    const example = generateExampleSentence();
    document.getElementById('sentenceOutput').innerHTML = `<strong>Conlang Sentence:</strong> ${example.sentence}<br><strong>Translation:</strong> ${example.translation}`;

    document.getElementById('output').style.display = 'block';
}
