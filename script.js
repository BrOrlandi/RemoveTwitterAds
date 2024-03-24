// ==UserScript==
// @name         Remove Twitter Ads
// @namespace    http://tampermonkey.net/
// @version      2024-03-24
// @description  Remove Twiter Ads from your timeline
// @author       BrOrlandi
// @match        https://twitter.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=twitter.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Throttle function to limit execution frequency
function throttle(callback, delay) {
  let lastCallTime = 0;
  return function (...args) {
      const now = Date.now();
      if (now - lastCallTime >= delay) {
          callback(...args);
          lastCallTime = now;
      }
  };
}

  const hideAds = () => {

      const spanElements = document.querySelectorAll('span');

      // Iterate through each <span> element
      spanElements.forEach((span) => {
          if (span.textContent.includes('Promovido')) {
              // Find the parent element with the specified attribute and value
              const parentElement = span.closest('[data-testId="cellInnerDiv"]:not([data-removed="true"])');

              // Check if the parent element exists
              if (parentElement) {
                  // Modify the border style of the parent element
                  parentElement.style.height = '0px';
                  parentElement.style.overflow = 'hidden';
                  parentElement.setAttribute('data-removed', 'true')

                  console.log('Ad removed:')
                  console.log(parentElement.innerText)
                  return;
              }

              const parentTrendElement = span.closest('[data-testId="trend"]:not([data-removed="true"])');

              // Check if the parent element exists
              if (parentTrendElement) {
                  // Modify the border style of the parent element
                  parentTrendElement.style.height = '0px';
                  parentTrendElement.style.overflow = 'hidden';
                  parentTrendElement.style.padding = '0px';
                  parentTrendElement.setAttribute('data-removed', 'true')

                  console.log('Ad in Trend removed:')
                  console.log(parentTrendElement.innerText)
                  return;
              }
          }
      });
  }

  console.log('Avoiding ads');
  hideAds();
  window.addEventListener('scroll', throttle(hideAds, 200));
})();