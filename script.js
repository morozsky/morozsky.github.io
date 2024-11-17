document.getElementById('generateBtn').addEventListener('click', generateConlang);

function generateConlang() {
    // Get user input or set defaults
    const consonants = document.getElementById('consonants').value.split(',').filter(Boolean) || ['k', 't', 'r', 'm', 'l', 'z', 'p', 'n', 'sh', 'v'];
    const vowels = document.getElementById('vowels').value.split(',').filter(Boolean) || ['a', 'e', 'i', 'o', 'u'];
    const syllableStructures = document.getElementById('syllables').value.split(',').filter(Boolean) || ['CV', 'CVC', 'VC'];
    const grammarRule = document.getElementById('grammar').value;

    // Phonotactic rules: no double identical consonants or vowels
    function isPhonotacticallyValid(word) {
        return !/(.)\1/.test(word); // Disallows repeating the same letter back-to-back
    }

    // Create a word based on user-defined syllable structure
    function createWord() {
        let word = '';
        const structure = syllableStructures[Math.floor(Math.random() * syllableStructures.length)];

        for (let i = 0; i < structure.length; i++) {
            if (structure[i] === 'C') {
                word += consonants[Math.floor(Math.random() * consonants.length)];
            } else if (structure[i] === 'V') {
                word += vowels[Math.floor(Math.random() * vowels.length)];
            }
        }

        // Ensure word is valid according to phonotactic rules
        return isPhonotacticallyValid(word) ? word : createWord();
    }

    // Generate words with basic morphology (prefixes/suffixes)
    const prefixes = ['pre', 'un', 'anti', 'neo'];
    const suffixes = ['-ish', '-ly', '-ment', '-ist'];

    function generateMorphedWord(baseWord) {
        const usePrefix = Math.random() > 0.5;
        const useSuffix = Math.random() > 0.5;

        let word = baseWord;
        if (usePrefix) {
            word = prefixes[Math.floor(Math.random() * prefixes.length)] + word;
        }
        if (useSuffix) {
            word += suffixes[Math.floor(Math.random() * suffixes.length)];
        }

        return isPhonotacticallyValid(word) ? word : baseWord;
    }

    const dictionary = {
        noun: [],
        verb: [],
        adjective: [],
        adverb: []
    };

    for (const part in dictionary) {
        const wordCount = Math.floor(Math.random() * 10) + 5;
        for (let i = 0; i < wordCount; i++) {
            const baseWord = createWord();
            dictionary[part].push(generateMorphedWord(baseWord));
        }
    }

    // Display the result
    let resultHTML = `<strong>Grammar:</strong> ${grammarRule}<br>`;
    for (const part in dictionary) {
        resultHTML += `<strong>${part.charAt(0).toUpperCase() + part.slice(1)}s:</strong> ${dictionary[part].join(', ')}<br>`;
    }

    document.getElementById('conlangResult').innerHTML = resultHTML;
    document.getElementById('output').style.display = 'block';
}
