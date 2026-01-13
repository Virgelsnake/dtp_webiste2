# PRD: Privacy Policy Hosting for 10 Touches iOS App

**Created:** 2026-01-13  
**Priority:** P0 — Required for App Store Submission  
**Owner:** Web Team  
**Requester:** iOS Engineering

---

## Summary

Host the 10 Touches iOS app's Privacy Policy page at a stable, publicly accessible HTTPS URL on `digitaltechnologypartner.ai`. This URL is required for App Store Connect submission.

---

## Background

Apple requires all apps that collect user data to provide a publicly accessible Privacy Policy URL during App Store submission. The 10 Touches CRM app collects client contact information (names, emails, phone numbers) and personal context data (family details, interests). Although all data is stored locally on-device and never transmitted to servers, a Privacy Policy must still be hosted and linked.

---

## Requirements

### Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1 | Host `privacy-policy.html` at a stable HTTPS URL | P0 |
| FR-2 | URL must be publicly accessible (no authentication) | P0 |
| FR-3 | Page must render correctly on mobile devices | P0 |
| FR-4 | Page must support dark mode via `prefers-color-scheme` | P1 |
| FR-5 | URL should be memorable and permanent | P1 |

### Proposed URL

```
https://digitaltechnologypartner.ai/apps/10-touches/privacy-policy
```

Alternative options:
- `https://digitaltechnologypartner.ai/legal/10-touches/privacy`
- `https://digitaltechnologypartner.ai/privacy/10-touches`

### Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-1 | Page must load within 3 seconds on mobile networks |
| NFR-2 | Page must return HTTP 200 status |
| NFR-3 | SSL certificate must be valid and not expired |
| NFR-4 | URL must remain stable (no redirects that could break) |

---

## Assets Provided

### Source File

The complete HTML file is ready for deployment:

**Location:** `docs/privacy-policy.html` (in the iOS project repository)

**Characteristics:**
- Self-contained single HTML file
- No external dependencies (CSS is inline)
- Responsive design (works on mobile/tablet/desktop)
- Dark mode support via CSS `prefers-color-scheme`
- Professionally styled to match Apple design language

### Content Preview

The page includes:
1. Clear statement that all data is stored locally on-device
2. List of data types the app may store (contacts, personal context, business info)
3. Explicit "Data We Do NOT Collect" section
4. Third-party services statement (none used)
5. User rights and controls
6. Security overview
7. Contact information (privacy@digitaltechnologypartner.ai)
8. Summary table

---

## Acceptance Criteria

- [ ] Privacy Policy page is accessible at the agreed HTTPS URL
- [ ] Page returns HTTP 200 status code
- [ ] Page renders correctly on iPhone Safari
- [ ] Page renders correctly on desktop Chrome/Safari
- [ ] Dark mode displays correctly when system is in dark mode
- [ ] Contact email link works (`mailto:privacy@digitaltechnologypartner.ai`)
- [ ] URL is confirmed and communicated to iOS team

---

## Timeline

| Milestone | Target Date | Notes |
|-----------|-------------|-------|
| URL confirmed | 2026-01-14 | Web team confirms final URL structure |
| Page deployed | 2026-01-15 | HTML file uploaded and live |
| Verification complete | 2026-01-15 | iOS team confirms page loads correctly |
| App Store submission | 2026-01-16 | iOS team adds URL to App Store Connect |

---

## Dependencies

- **Web team** to deploy the HTML file
- **DNS/SSL** must be configured for digitaltechnologypartner.ai
- **iOS team** will add the final URL to App Store Connect

---

## Future Considerations

1. **Support Page:** A similar hosting pattern may be needed for a Support URL
2. **Terms of Service:** May need to add Terms of Service page later
3. **Multiple Apps:** URL structure (`/apps/{app-name}/`) allows for future apps

---

## Contact

**iOS Engineering:** [iOS team contact]  
**Questions about content:** Review `docs/PRIVACY_POLICY.md` for the source Markdown version

---

## Appendix: File Contents

The `privacy-policy.html` file is included in the iOS repository at:
```
10_touches/docs/privacy-policy.html
```

The file is ~160 lines of self-contained HTML with inline CSS. No build step or preprocessing is required — deploy as-is.
