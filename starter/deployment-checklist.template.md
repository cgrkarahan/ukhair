# Deployment Checklist Template

Generic launch checklist for new projects created from this starter.

## 1. Environment variables

- [ ] Set `NEXT_PUBLIC_SITE_URL`
- [ ] Set public contact env vars if the project still uses them
- [ ] Set `NEXT_PUBLIC_SANITY_PROJECT_ID` if using Sanity
- [ ] Set `NEXT_PUBLIC_SANITY_DATASET` if using Sanity
- [ ] Set `NEXT_PUBLIC_SANITY_API_VERSION` if using Sanity
- [ ] Set `RESEND_API_KEY` if using the lead form
- [ ] Set `RESEND_FROM_EMAIL`
- [ ] Set `LEAD_NOTIFICATION_EMAIL`
- [ ] Set `NEXT_PUBLIC_GTM_ID` if analytics will run through GTM

## 2. Domain, redirects, and DNS

- [ ] Point production hosting to the live domain
- [ ] Force `http` to `https`
- [ ] Force non-canonical host to canonical host
- [ ] Confirm the canonical host is correct
- [ ] Keep mailbox `MX` records pointed to the chosen email provider
- [ ] Keep sending-domain SPF / DKIM records active if using Resend

## 3. Crawlability and indexing

- [ ] Confirm `sitemap.xml` loads on production
- [ ] Confirm `robots.txt` loads on production
- [ ] Confirm `llms.txt` loads on production
- [ ] Confirm thank-you or post-submit pages are `noindex`
- [ ] Confirm non-public admin or CMS routes are blocked from indexing
- [ ] Confirm preview or staging domains are blocked from indexing

## 4. Metadata and sharing assets

- [ ] Confirm final `title` and `description` render correctly on key pages
- [ ] Confirm canonical URLs are correct across home, service, guide, and blog pages
- [ ] Confirm Open Graph image renders correctly
- [ ] Confirm favicon and logo are the final brand versions

## 5. Search and webmaster setup

- [ ] Add the site to Google Search Console
- [ ] Submit the production sitemap in Search Console
- [ ] Add the site to Bing Webmaster Tools
- [ ] Submit the sitemap in Bing Webmaster Tools

## 6. Forms and lead handling

- [ ] Test the main enquiry or consultation form end to end in production
- [ ] Confirm successful submissions reach the destination inbox
- [ ] Confirm the thank-you redirect works
- [ ] Confirm WhatsApp and phone links work on mobile
- [ ] Confirm attribution fields are captured if they are part of the funnel
- [ ] Rotate any exposed API keys before launch

## 7. Analytics and ads

- [ ] Confirm GTM loads if used
- [ ] Confirm analytics events fire only after consent if required
- [ ] Confirm primary lead conversions fire only on successful submit
- [ ] Confirm WhatsApp and phone click events fire if tracked
- [ ] Confirm ad-platform conversions are mapped correctly if ads are active

## 8. Content and trust

- [ ] Replace placeholder proof assets
- [ ] Replace placeholder reviews or testimonials
- [ ] Review pricing references for accuracy
- [ ] Review standards and compliance wording
- [ ] Confirm company details match the legal entity
- [ ] Confirm privacy, terms, and cookies pages are final and linked

## 9. Technical QA

- [ ] Run `npm run lint`
- [ ] Run `npm run build`
- [ ] Check desktop navigation and header behavior
- [ ] Check iPhone-width layouts and sticky CTA behavior
- [ ] Check that no page can be horizontally dragged due to overflow
- [ ] Check image loading and cropping on heroes, cards, and proof sections

## 10. Post-launch monitoring

- [ ] Watch indexing and crawl reports
- [ ] Watch form delivery for the first live leads
- [ ] Watch analytics event quality
- [ ] Watch deployment logs for runtime errors
- [ ] Review early landing-page and search performance
