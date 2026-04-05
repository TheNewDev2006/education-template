/**
 * URL Parameter Personalization for Cold Outreach
 * Cynix Inc Digital Solutions
 * 
 * Usage: Add query parameters to personalize content
 * Example: index.html?bn=Acme%20Corp&e=contact@acme.com&p=+1234567890
 */
(function() {
    'use strict';
    const DEFAULTS = {
        business_name: 'Cynix Inc Digital Solutions',
        email: 'info.cynixinc@gmail.com',
        phone: '+94722558244',
        address: '267, Jampettah Street, Colombo 13',
        website: 'cynixinc.com',
        tagline: 'Transform Your Vision Into Reality',
        logo: '',
        color: '',
        facebook: 'https://facebook.com',
        twitter: 'https://twitter.com',
        linkedin: 'https://linkedin.com',
        instagram: 'https://instagram.com'
    };
    const PARAM_MAP = {
        'bn': 'business_name', 'e': 'email', 'p': 'phone', 'a': 'address',
        'w': 'website', 't': 'tagline', 'logo': 'logo', 'color': 'color',
        'fb': 'facebook', 'tw': 'twitter', 'li': 'linkedin', 'ig': 'instagram'
    };
    function getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const values = { ...DEFAULTS };
        for (const [shortKey, fullKey] of Object.entries(PARAM_MAP)) {
            const value = params.get(shortKey);
            if (value) values[fullKey] = decodeURIComponent(value);
        }
        return values;
    }
    function applyPersonalization(data) {
        document.querySelectorAll('[data-personalize]').forEach(el => {
            const field = el.getAttribute('data-personalize');
            if (data[field]) {
                if (el.tagName === 'IMG') el.src = data[field];
                else if (el.tagName === 'A') {
                    if (field === 'email') { el.href = 'mailto:' + data[field]; if (!el.hasAttribute('data-personalize-text-off')) el.textContent = data[field]; }
                    else if (field === 'phone') { el.href = 'tel:' + data[field].replace(/\s/g, ''); if (!el.hasAttribute('data-personalize-text-off')) el.textContent = data[field]; }
                    else if (field.match(/facebook|twitter|linkedin|instagram/)) el.href = data[field];
                    else { el.href = data[field]; if (!el.hasAttribute('data-personalize-text-off')) el.textContent = data[field]; }
                } else el.textContent = data[field];
            }
        });
        const metaTitle = document.querySelector('title');
        if (metaTitle) metaTitle.textContent = metaTitle.textContent.replace(/Faren|themeholy|UX-Theme|Flavor starter|Flavor starter|wellfood|BuildNow|KidSchool|Flavor starter|starterTemplate/gi, data.business_name);
        if (data.color) {
            document.documentElement.style.setProperty('--theme-color', data.color);
            document.documentElement.style.setProperty('--theme-color2', data.color);
            document.documentElement.style.setProperty('--primary-color', data.color);
        }
        if (data.logo) {
            document.querySelectorAll('.header-logo img, .mobile-logo img, .about-logo img, .footer-logo img, [class*="logo"] img').forEach(img => {
                img.src = data.logo; img.alt = data.business_name;
            });
        }
        replaceBrandNames(data.business_name);
    }
    function replaceBrandNames(businessName) {
        const patterns = [/Faren\s*/gi, /themeholy/gi, /UX-Theme/gi, /Theme\s*Holy/gi, /wellfood/gi, /BuildNow/gi, /KidSchool/gi, /Flavor starter/gi];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        const nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(node => {
            let text = node.textContent;
            patterns.forEach(p => { text = text.replace(p, businessName + ' '); });
            if (text !== node.textContent) node.textContent = text.trim();
        });
    }
    function preserveParams() {
        const currentParams = window.location.search;
        if (!currentParams) return;
        document.querySelectorAll('a[href]').forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('#') && !href.startsWith('javascript:')) {
                const sep = href.includes('?') ? '&' : '?';
                const params = currentParams.substring(1);
                if (params && !href.includes(params)) link.setAttribute('href', href + sep + params);
            }
        });
    }
    function init() {
        const data = getUrlParams();
        applyPersonalization(data);
        preserveParams();
        window.PersonalizationData = data;
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
    window.Personalization = { getData: getUrlParams, apply: applyPersonalization, defaults: DEFAULTS, paramMap: PARAM_MAP };
})();
