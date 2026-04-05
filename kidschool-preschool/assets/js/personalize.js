/**
 * Cynix Inc. - Website Personalization Script
 * Dynamically replaces placeholder content with client data from localStorage
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'cynix_client';
  const GATE_PAGE = 'gate.html';

  /**
   * Check if we're on the gate page
   */
  function isGatePage() {
    return window.location.pathname.endsWith(GATE_PAGE) || 
           window.location.pathname.endsWith('gate.html');
  }

  /**
   * Check for reset parameter in URL
   */
  function checkForReset() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reset') === 'true') {
      localStorage.removeItem(STORAGE_KEY);
      urlParams.delete('reset');
      const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
      window.history.replaceState({}, document.title, newUrl);
      window.location.href = GATE_PAGE;
      return true;
    }
    return false;
  }

  /**
   * Get client data from localStorage
   */
  function getClientData() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading client data:', e);
      return null;
    }
  }

  /**
   * Redirect to gate page if no client data
   */
  function redirectToGate() {
    if (!isGatePage()) {
      window.location.href = GATE_PAGE;
    }
  }

  /**
   * Update page title
   */
  function updatePageTitle(data) {
    const title = document.querySelector('title');
    if (title) {
      let newTitle = title.textContent;
      newTitle = newTitle.replace(/Kidschool|KidSchool/gi, data.schoolName);
      title.textContent = newTitle;
    }
  }

  /**
   * Update meta description
   */
  function updateMetaDescription(data) {
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      let content = metaDesc.getAttribute('content');
      content = content.replace(/Kidschool|KidSchool/gi, data.schoolName);
      metaDesc.setAttribute('content', content);
    }
  }

  /**
   * Replace text content in elements with data-personalize attribute
   */
  function updatePersonalizeElements(data) {
    const elements = document.querySelectorAll('[data-personalize]');
    elements.forEach(function(el) {
      const field = el.getAttribute('data-personalize');
      if (data[field]) {
        el.textContent = data[field];
      }
    });
  }

  /**
   * Update href attributes for tel: and mailto: links
   */
  function updateContactLinks(data) {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(function(link) {
      const cleanPhone = data.phone.replace(/\s+/g, '');
      link.setAttribute('href', 'tel:' + cleanPhone);
    });

    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(function(link) {
      link.setAttribute('href', 'mailto:' + data.email);
    });
  }

  /**
   * Find and replace text patterns in the document
   */
  function replaceTextPatterns(data) {
    const replacements = [
      { pattern: /Kidschool|KidSchool|Kidscholl/gi, value: data.schoolName },
      { pattern: /\+208-555-0112/g, value: data.phone },
      { pattern: /kidscholl@gmail\.com/gi, value: data.email },
      { pattern: /Elgin St\. Celina, NY 10299/g, value: data.address }
    ];

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach(function(node) {
      let text = node.textContent;
      let changed = false;

      replacements.forEach(function(rep) {
        if (rep.pattern.test(text)) {
          text = text.replace(rep.pattern, rep.value);
          changed = true;
          rep.pattern.lastIndex = 0;
        }
      });

      if (changed) {
        node.textContent = text;
      }
    });
  }

  /**
   * Update copyright text
   */
  function updateCopyright(data) {
    const copyrightElements = document.querySelectorAll('footer span, footer p');
    copyrightElements.forEach(function(el) {
      if (el.textContent.includes('Copyright') || el.textContent.includes('©')) {
        el.textContent = el.textContent.replace(/Kidschool|KidScholl/gi, data.schoolName);
      }
    });
  }

  /**
   * Update banner tagline if custom tagline provided
   */
  function updateTagline(data) {
    if (data.tagline && data.tagline !== 'Preschool & Kindergarten') {
      const taglineElements = document.querySelectorAll('[data-personalize="tagline"]');
      taglineElements.forEach(function(el) {
        el.textContent = data.tagline;
      });
    }
  }

  /**
   * Main personalization function
   */
  function personalize(data) {
    updatePageTitle(data);
    updateMetaDescription(data);
    updatePersonalizeElements(data);
    updateContactLinks(data);
    replaceTextPatterns(data);
    updateCopyright(data);
    updateTagline(data);
    document.body.classList.add('personalized');
    console.log('Website personalized for:', data.schoolName);
  }

  /**
   * Initialize personalization
   */
  function init() {
    if (isGatePage()) {
      return;
    }

    if (checkForReset()) {
      return;
    }

    const clientData = getClientData();

    if (!clientData) {
      redirectToGate();
      return;
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        personalize(clientData);
      });
    } else {
      personalize(clientData);
    }
  }

  init();

  window.cynixReset = function() {
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = GATE_PAGE;
  };

})();
