const siteContent = {
  sections: [
    {
      title: "Hello There",
      content: `
      ***hello there chump***
      I'm *morozsky*. just a dude with a love for *code*. I assume you found this from my discord profile. I'd appriciate the comments about my website. Just DM me!
      `
    },
    {
      title: "fun fact about me (cuz why not)",
      content: `
        I like Russia. Why? No reason at all.
        If you think I care about anything, think again.
        Trying to learn Russian but its just too hard bro :(
        [This user is being tracked down because of being "way too offensive"]
      `
    }
  ]
};

// Markdown benzeri formatları HTML'e çeviren fonksiyon
function parseMarkdown(text) {
    // Superscript (^text^)
    text = text.replace(/\^([^\^]+)\^/g, '<sup>$1</sup>');
    
    // Bold (**text**)
    text = text.replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>');
    
    // Italic (*text*)
    text = text.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
    
    // Code (`text`)
    text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // Satır sonları
    text = text.replace(/\n/g, '<br>');
    
    return text;
}

// İçeriği sayfaya yerleştiren fonksiyon
function renderContent() {
    const contentDiv = document.getElementById('content');
    
    siteContent.sections.forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'section';
        
        // Başlık
        const title = document.createElement('h2');
        title.textContent = section.title;
        sectionDiv.appendChild(title);
        
        // İçerik
        const content = document.createElement('div');
        content.innerHTML = parseMarkdown(section.content);
        sectionDiv.appendChild(content);
        
        // Görsel (varsa)
        if (section.image) {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-container';
            
            const img = document.createElement('img');
            img.src = section.image.url;
            img.alt = section.image.caption || section.title;
            imageContainer.appendChild(img);
            
            if (section.image.caption) {
                const caption = document.createElement('p');
                caption.className = 'image-caption';
                caption.textContent = section.image.caption;
                imageContainer.appendChild(caption);
            }
            
            sectionDiv.appendChild(imageContainer);
        }
        
        contentDiv.appendChild(sectionDiv);
    });
}

// Sayfa yüklendiğinde içeriği render et
document.addEventListener('DOMContentLoaded', renderContent);
