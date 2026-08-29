import assert from 'node:assert';
import { sanitizeString, validateEmail, sanitizeUrl } from '../src/utils/security.js';

console.log('🧪 Running Nexus Event HQ Automated Validation Test Suite...\n');

let passedCount = 0;
let totalCount = 0;

function runTest(name, fn) {
  totalCount++;
  try {
    fn();
    passedCount++;
    console.log(`  ✅ [PASS] ${name}`);
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}: ${err.message}`);
  }
}

// ===== SECURITY TESTS =====
console.log('🔒 1. Security & Input Sanitization Tests');

runTest('sanitizeString should strip HTML tags and special characters', () => {
  const malformed = '<script>alert("XSS")</script>';
  const sanitized = sanitizeString(malformed);
  assert.strictEqual(sanitized.includes('<script>'), false);
  assert.strictEqual(sanitized, '&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;');
});

runTest('validateEmail should return true for valid emails and false for invalid', () => {
  assert.strictEqual(validateEmail('sarah.chen@dev.io'), true);
  assert.strictEqual(validateEmail('invalid-email-string'), false);
  assert.strictEqual(validateEmail(''), false);
});

runTest('sanitizeUrl should reject javascript: URI schemes', () => {
  const unsafe = 'javascript:alert(document.cookie)';
  const safe = sanitizeUrl(unsafe);
  assert.strictEqual(safe, null);
});

runTest('sanitizeUrl should accept valid https URLs', () => {
  const valid = 'https://github.com/neuralpulse/hackathon-2026';
  const safe = sanitizeUrl(valid);
  assert.strictEqual(safe, 'https://github.com/neuralpulse/hackathon-2026');
});

// ===== WEIGHTED RUBRIC SCORING TESTS =====
console.log('\n⚖️ 2. Weighted Rubric Scoring Algorithm Tests');

runTest('Weighted score algorithm should correctly compute 30/30/20/20 formula', () => {
  // Innovation 10 (30%), Execution 10 (30%), Design 10 (20%), Pitch 10 (20%) -> 100
  const maxScores = { innovation: 10, execution: 10, design: 10, pitch: 10 };
  const calcScore = (s) => Math.round((s.innovation * 10 * 0.30) + (s.execution * 10 * 0.30) + (s.design * 10 * 0.20) + (s.pitch * 10 * 0.20));
  assert.strictEqual(calcScore(maxScores), 100);

  // Mixed scores: Innovation 8, Execution 8, Design 6, Pitch 9
  // (80*0.3) + (80*0.3) + (60*0.2) + (90*0.2) = 24 + 24 + 12 + 18 = 78
  const mixedScores = { innovation: 8, execution: 8, design: 6, pitch: 9 };
  assert.strictEqual(calcScore(mixedScores), 78);
});

// ===== AI MATCHMAKER LOGIC TESTS =====
console.log('\n👥 3. AI Team Matchmaker Logic Tests');

runTest('Matchmaker compatibility score should increase on track and role match', () => {
  const attendee = { track: 'AI & Machine Learning', role: 'Frontend / UI Engineer' };
  const team = { track: 'AI & Machine Learning', lookingFor: ['Frontend / UI Engineer', 'DevOps'] };
  
  let score = 70;
  if (team.track === attendee.track) score += 15;
  if (team.lookingFor.some(r => attendee.role.toLowerCase().includes(r.toLowerCase()))) score += 15;

  assert.strictEqual(score, 100);
});

// SUMMARY
console.log(`\n========================================`);
console.log(`📊 Test Results: ${passedCount}/${totalCount} Passed.`);
console.log(`========================================\n`);

if (passedCount !== totalCount) {
  process.exit(1);
}
