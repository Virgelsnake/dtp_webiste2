# Web Team: TestFlight Privacy Policy Deployment Instructions

**Date:** 13 January 2026  
**Project:** 10 Touches iOS App  
**Priority:** High (Required before TestFlight submission)

---

## Objective

Create a new privacy policy page for the TestFlight beta version of 10 Touches at:

**URL:** `https://digitaltechnologypartner.ai/10-touches/privacy/beta`

---

## Requirements

### 1. Content Source

The complete privacy policy content is provided in the file:
- **Source:** `docs/PRIVACY_POLICY_TESTFLIGHT.md`
- **Format:** Markdown

Please convert this Markdown content to HTML whilst preserving all formatting, headings, lists, tables, and emphasis.

### 2. Design & Branding

The new TestFlight privacy policy page **must match** the existing production privacy policy page:

**Reference Page:** `https://digitaltechnologypartner.ai/10-touches/privacy`

**Match the following:**
- ✅ Overall page layout and structure
- ✅ Typography (fonts, sizes, line heights)
- ✅ Colour scheme and brand colours
- ✅ Header and footer styling
- ✅ Navigation elements (if present)
- ✅ Responsive design for mobile/tablet/desktop
- ✅ Table styling (the TestFlight policy includes comparison tables)
- ✅ Link styling and hover states
- ✅ Spacing and padding consistency

**Only change:** The body copy/content (use the TestFlight version)

### 3. Technical Requirements

- **URL Structure:** `/10-touches/privacy/beta` (note: hyphenated path)
- **Meta Tags:** Update page title to "Privacy Policy - 10 Touches (TestFlight Beta)"
- **Canonical URL:** Should point to itself (not the production privacy page)
- **Robots:** Allow indexing (no noindex tag)
- **HTTPS:** Must be served over HTTPS
- **Performance:** Page should load quickly (< 2 seconds)

### 4. Content Highlights

The TestFlight privacy policy includes:
- Standard privacy policy provisions (same as production)
- **Additional section:** Bug reporting feature disclosure (TestFlight-only)
- Comparison tables showing what data is/isn't collected
- Links to the production privacy policy
- Contact information

### 5. Testing Checklist

Before marking as complete, please verify:

- [ ] URL is accessible: `https://digitaltechnologypartner.ai/10-touches/privacy/beta`
- [ ] Page matches production privacy page styling exactly
- [ ] All headings render correctly (H1, H2, H3)
- [ ] All bullet points and numbered lists display properly
- [ ] Tables render correctly and are responsive on mobile
- [ ] All internal/external links work (especially link to production privacy policy)
- [ ] Email addresses are clickable (privacy@digitaltechnologypartner.ai, etc.)
- [ ] Page is responsive on mobile, tablet, and desktop
- [ ] No console errors in browser developer tools
- [ ] Page loads over HTTPS with valid certificate

### 6. Timeline

**Deadline:** Before TestFlight build submission (ASAP)

This URL is hardcoded in the iOS app and **must be live** before we can submit to TestFlight.

### 7. Deployment Steps

1. Convert `docs/PRIVACY_POLICY_TESTFLIGHT.md` from Markdown to HTML
2. Apply the same CSS/styling as the production privacy page
3. Update meta tags and page title
4. Deploy to `/10-touches/privacy/beta` path
5. Test all requirements in the checklist above
6. Notify iOS team when live

---

## Contact

If you have any questions or need clarification, please contact:

**iOS Development Team**  
**Email:** [Your contact email]

---

## Appendix: Key Differences from Production Privacy Policy

The TestFlight privacy policy includes these **additional** sections not in the production version:

1. **Section 2:** "Bug Reporting Feature (TestFlight Only)"
   - Explains what data is collected via bug reports
   - Details voice transcription (local-only processing)
   - Lists privacy protections for logs

2. **Section 4:** "Data Retention" 
   - Specific to bug report data (30-day deletion after App Store release)

3. **Section 5:** "Your Consent"
   - Explains the opt-in consent flow for bug reporting

4. **Section 6:** "Production Release"
   - Notes that bug reporting may be disabled in App Store version

5. **Section 8:** "Summary Table"
   - Comparison table: CRM Data vs Bug Reports

All other sections mirror the production privacy policy.

---

**Thank you for your assistance with this deployment!**
