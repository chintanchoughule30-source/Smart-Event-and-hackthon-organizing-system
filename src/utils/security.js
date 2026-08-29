/**
 * Security & Input Sanitization Utilities
 * Implements input validation, XSS prevention, and safe link parsing.
 */

/**
 * Sanitizes string input to prevent XSS injection attacks.
 * Converts special HTML characters into safe entity equivalents.
 * @param {string} str - Raw user input string
 * @returns {string} Sanitized safe string
 */
export function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Validates and sanitizes email address format.
 * @param {string} email
 * @returns {boolean} True if valid email structure
 */
export function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email.trim());
}

/**
 * Validates URLs to ensure they use safe protocols (http, https).
 * Prevents javascript: or data: URI injection attacks.
 * @param {string} urlString
 * @returns {string|null} Sanitized safe URL or null if invalid/unsafe
 */
export function sanitizeUrl(urlString) {
  if (!urlString || typeof urlString !== 'string') return null;
  const trimmed = urlString.trim();
  try {
    const parsed = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.href;
    }
  } catch {
    // Invalid URL structure
  }
  return null;
}

/**
 * Returns safe rel and target attributes for external links.
 * Protects against tabnabbing vulnerability.
 */
export const SAFE_EXTERNAL_LINK_PROPS = {
  target: '_blank',
  rel: 'noopener noreferrer'
};
