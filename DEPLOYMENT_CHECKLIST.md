# Deployment Checklist

Production launch checklist for `ukhairtransplant.co`.

## 1. Environment variables

- [ ] Set `NEXT_PUBLIC_SITE_URL=https://www.ukhairtransplant.co`
- [ ] Set `NEXT_PUBLIC_SANITY_PROJECT_ID`
- [ ] Set `NEXT_PUBLIC_SANITY_DATASET`
- [ ] Set `NEXT_PUBLIC_SANITY_API_VERSION`
- [ ] Set `RESEND_API_KEY`
- [ ] Set `RESEND_FROM_EMAIL=UK Hair Transplant Co <hello@ukhairtransplant.co>`
- [ ] Set `LEAD_NOTIFICATION_EMAIL=hello@ukhairtransplant.co`
- [ ] Set production GTM / GA4 / Google Ads env vars if used
- [ ] Set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TT92LPF3B8` for GA4 if not using the code default
- [ ] Set `NEXT_PUBLIC_CLARITY_PROJECT_ID=wxlwrp223r` for Microsoft Clarity if not using the code default

## 2. Domain, redirects, and DNS

- [ ] Point production hosting to the live domain
- [ ] Force `http` to `https`
- [ ] Force non-canonical host to canonical host
- [ ] Confirm canonical host is `https://www.ukhairtransplant.co`
- [ ] Keep MX records pointed to SiteGround for incoming mail
- [ ] Keep Resend SPF / DKIM records active for sending mail

## 3. Crawlability and indexing

- [x] `sitemap.xml` exists
- [x] `robots.txt` exists
- [x] `llms.txt` exists
- [x] Thank-you page is set to `noindex`
- [x] `/studio` is disallowed in `robots.txt`
- [ ] Protect `/studio` with access control if it should not be publicly usable
- [ ] Confirm staging / preview / temporary domains are blocked from indexing
- [ ] Verify `sitemap.xml` loads on production
- [ ] Verify `robots.txt` loads on production
- [ ] Verify `llms.txt` loads on production
- [ ] Verify the IndexNow key loads at `https://www.ukhairtransplant.co/81041f6f0c26422b91067fc9b7393a84.txt`
- [ ] Run `npm run indexnow -- --dry-run`, then `npm run indexnow` after deployment

## 4. Metadata and sharing assets

- [ ] Confirm final `title` and `description` render correctly on key pages
- [ ] Confirm canonical URLs are correct on:
  - [ ] home
  - [ ] topic pages
  - [ ] service pages
  - [ ] blog pages
- [ ] Confirm Open Graph image renders correctly
- [ ] Confirm favicon and logo are the final brand versions

## 5. Search and webmaster setup

- [ ] Add the site to Google Search Console
- [ ] Submit `https://www.ukhairtransplant.co/sitemap.xml` in Search Console
- [ ] Add the site to Bing Webmaster Tools
- [ ] Submit the sitemap in Bing Webmaster Tools

## 6. Forms and lead handling

- [ ] Test `/assessment` end to end in production
- [ ] Confirm successful submissions reach `hello@ukhairtransplant.co`
- [ ] Confirm thank-you redirect works
- [ ] Confirm WhatsApp and phone links work on mobile
- [ ] Confirm attribution fields are captured in form submissions
- [ ] Rotate any exposed API keys before launch

## 7. Analytics and ads

- [ ] Confirm GTM loads only in production as intended
- [ ] Confirm GA4 page views fire correctly
- [ ] Confirm consultation submit event fires only on successful submit
- [ ] Confirm WhatsApp click event fires
- [ ] Confirm phone click event fires
- [ ] Confirm Google Ads conversions are mapped correctly

## 8. Content and trust

- [ ] Finalize any placeholder proof assets or copy before launch
- [ ] Finalize any placeholder testimonials before launch
- [ ] Review pricing references for accuracy
- [ ] Review clinic-selection and standards wording for final compliance
- [ ] Confirm company details on the About page match Companies House
- [ ] Confirm privacy, terms, and cookies pages are linked and final

## 9. Technical QA

- [ ] Run `npm run lint`
- [ ] Run `npm run build`
- [ ] Check desktop navigation and mega menus on production
- [ ] Check iPhone-width layouts and sticky CTA behavior
- [ ] Check that no page can be horizontally dragged due to overflow
- [ ] Check image loading and cropping on heroes, treatment cards, blog cards, and proof sliders

## 10. Post-launch monitoring

- [ ] Watch Search Console indexing and crawl reports
- [ ] Watch form delivery for the first live leads
- [ ] Watch GTM / GA4 / Ads event quality
- [ ] Watch server logs / deployment logs for runtime errors
- [ ] Review early search-query and landing-page performance after launch
