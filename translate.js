(function() {
  // Inject Google Translate CSS to hide their default UI and the top frame
  const style = document.createElement('style');
  style.innerHTML = `
    .goog-te-banner-frame.skiptranslate { display: none !important; }
    body { top: 0px !important; }
    #google_translate_element { display: none !important; }
    .goog-tooltip { display: none !important; }
    .goog-tooltip:hover { display: none !important; }
    .goog-text-highlight { background-color: transparent !important; border: none !important; box-shadow: none !important; }
  `;
  document.head.appendChild(style);

  // Add Google Translate Element container
  const gtDiv = document.createElement('div');
  gtDiv.id = 'google_translate_element';
  document.body.appendChild(gtDiv);

  // Initialize function
  window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,sw',
      autoDisplay: false
    }, 'google_translate_element');
  };

  // Load Google Translate script
  const gtScript = document.createElement('script');
  gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(gtScript);

  document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');
    const langSwitcher = document.getElementById('langSwitcher');

    if (langToggle && langSwitcher) {
      langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        langSwitcher.classList.toggle('open');
      });

      document.addEventListener('click', () => langSwitcher.classList.remove('open'));

      document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', () => {
          const lang = btn.dataset.lang; // 'en' or 'sw'
          
          // Trigger Google Translate
          const select = document.querySelector('.goog-te-combo');
          if (select) {
            select.value = lang;
            select.dispatchEvent(new Event('change'));
          }
          
          // Update the UI
          document.querySelectorAll('.lang-option').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          const toggleFlag = document.querySelector('.lang-flag');
          const toggleLabel = document.querySelector('.lang-label');
          if (toggleFlag) toggleFlag.innerHTML = btn.dataset.flag || btn.innerHTML.trim().split(' ')[0];
          if (toggleLabel) toggleLabel.innerHTML = btn.dataset.label;
          
          langSwitcher.classList.remove('open');
        });
      });
    }
  });
})();
