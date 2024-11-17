document.getElementById('generateBtn').addEventListener('click', generateConlang);

function generateConlang() {
    // Get user input or set defaults
    const consonants = document.getElementById('consonants').value.split(',').filter(Boolean) || ['k', 't', 'r', 'm', 'l', 'z', 'p', 'n', 'sh', 'v'];
    const vowels = document.getElementById('vowels').value.split(',').filter(Boolean) || ['a', 'e', 'i', 'o', 'u'];
    const syllableStructures = document.getElementById('syllables').value.split(',').filter(Boolean) || ['CV', 'CVC', 'VC'];
    const phonotacticConstraints = document.getElementById('phonotactic').value.split(',').map(rule => rule.trim()).filter(Boolean);
    const grammarRule = document.getElementById('grammar').value;

    function isPhonotacticallyValid(word) {
        // Check custom phonotactic constraints
        for (const rule of phonotacticConstraints) {
            if (rule.startsWith("no ")) {
                const pattern = rule.replace("no ", "").trim();
                if (word.includes(pattern)) {
                    return false;
                }
            }
        }
        return !/(.)\1/.test(word); // Also checks for repeated consecutive characters
    }

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

        return isPhonotacticallyValid(word) ? word : createWord();
    }

    function generateMorphedWord(baseWord) {
        const prefixes = ['pre', 'un', 'anti', 'neo'];
        const suffixes = ['-ish', '-ly', '-ment', '-ist'];

        let word = baseWord;
        if (Math.random() > 0.5) word = prefixes[Math.floor(Math.random() * prefixes.length)] + word;
        if (Math.random() > 0.5) word += suffixes[Math.floor(Math.random() * suffixes.length)];

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

    function generateExampleSentence() {
        const subjects = dictionary['noun'];
        const verbs = dictionary['verb'];
        const objects = dictionary['noun'];
        if (subjects.length && verbs.length && objects.length) {
            switch (grammarRule) {
                case 'SVO':
                    return `${subjects[0]} ${verbs[0]} ${objects[1]}.`;
                case 'SOV':
                    return `${subjects[0]} ${objects[1]} ${verbs[0]}.`;
                case 'VSO':
                    return `${verbs[0]} ${subjects[0]} ${objects[1]}.`;
                case 'OSV':
                    return `${objects[1]} ${subjects[0]} ${verbs[0]}.`;
                default:
                    return 'Invalid grammar rule.';
            }
        }
        return 'Insufficient words to generate an example sentence.';
    }

    // Display the dictionary
    let dictionaryHTML = '';
    for (const part in dictionary) {
        dictionaryHTML += `<strong>${part.charAt(0).toUpperCase() + part.slice(1)}s:</strong> ${dictionary[part].join(', ')}<br>`;
    }
    document.getElementById('dictionaryOutput').innerHTML = dictionaryHTML;

    // Display the example sentence
    document.getElementById('sentenceOutput').innerText = generateExampleSentence();

    document.getElementById('output').style.display = 'block';
}
