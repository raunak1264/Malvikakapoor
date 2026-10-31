# SEO audit and strategy: malvikakapoorarts.com

*Prepared 31 October 2026. This folder (`docs/`) is excluded from the live site through `.assetsignore`.*

**Legend:** 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Nice to have · ✅ fixed in this change · 👤 needs you

---

## 0. Summary

| | |
|---|---|
| **Score before this change** | **38 / 100** |
| **Expected score once this change is live** | ~62 / 100. The rest depends on artwork pages, backlinks and press. |
| **The exhibition** | Jehangir Art Gallery's calendar lists *LAYERS – MALVIKA KAPOOR*, Exhibition Gallery 3, **27 Oct – 2 Nov 2026** ([event page](https://jehangirartgallery.com/event/view/layers-malvika-kapoor)). On 31 Oct the site didn't mention it anywhere. |
| **The biggest opportunity** | Branded search. A search for *"Malvika Kapoor" paintings* returns other artists (Malvika Raj, Malavika Venugopal and others). Nobody owns the name yet, so the site can win it quickly. |
| **Catalogue received** | The *Layers by Malvika Kapoor* catalogue (12 pages) confirms a **solo show of 11 works**. Each painting now has its own page using the catalogue's title, size, medium and image, and the artist statement is on the exhibition page and homepage. See §19 for the details in it that disagree with the site. |
| **The biggest risk** | The show closes in 2 days. A new page rarely ranks that fast. So the exhibition page also works as a **permanent** page that keeps collecting searches for "Malvika Kapoor Jehangir" and "Layers" after the show. |

### How the score breaks down

| Area | Weight | Before | After this change |
|---|---|---|---|
| Crawlability and indexing (HTTPS, robots, sitemap, canonical tags) | 15 | 11 | 14 |
| On-page (titles, descriptions, headings, keyword targeting) | 15 | 6 | 12 |
| Content depth (exhibition, artworks, biography) | 15 | 5 | 9 |
| Image SEO (file names, alt text, captions, image sitemap) | 10 | 2 | 8 |
| Structured data | 10 | 4 | 8 |
| Performance and Core Web Vitals | 10 | 3 | 7 |
| Conversion (enquiry path, WhatsApp, buyer information) | 10 | 2 | 7 |
| Authority (backlinks, citations, press) | 10 | 2 | 2 |
| Local signals (Google Business Profile, NAP, maps) | 5 | 3 | 4 |
| **Total** | **100** | **38** | **~71 in theory, ~62 in practice** until Google re-crawls and authority builds |

---

## 1. What I found, page by page

| # | Page | What I found |
|---|---|---|
| 1 | **Homepage `/`** | The H1 "Malvika Kapoor" is good. The title was 98 characters and stuffed with "Lucknow / Classes / Workshops". The description was 230+ characters. A `meta keywords` tag was present (Google ignores it). There was no call to view or buy paintings, and **no mention of the 2026 show**. The stat "2 Solo Shows — Jehangir" was out of date. The `Person` schema had no `image` and no `@id`. The hero section is commented out, so the first thing on the page is the About section. |
| 2 | **About / biography** | It lives on the homepage, which is fine for a solo-artist site. Exhibitions, awards and experience are clear lists, but there's **no artist statement** and nothing about her style or themes. That's thin for "Malvika Kapoor artist" searches. 👤 The three testimonials (Priya Sharma, Rahul Kumar, Ananya Nair) read like placeholders. If they aren't real, remove them. |
| 3 | **Gallery `/gallery`** | 27 paintings in one grid. Titles and details only appeared on hover, so phone visitors saw neither. No price, availability or enquiry option. The only button was "View More on Instagram", which sends buyers away. Alt texts were like "Creative Colours painting" and never named the artist. File names were CamelCase in a folder with a space in its name (`My Artworks/`). |
| 4 | **Individual painting pages** | **There weren't any.** No painting can rank on its own, appear properly in Google Images, or be shared with a collector as a link. |
| 5 | **Exhibition pages** | **There weren't any.** Exhibitions appear only as list items on the homepage. |
| 6 | **Contact `/contact`** | The H1 "Start Your Creative Journey" was aimed at students, not buyers. The full address (2/18 Vikas Nagar, Lucknow) was in the text but missing from the schema. The form posts to Google Sheets and works. |
| 7 | **Blog / news / press** | There is no blog or press page. The Workshops page has an "Updates" feed, but it loads with JavaScript from Google Sheets, so search engines don't see it as content. |
| 8 | **Titles and descriptions** | Every page ended in "\| Malvika Kapoor Art Gallery & Classes" and was aimed at Lucknow classes. ✅ Rewritten (see §6). |
| 9 | **URL structure** | Clean URLs (`/gallery`) are good. But **every internal link pointed to `gallery.html` and similar**, and Cloudflare answers those with a **307 (temporary) redirect**. ✅ Fixed: all links now use clean URLs. |
| 10 | **Headings** | One H1 per page ✅. Footers used H3/H4 for layout, which is minor. The gallery had no H2s; it now has an H2 for each painting ✅. |
| 11 | **Image file names and alt text** | Names like `WhatsApp Image 2026-06-26 at 10.28.25 PM.jpeg` and `IMG20251214135825.jpg`, and folders with spaces, `&` and `é`. **207 generic alt texts** ("Wall Murals 7", "Customized Work3"). ✅ The 27 artwork images are renamed and re-described. 🟡 Class and workshop images are still to do. |
| 12 | **Internal linking** | Just the navigation and footer. Nothing pointed from the biography to the paintings, or from the paintings to contact. ✅ New links: banner → exhibition, homepage → gallery, gallery → exhibition, exhibition → gallery and biography, shop → gallery, plus "Exhibition" in the navigation. |
| 13 | **Structured data** | Homepage `Person`. An `ArtGallery` block copied onto 5 pages, without a street address. No `Event`, `BreadcrumbList` or artwork markup. |
| 14 | **Canonical tags** | Present and correct on every page ✅. |
| 15 | **Indexing and crawling** | `robots.txt` allows everything and links the sitemap ✅. The sitemap listed 6 URLs with stale `lastmod` dates and no images. **`www.malvikakapoorarts.com` doesn't resolve** 👤. A missing page returned a **404 with an empty body**. |
| 16 | **Mobile** | The viewport and responsive layout are fine ✅. Artwork titles were hidden on phones (hover only) ✅ fixed. |
| 17 | **Page speed** | Classes was **19.1 MB** across 93 `<img>` tags with only 1 lazy-loaded, Workshops 17.3 MB, Shop 16.4 MB. 19 files were over 1 MB, the largest 10 MB. Images were served with `cache-control: max-age=0`. A Google Apps Script request loaded on **every** page and threw errors on 5 of them. Four Google Font families load on every page. |
| 18 | **Duplicate or thin content** | `ArtGallery` schema is copied across pages. The Classes and Workshops descriptions overlap and disagree ("40+" vs "50+" classes, 👤 confirm which). The gallery cards were thin, with only "Original Painting" for 12 works. |
| 19 | **Keyword targeting** | Only "Lucknow art classes". Nothing targeted buyers, the exhibition or "paintings for sale". |
| 20 | **Local SEO** | The Lucknow address and phone are on the site. No map embed. 👤 It isn't known whether a Google Business Profile exists. There's nothing for Mumbai. |
| 21 | **Google Business Profile** | See §14. |
| 22 | **Social, PR and backlinks** | Instagram and Facebook are linked. Jehangir's event page for the show **doesn't link to the site**. No press coverage found. Essentially no backlinks. |

---

## 2. Top 10 problems

1. 🔴 The current Jehangir exhibition was invisible on the site. ✅
2. 🔴 No way to enquire about or buy a painting from the gallery. ✅
3. 🔴 No individual artwork pages. ✅ 11 Layers pages built from the catalogue, plus a template for the rest
4. 🔴 The whole site was positioned as a Lucknow classes business rather than a working artist selling original work. ✅
5. 🟠 Every internal link went through a 307 redirect. ✅
6. 🟠 15–19 MB pages with almost no lazy loading. ✅ Lazy loading added and the heaviest images recompressed; 🟡 a further pass on class and workshop images is still useful
7. 🟠 Image SEO: camera and WhatsApp file names, generic alt text. ✅ artworks · 🟡 everything else
8. 🟠 Schema gaps: no Event, no breadcrumbs, `Person` without image or `@id`, business without street address. ✅
9. 🟠 No backlinks or press, and Jehangir's listing doesn't link to the site. 👤
10. 🟡 `www` doesn't resolve, 404s were blank, images weren't cached, the sitemap was stale. ✅ partly · 👤 DNS

## 3. Top 10 highest-impact improvements

| # | Improvement | Impact | Status |
|---|---|---|---|
| 1 | Exhibition landing page with Event schema, FAQ, WhatsApp and directions | Very high | ✅ |
| 2 | "Enquire about this painting" on every artwork (card and lightbox) | Very high | ✅ |
| 3 | Rewrite titles and descriptions for artist, buyer and exhibition searches | High | ✅ |
| 4 | Get Jehangir, Mumbai listings and press to link to the exhibition page | High | 👤 |
| 5 | Individual artwork pages (start with the "Layers" works) | High | ✅ 11 Layers pages · 👤 details for the 27 earlier works |
| 6 | Submit the new URLs and sitemap in Search Console | High | 👤 |
| 7 | SEO image file names, alt text and an image sitemap | Medium–High | ✅ artworks |
| 8 | Lazy-load images, recompress, cache images for 30 days | Medium | ✅ |
| 9 | Artist statement and an expanded biography (400–600 words) | Medium | 👤 |
| 10 | Google Business Profile for the Lucknow studio, plus an Event post about the show | Medium | 👤 |

---

## 4. What changed in this commit

| Area | Change | Files |
|---|---|---|
| Exhibition | New page `/exhibitions/layers-jehangir-art-gallery-2026`: about 760 words, dates, venue, map link, how to buy, 6 FAQs, ExhibitionEvent + BreadcrumbList + FAQPage schema. A "Now showing" badge switches to "Exhibition closed · paintings still available" automatically after 2 Nov, 7 pm IST. | `exhibitions/layers-jehangir-art-gallery-2026.html`, `js/main.js`, `css/styles.css` |
| Homepage | "Now showing" banner that switches after the show, a 2026 entry in the exhibitions list, "View original paintings" and "Enquire on WhatsApp" buttons, new title and description, `Person` with `@id`, `image`, `knowsAbout` and `award`, street address in the schema, the portrait no longer lazy-loaded (it's the largest image on screen), `meta keywords` removed. | `index.html` |
| Gallery | Visible title and details under every painting, an "Enquire about this painting" WhatsApp link with the painting's name filled in, the same link inside the lightbox, an H2 for each painting, intro copy linking to the exhibition, a WhatsApp button before Instagram, `CollectionPage` with 27 `VisualArtwork` parts, breadcrumbs. | `gallery.html`, `js/main.js` |
| Artwork images | `images/My Artworks/CamelCase.jpg` → `images/artworks/malvika-kapoor-<title>-painting.jpg` plus WebP copies, served with `<picture>`. Descriptive alt text. | `images/artworks/*` |
| Titles and descriptions | All 7 pages rewritten (§6). | all `.html` |
| Navigation and links | "Exhibition" added to the navigation. Footer links to the exhibition. Every `x.html` link → `/x`. Active-page highlighting works with clean URLs. | all `.html`, `js/main.js` |
| Contact and shop | H1 "Contact Malvika Kapoor", buyer-focused intro, `streetAddress`, `hasMap`, `founder` and `@id` in the schema. Shop H1 "Original Paintings & Custom Orders" with a link to the gallery. | `contact.html`, `shop.html` |
| Performance | `loading="lazy"` on 247 images. 58 heavy images resized to 1200 px. Unused images over 1 MB compressed (images folder 155 MB → 88 MB). The Apps Script feed now loads only on Workshops. | `shop/classes/workshops.html`, `images/**`, `js/main.js` |
| Layers works (from the catalogue) | **11 artwork pages** at `/artworks/<slug>`: Growth, Bloom 1, Bloom 2, Path, Tehzeeb 1, Tehzeeb 2, Drape, Prevail, Habitat, The Greens, Resolve 1. Each has the catalogue's size and medium, a visual description, "Price: On request", WhatsApp enquiry, related works, and VisualArtwork + ImageObject + BreadcrumbList schema. Images were taken from the PDF, captions cropped off, Path rotated upright, saved as `malvika-kapoor-<title>-painting.jpg/.webp`. The exhibition page gains the 11 works (`#works`), the catalogue statement (nature, pattern, chikankari, sustainability), collections, a new studio photo and `workFeatured` in the Event schema. The gallery gains a "Layers" group above "Earlier paintings". The homepage gains a "3 solo shows" stat, "Solo Show, Layers" and a short artist statement. | `artworks/*.html`, `images/artworks/*`, `images/exhibitions/*`, `exhibitions/…`, `gallery.html`, `index.html` |
| Technical | `sitemap.xml` with image entries and current `lastmod` dates. `_headers` (images cached 30 days, CSS and JS 1 day). `404.html`. `.assetsignore` now covers `docs`, `.DS_Store` and `.claude`. | root |

---

## 5. Keyword research

> **About the demand figures.** I didn't have a keyword tool (Keyword Planner, Ahrefs or Semrush) in this session, so the demand labels below are **directional estimates** based on how the search results look and on typical Indian art-buying searches. Check them in Google Keyword Planner (free with a Google Ads account, region India / Mumbai) and in Search Console after 4 weeks.
>
> **Spelling:** the gallery's official name is **Jehangir**. Many people type **Jahangir**, and Jehangir's own site header uses that spelling. Use "Jehangir" in titles and headings, and work "Jahangir" in naturally once in body text or FAQs. Google mostly treats them as the same, but exact matches help on the long tail.

### Branded

| Keyword | Intent | Priority | Page | Action |
|---|---|---|---|---|
| malvika kapoor | Navigational | 🔴 | `/` | ✅ Title starts with the name. Add `sameAs` links as profiles grow (Artzolo, Saatchi, LinkedIn). |
| malvika kapoor artist | Navigational | 🔴 | `/` | ✅ |
| malvika kapoor paintings | Commercial | 🔴 | `/gallery` | ✅ Title and H1 |
| malvika kapoor painter | Navigational | 🟠 | `/` | Use "painter" once in the biography copy |
| malvika kapoor art | Navigational | 🟠 | `/` | Already in the site and brand name |
| malvika kapoor artworks for sale | Transactional | 🟠 | `/gallery` | ✅ "for sale" in the title |
| malvika kapoor lucknow | Navigational | 🟡 | `/contact`, `/classes` | ✅ |

### Exhibition

| Keyword | Intent | Priority | Page | Action |
|---|---|---|---|---|
| malvika kapoor jehangir art gallery | Navigational | 🔴 | exhibition page | ✅ H1 and title |
| malvika kapoor exhibition | Navigational | 🔴 | exhibition page | ✅ |
| layers malvika kapoor / layers exhibition jehangir | Navigational | 🔴 | exhibition page | ✅ |
| malvika kapoor mumbai exhibition | Navigational | 🟠 | exhibition page | ✅ |
| jehangir art gallery exhibitions (this week / November 2026) | Informational | 🟠 (high volume, very hard) | exhibition page | You won't outrank jehangirartgallery.com. Get **listed** on the pages that do rank (§15). |
| jahangir art gallery exhibition | Informational | 🟠 | exhibition page | ✅ alternate spelling in the copy |
| solo exhibition jehangir art gallery 2026 | Informational | 🟡 | exhibition page | ✅ |
| jehangir art gallery gallery 3 | Informational | 🟢 | exhibition page | ✅ |

### Local / Mumbai

| Keyword | Intent | Priority | Page | Action |
|---|---|---|---|---|
| art exhibition kala ghoda | Informational | 🟠 | exhibition page | ✅ "Kala Ghoda" in the H2, address and description |
| art exhibitions in mumbai this week | Informational | 🟠 | exhibition page | Get into the weekly roundups (Altbollywood, Mid-Day, Mumbai Live) |
| painting exhibition mumbai november 2026 | Informational | 🟡 | exhibition page | ✅ dates in the copy |
| contemporary art mumbai | Informational | 🟡 | (future) blog | Long term, needs authority |
| art gallery south mumbai | Informational | 🟢 | — | Gallery-owned results; skip |

### Transactional / paintings for sale

| Keyword | Intent | Priority | Page | Action |
|---|---|---|---|---|
| original paintings for sale india | Transactional | 🟠 (hard) | `/gallery` | Marketplaces dominate. Target the long tail below and list on marketplaces with backlinks. |
| original indian artwork for sale | Transactional | 🟠 | `/gallery` | ✅ "Contemporary Indian Art for Sale" in the title |
| contemporary paintings for sale mumbai | Transactional | 🟠 | exhibition page | ✅ "available to buy" plus Mumbai venue |
| paintings for sale in mumbai | Transactional | 🟡 (hard) | exhibition page | Realistic only through listings and press |
| buy original painting from indian artist | Transactional | 🟡 | `/shop` | ✅ |
| mixed media painting on paper for sale | Transactional | 🟠 (low competition) | artwork pages | 👤 Needs artwork pages with medium and size |
| abstract painting for sale india | Transactional | 🟡 | artwork pages, `/shop` | 👤 |

### Informational

| Keyword | Intent | Priority | Page | Action |
|---|---|---|---|---|
| how to buy a painting at jehangir art gallery | Informational | 🟠 | blog post | §12 content plan |
| jehangir art gallery timings / entry fee | Informational | 🟡 | exhibition FAQ | ✅ (Jehangir's own page will rank first, but FAQs can pick up long-tail searches) |
| how to start collecting indian contemporary art | Informational | 🟡 | blog post | §12 |
| what is mixed media painting | Informational | 🟢 | blog post | §12 |

### Long tail: low competition, high intent (the realistic early wins)

- malvika kapoor layers jehangir 2026
- mixed media painting on paper 76 x 56 cm india
- contemporary indian painting nature colour mixed media
- buy painting from jehangir art gallery exhibition
- original paintings by lalit kala akademi artist
- bhu fine arts alumni artist paintings for sale
- painting gift for new home original indian artist *(an artwork-page angle)*
- "<painting title> malvika kapoor", for each work. Each title is close to zero competition once it has its own page.

---

## 5b. Competitor analysis

These are the kinds of pages that rank today for the target searches, judged from the live results in October 2026. Backlink counts are relative estimates; I didn't have a backlink tool.

| Search | Who ranks | Why they win | What this site can realistically do |
|---|---|---|---|
| jehangir art gallery exhibitions | jehangirartgallery.com (event list and each event page), Tripadvisor, MutualArt | Official source, decades of links, one page per show | **Be on those pages.** Jehangir's event page for Layers should link here. The site's own exhibition page wins the *branded* version ("malvika kapoor jehangir"). |
| mumbai art exhibitions this week | Altbollywood weekly roundups, Mid-Day, Homegrown, Mumbai Live, Curly Tales | Fresh, dated weekly posts that name each show and gallery | Get the show **listed** in these roundups (§15). Each listing is also a backlink. |
| paintings for sale in mumbai / original indian paintings for sale | Artzolo, Saatchi Art, StoryLTD, Mojarto, Saffronart | Thousands of product pages, each with price, size, medium, artist and "add to cart". Product schema, heavy internal linking, strong domains | Can't beat them on generic terms. **Copy their page structure** on the artwork pages (done: size, medium, price field, enquiry button) and **list the works on one or two marketplaces** with a link back. |
| contemporary indian artists | Wikipedia lists, Artsy, Saffronart, galleries' artist rosters | Authority and editorial lists | Long term only: press first, then directory and roster listings. |
| individual artist names (comparable mid-career Indian painters) | The artist's own site, Saatchi or Artzolo profile, Instagram, press | Name in the title, H1 and domain, a page per artwork, a biography with a CV, a press page | This is the template to follow. The site now has the name in titles and H1s, artwork pages and a biography with a CV. A press page is still missing. |

**What the top artist and marketplace pages do better (before this change):**

| Factor | Typical top-ranking page | This site (before) | Now |
|---|---|---|---|
| Content depth | 150–400 words per artwork; full CV; exhibition texts | 2–6 words per painting | 70–130 words per Layers work, 1,200-word exhibition page |
| Keywords | Artist name + medium + "for sale" in title and H1 | "Lucknow classes" | ✅ |
| Page structure | One URL per artwork, breadcrumbs, related works | One grid, no URLs | ✅ for Layers |
| Titles and descriptions | Unique, specific, include size and medium | Same suffix on every page | ✅ |
| Backlinks | Galleries, press, marketplaces | ~0 | 👤 §15 |
| Internal linking | Artwork ↔ series ↔ exhibition ↔ artist | Navigation only | ✅ |
| Image SEO | Descriptive file names, alt text, captions, large clean photos | Camera and WhatsApp file names | ✅ artworks |
| Schema | Product/Offer, VisualArtwork, Person | Person only | ✅ (no Product until prices) |
| Local SEO | Gallery addresses, event listings | Lucknow only | ✅ Mumbai venue on the exhibition page |
| Trust signals | CV, collections, press logos, certificates of authenticity | Awards list | ✅ collections added · 👤 press, certificates |
| Conversion | Price, buy button or enquiry form, shipping info | Instagram link | ✅ WhatsApp per painting · 👤 prices, shipping |

**How to compete:** win **branded** searches (name, show, painting titles), win **Google Images** with artwork pages, borrow authority through **listings and marketplaces** that link back, and turn every future show into a permanent page that gains links over time.

---

## 6. Keyword map and on-page recommendations

| Page | Current title (before) | New title ✅ | New description ✅ | H1 | Primary | Secondary |
|---|---|---|---|---|---|---|
| `/` | Malvika Kapoor \| Contemporary Artist & Art Educator \| Lucknow — My Artworks, Classes & Workshops | Malvika Kapoor — Contemporary Indian Artist \| Original Paintings | Malvika Kapoor is a contemporary Indian artist (BFA, MFA, BHU) with solo shows at Jehangir Art Gallery, Mumbai. View and enquire about her original paintings. | Malvika Kapoor | malvika kapoor artist | malvika kapoor painter, indian contemporary artist |
| `/exhibitions/layers-…` | — | Layers – Malvika Kapoor Solo Exhibition \| Jehangir Art Gallery, Mumbai 2026 | Malvika Kapoor's painting exhibition "Layers" at Jehangir Art Gallery (Gallery 3), Kala Ghoda, Mumbai, 27 Oct – 2 Nov 2026. Original paintings for sale — enquire on WhatsApp. | Layers — Malvika Kapoor at Jehangir Art Gallery, Mumbai | malvika kapoor jehangir art gallery | layers exhibition, kala ghoda art exhibition, paintings for sale mumbai |
| `/gallery` | My Artworks \| Malvika Kapoor Art Gallery & Classes | Original Paintings by Malvika Kapoor \| Contemporary Indian Art for Sale | Original mixed media paintings by contemporary Indian artist Malvika Kapoor, exhibited at Jehangir Art Gallery, Mumbai. Enquire about any painting on WhatsApp. | Paintings by Malvika Kapoor | malvika kapoor paintings | original indian paintings for sale, mixed media paintings |
| `/shop` | Shop \| Malvika Kapoor Art Gallery & Classes | Buy Original Paintings & Commission Art \| Malvika Kapoor | Buy original paintings by contemporary Indian artist Malvika Kapoor, or commission portraits, murals and custom art. Enquire on WhatsApp for prices. | Original Paintings & Custom Orders | buy original paintings india | commission painting, custom portrait |
| `/contact` | Contact \| Malvika Kapoor Art Gallery & Classes | Contact Malvika Kapoor \| Painting Enquiries & Classes | Contact artist Malvika Kapoor about buying an original painting, commissions, classes or workshops. WhatsApp +91 94509 06271. Studio in Vikas Nagar, Lucknow. | Contact Malvika Kapoor | contact malvika kapoor | — |
| `/classes` | Classes \| Malvika Kapoor Art Gallery & Classes | Art Classes in Lucknow for All Ages \| Malvika Kapoor | Weekly art classes in Lucknow with artist Malvika Kapoor (BFA, MFA, BHU): painting, folk art, craft, pottery and textile art. All ages and levels welcome. | Our Regular Classes *(🟡 change to "Art Classes in Lucknow")* | art classes lucknow | painting classes lucknow, kids art classes lucknow |
| `/workshops` | Workshops & Classes \| Malvika Kapoor Art Gallery & Classes | Art Workshops in Lucknow \| Malvika Kapoor Art Classes | Art workshops in Lucknow with Malvika Kapoor: Sunday Funday sessions, festival art events and summer camps for kids and adults. Book a slot on WhatsApp. | Workshops & Events *(🟡 change to "Art Workshops in Lucknow")* | art workshops lucknow | summer art camp lucknow |
| `/artworks/<slug>` | — | {Title} by Malvika Kapoor \| Original {Medium} Painting | {Title} ({Year}), an original {medium} painting on {surface} by contemporary Indian artist Malvika Kapoor. {Size}. Available — enquire on WhatsApp. | {Title} | "{title} malvika kapoor" | {medium} painting for sale |

**Still to do on existing pages:**
- 🟠 **Homepage:** add a 150–300 word **artist statement** (👤 in her words: themes, why colour and nature, process), a "Selected paintings" strip of 6 works linking to `/gallery`, and a "Press" block once there's coverage.
- 🟡 **Classes and Workshops:** change their H1s as noted. Fix the 40+ vs 50+ inconsistency. Give the 180+ class and workshop images descriptive alt text ("Children's clay modelling workshop in Lucknow" rather than "clay 7").
- 🟡 **Shop:** rename the two `Abstract Art/WhatsApp Image …jpeg` files and link the Abstract Art card to the matching artwork pages once they exist.

---

## 7. Image SEO

**File names**

| Bad | Better |
|---|---|
| `IMG_4829.jpg` | `malvika-kapoor-nature-in-orange-painting.jpg` |
| `WhatsApp Image 2026-06-26 at 10.28.25 PM.jpeg` | `malvika-kapoor-abstract-mixed-media-painting-red.jpg` |
| `Customized Work/customizedpaintings7.jpeg` | `custom-portrait-painting-lucknow-malvika-kapoor.jpg` |
| `Layers` show photos (to come) | `layers-malvika-kapoor-jehangir-art-gallery-mumbai-2026-installation.jpg` |

Rules: lowercase, hyphens, no spaces, `&` or accents. Artist name plus subject plus medium, and the place only when it's true (a Mumbai photo, a Lucknow class).

**Alt text formula:** `{Title} — {medium} painting on {surface} by Malvika Kapoor, contemporary Indian artist`. For example: *"Canvas of Nature — mixed media painting on paper by Malvika Kapoor, contemporary Indian artist"* ✅. Describe what's in the picture for photos of people: *"Malvika Kapoor with visitors at her exhibition Layers, Jehangir Art Gallery, Mumbai"*.

**Captions:** Google reads visible text near an image. Every painting now has a visible title and details under it ✅. On artwork pages use a full caption: *Title, Year. Medium on surface, W × H cm. © Malvika Kapoor.*

**Artwork descriptions:** 100–200 unique words per painting: inspiration, technique, colours, series. This, more than anything else, is what makes a painting page rank.

**Structured data:** `VisualArtwork` with `ImageObject` (`creator`, `creditText`, `copyrightNotice`) on artwork pages. Google uses the last three for the image licence/credit details in Google Images.

**Image sitemap:** ✅ `sitemap.xml` now lists all 27 artwork images under `/gallery`. Add each new artwork page with its own `<image:image>`.

**Ranking in Google Images, in practice:**
1. One painting per page, with the image near the top and the H1 matching the title ✅ template.
2. At least 1200 px on the long side, with a sharp, flat, colour-true photo of the painting only (no frame or wall). Add a second "in a room" or "at Jehangir" photo for context.
3. A consistent file name, alt text and caption.
4. `<picture>` with WebP and a JPG fallback ✅. Width and height attributes, and lazy loading below the fold.
5. Share the artwork page URL, not the image file, on Instagram, Pinterest and WhatsApp. Pinterest drives a lot of Google Images traffic for art.

---

## 8. Conversion and sales

**The funnel today (before):** Google → homepage (a biography with no call to action) → gallery (hover-only titles) → "View More on Instagram" → leaves the site. **No path to buying.**

**After this change:** Google → exhibition page, gallery or homepage → "Enquire about this painting" (WhatsApp, painting name filled in) or "Enquire on WhatsApp" → conversation. ✅

**Still recommended:**
- 🟠 **Show availability** on every card: "Available", "Sold" or "On show at Jehangir". Sold works build trust; keep them on the site.
- 🟠 **Price or a price band.** Indian collectors increasingly expect it. If listing prices isn't comfortable, use "Price on request" on each artwork page, plus one line on the shop page such as "Original works on paper from ₹X". 👤
- 🟠 **Size, medium and year** for every work. Today 12 of 27 show only "Original Painting". 👤
- 🟡 **Shipping and authenticity block** on artwork pages and the exhibition page: "Ships across India, framed or rolled, insured; certificate of authenticity included". 👤 Only add once it's confirmed.
- 🟡 **Collector enquiry form** (name, phone, painting, message) as a fallback for people who won't use WhatsApp. Reuse the existing Google Sheets contact form script (`js/main.js`, `contactForm`) with a hidden "painting" field.
- 🟢 Track enquiries: add `?utm_source=site&utm_content=<slug>` style text to the WhatsApp message, or simply ask "Where did you find us?", so you know which pages sell.

**Ideal artwork page** (✅ template at `docs/artwork-page-template.html`):
Breadcrumb → large image with caption → status badge → H1 title → 2–3 sentence lede → facts (artist, medium, size, year, price or "on request", exhibited at, delivery) → **Enquire about this painting** (WhatsApp, pre-filled) → "About this work" (100–200 words) → "Buying this painting" → 3 related works → footer. Schema: VisualArtwork, ImageObject and BreadcrumbList, plus Product/Offer **only** once a real price is shown.

---

## 9. Technical SEO checklist

| Item | Status | Recommendation |
|---|---|---|
| XML sitemap | ✅ | Update `lastmod` whenever a page changes. Add every artwork and exhibition page. Submit in Search Console 👤 |
| robots.txt | ✅ OK | No change needed. Don't block `/images/`. |
| Canonical URLs | ✅ OK | Every new page needs its own clean, absolute canonical URL (the template has one). |
| Index / noindex | ✅ | `404.html` is `noindex`. Everything else is indexable. |
| Open Graph | ✅ | Updated on all pages. The exhibition page has its own. Add a real exhibition photo as `og:image` once you have one 👤 |
| Twitter/X cards | ✅ | `summary_large_image` on all pages |
| Schema.org | ✅ | See §10 |
| Breadcrumbs | ✅ | Visible and in the schema on the exhibition page, in the schema on the gallery |
| Image optimisation | ✅ partly | Artworks have WebP copies. 🟡 Convert the class and workshop slideshows to WebP and resize to 1200 px (they're still 13–16 MB if everything is opened) |
| WebP / AVIF | 🟡 | WebP is enough. AVIF is optional |
| Lazy loading | ✅ | Added. The homepage portrait loads eagerly with `fetchpriority="high"` (it's the largest image on screen) |
| Core Web Vitals | 🟠 | Check field data in Search Console → Core Web Vitals after 28 days. Next steps: cut the Google Fonts from 4 families to 2 (Playfair Display and DM Sans) and add `width`/`height` to gallery images |
| Mobile | ✅ | Checked at 375 px: no horizontal scroll, captions visible |
| HTTPS | ✅ | `http` → `https` returns a 301 |
| Redirects | 🟠 👤 | `www.malvikakapoorarts.com` has **no DNS record**. In Cloudflare add a `www` record (proxied) and a 301 Redirect Rule `www` → apex. The `.html` → clean URL redirects are 307 (temporary), set by Cloudflare's asset handling. Internal links no longer use them ✅ |
| 404 page | ✅ 👤 | `404.html` added. For Cloudflare to serve it, set `assets.not_found_handling = "404-page"` in the Worker or Pages project config. That config isn't in this repo, so you'll need to change it in Cloudflare |
| Caching | ✅ | `_headers`: images 30 days, CSS/JS 1 day. After deploying, check with `curl -I https://malvikakapoorarts.com/images/artworks/malvika-kapoor-flight-painting.jpg` |
| Duplicate content | 🟡 | `ArtGallery` schema still appears on Classes, Workshops and Shop. Harmless, but better as one `@id` reference (`#studio`) |
| JavaScript rendering | ✅ | All SEO content is in the HTML. Only the Workshops "Updates" feed needs JS, so don't rely on it for SEO |
| Pagination | — | Not needed until there are 60+ artworks. Then use plain `/gallery?page=2` links or series pages (`/gallery/nature-series`) |
| URL structure | ✅ | `/exhibitions/<show-venue-year>`, `/artworks/<title>`, `/blog/<slug>` (future). Lowercase, hyphenated, no dates in artwork URLs |
| Unused files | 🟢 | 8 `.heic` files in `images/Halloween/` (about 18 MB) aren't used by any page, and browsers can't display HEIC. Delete them or convert them to JPG |

---

## 10. Schema: what to use and why

| Type | Use it? | Where | Why |
|---|---|---|---|
| **Person** | ✅ Yes | `/` (`@id: /#malvika-kapoor`) | Tells Google who the artist is and links her across pages. Builds toward a Knowledge Panel. Extend `sameAs` as profiles appear (Artzolo, Saatchi, Wikipedia/Wikidata if press supports it). |
| **ExhibitionEvent** (subtype of Event) | ✅ Yes | exhibition page | **Google supports Event rich results.** Keep `eventStatus` accurate. Required: name, startDate, location. |
| **BreadcrumbList** | ✅ Yes | exhibition, gallery, artwork pages | Supported. Shows the breadcrumb path in results. |
| **VisualArtwork + ImageObject** | ✅ Yes (no rich result) | artwork pages, gallery `hasPart` | No dedicated rich result, but it clarifies medium and creator and supports image credit details in Google Images. |
| **LocalBusiness / ArtGallery** | ✅ Yes | `/contact` (`@id: /#studio`) | For the real Lucknow studio only. Never for Jehangir/Mumbai. Must match the Google Business Profile exactly. |
| **FAQPage** | ⚪ Optional | exhibition page | Since 2023 Google shows FAQ rich results only for well-known government and health sites. It's included because it's harmless and helps AI answers, but expect no rich result. |
| **Product / Offer** | ⏸ Later | artwork pages | Only with a real, visible price. Never "price on request". |
| **Organization** | ❌ No | — | The artist is the entity. Person plus LocalBusiness already covers it. |
| **Review / AggregateRating** | ❌ Never | — | Self-serving reviews aren't eligible, and the testimonials are unverified. |

### Ready-to-use JSON-LD

**Person** (live on `/`. Add `sameAs` profiles as you create them):
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://malvikakapoorarts.com/#malvika-kapoor",
  "name": "Malvika Kapoor",
  "url": "https://malvikakapoorarts.com/",
  "image": "https://malvikakapoorarts.com/images/AboutMe/Malamasi_opt.jpg",
  "jobTitle": "Contemporary Artist & Art Educator",
  "nationality": { "@type": "Country", "name": "India" },
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "Banaras Hindu University" },
  "memberOf": [{ "@type": "Organization", "name": "Bombay Art Society" }],
  "award": "25th State Lalit Kala Academy Award, Uttar Pradesh (2005)",
  "sameAs": ["https://www.instagram.com/malvika.kapoor.art", "https://www.facebook.com/Malvikaarts"]
}
```

**ExhibitionEvent:** live on the exhibition page. After it closes, leave `eventStatus` as `EventScheduled` (the dates are in the past, so Google stops showing it). Only use `EventCancelled` or `EventPostponed` if that actually happens.

**VisualArtwork, ImageObject, BreadcrumbList:** see `docs/artwork-page-template.html`.

**Template for the next exhibition** (copy and change):
```json
{
  "@context": "https://schema.org",
  "@type": "ExhibitionEvent",
  "name": "<Show title> – Malvika Kapoor",
  "startDate": "2027-MM-DDT11:00:00+05:30",
  "endDate": "2027-MM-DDT19:00:00+05:30",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "isAccessibleForFree": true,
  "image": ["https://malvikakapoorarts.com/images/exhibitions/<slug>-installation.jpg"],
  "location": { "@type": "Place", "name": "<Venue>", "address": { "@type": "PostalAddress", "streetAddress": "…", "addressLocality": "…", "postalCode": "…", "addressCountry": "IN" } },
  "performer": { "@id": "https://malvikakapoorarts.com/#malvika-kapoor" },
  "organizer": { "@id": "https://malvikakapoorarts.com/#malvika-kapoor" }
}
```

---

## 11. The exhibition landing page (✅ built)

- **URL:** `/exhibitions/layers-jehangir-art-gallery-2026`
- **Title, description, H1:** see §6
- **Headings:** H2 About the exhibition · H2 About the artist · H2 Paintings in Layers · H2 Visit the exhibition → H3 Jehangir Art Gallery, Kala Ghoda · H3 Getting there · H2 Buying a painting · H2 Interested in a painting from Layers? (call-to-action box) · H2 Frequently asked questions → 6 × H3
- **Body:** about 760 words, all from the site, the Jehangir listing, or public venue facts (address, 1952, free entry, 11 am–7 pm)
- **Calls to action:** WhatsApp (pre-filled with "…a painting from Layers at Jehangir Art Gallery"), email, Google Maps directions
- **Image alt:** "Malvika Kapoor, contemporary Indian artist, seated among her colourful paintings"
- **Internal links:** → `/` (biography), `/gallery`, `/contact`. Inbound from the homepage banner, homepage exhibitions list, gallery intro, navigation, footer and 404 page
- **Schema:** ExhibitionEvent, BreadcrumbList, FAQPage
- **The 11 works** are on the page as linked cards (`#works`), taken from the catalogue ✅.
- **After 2 Nov:** the badge switches automatically. Within a week of closing, change the H1 and title to *"Layers: Paintings from Malvika Kapoor's Jehangir Art Gallery Exhibition (2026)"*, add installation photos from Gallery 3, and mark sold works as "Sold" on their artwork pages. The URL stays the same.

**Still marked with `<!-- TODO: provide -->` in the page:** shipping and certificate of authenticity.

---

## 12. Content strategy and calendar (90 days)

| Week | Title | Target keyword | Intent | URL | Words | Links to | Call to action |
|---|---|---|---|---|---|---|---|
| 0 (now) | Layers — Malvika Kapoor at Jehangir Art Gallery ✅ | malvika kapoor jehangir art gallery | Navigational / transactional | `/exhibitions/layers-jehangir-art-gallery-2026` | 760 | `/`, `/gallery` | WhatsApp |
| 1 | Layers turns into a permanent collection page: installation photos, works list, available / sold | layers malvika kapoor paintings | Commercial | same URL | +400 | each artwork page | Enquire |
| 1–2 | First 6–10 artwork pages (the "Layers" works) | "<title> malvika kapoor" | Transactional | `/artworks/<slug>` | 150–250 each | exhibition, gallery, related | Enquire about this painting |
| 2 | Artist statement and expanded biography (on the homepage) | malvika kapoor artist | Navigational | `/` | +400 | gallery, exhibition | View paintings |
| 3 | *Behind "Layers": how the paintings were made* (process, materials, studio photos) | mixed media painting process | Informational | `/blog/behind-layers-mixed-media-process` | 900 | exhibition, 3 artworks | Enquire |
| 4 | Remaining gallery works as artwork pages (those with full details) | "<title> painting" | Transactional | `/artworks/<slug>` | 150–250 each | gallery | Enquire |
| 5 | *How to buy a painting at Jehangir Art Gallery (a collector's guide)* | how to buy painting jehangir art gallery | Informational | `/blog/how-to-buy-painting-jehangir-art-gallery` | 1,000 | exhibition, gallery, contact | WhatsApp |
| 6 | Press page: every mention, interview and listing, with links | malvika kapoor press | Navigational | `/press` | 300+ | exhibition, `/` | Contact |
| 7 | *A visitor's guide to Kala Ghoda's art galleries* (Jehangir, NGMA, CSMVS) | kala ghoda art galleries guide | Informational | `/blog/kala-ghoda-art-galleries-guide` | 1,200 | exhibition | View Layers |
| 8 | Past exhibitions archive: 2012 and 2018 Jehangir shows, Prince of Wales Museum 2014, AIFACS 2006 | malvika kapoor exhibitions | Navigational | `/exhibitions` (index) + one page per show | 200–400 each | each other, `/` | View paintings |
| 9 | *Starting an art collection: original Indian paintings under ₹50,000* (👤 only if prices fit) | affordable original indian paintings | Commercial | `/blog/start-collecting-original-indian-paintings` | 1,200 | 4–6 artworks | Enquire |
| 10 | *Colour and nature: a series* (a themed page grouping the Nature in Red/Blue/Green/Orange/Pink works) | nature paintings mixed media india | Commercial | `/gallery/nature-series` | 500 | each artwork | Enquire |
| 11 | *What is mixed media painting?* (a teaching angle that also connects to the classes) | what is mixed media painting | Informational | `/blog/what-is-mixed-media-painting` | 1,000 | artworks, `/classes` | Join a class / Buy |
| 12 | Quarter review: refresh titles from Search Console data, add new works, plan the next show | — | — | — | — | — | — |

**Ongoing:** one Instagram post per artwork page that links to the page, not the profile. A Google Business Profile post every 2 weeks.

---

## 13. 30 / 60 / 90-day plan

### This week (immediate)
1. 👤 **Approve and deploy this change** (commit and push).
2. 👤 **Search Console:** verify the domain property (DNS TXT record in Cloudflare). Submit `sitemap.xml`. Use URL Inspection → *Request indexing* on the exhibition page, `/` and `/gallery`.
3. 👤 **Ask Jehangir's office** to add the website link to the *Layers* event page, and to the artist profile in their "Artist Finder".
4. 👤 **Share the exhibition URL** (not just Instagram posts): Instagram bio link, a story with a link sticker, WhatsApp status and broadcast, the Facebook page, LinkedIn.
5. 👤 **Pitch the last-days angle** today to Mumbai listings (Altbollywood's weekly "Mumbai art exhibitions open" roundup, Mumbai Live, Mid-Day "things to do"). Even a listing after the show adds a lasting mention and link.
6. 👤 **Cloudflare:** add the `www` DNS record plus a 301 to the apex, and set 404 handling to "404-page".
7. 👤 Photograph every painting in Layers (flat, in good light, ≥ 2000 px) **before any are sold or taken down**, plus installation shots of Gallery 3.

### 30 days
- Turn the exhibition page into the permanent "Layers" collection page (photos, works, available / sold).
- Publish 6–10 artwork pages (Layers first). Add them to the sitemap.
- Artist statement and expanded biography.
- Create a Google Business Profile for the Lucknow studio (§14) and post the exhibition as an Event update.
- Profiles that link back: Artzolo or Mojarto, Saatchi Art, Bombay Art Society member listing.
- **Measure:** Search Console impressions for "malvika kapoor" queries, and whether the exhibition and gallery pages are indexed.

### 60 days
- Remaining artwork pages with full details. Blog posts from weeks 3 and 5. Press page.
- Outreach to Lucknow press (TOI and HT Lucknow city pages) with the angle "Lucknow artist's solo show at Jehangir".
- Image pass on Classes and Workshops (WebP, 1200 px, descriptive alt text and file names).
- Reduce Google Fonts to 2 families.
- **Measure:** branded clicks, Google Images impressions, WhatsApp enquiries per page.

### 90 days
- Past exhibitions archive, series pages, collector guide.
- Interviews and podcasts (§15) and BHU alumni features.
- Review the Search Console queries and rewrite the titles of pages with high impressions and low CTR.
- Plan the next exhibition page **4–6 weeks before** opening, so it's indexed in time.

---

## 14. Local SEO strategy (Mumbai and Lucknow)

**The honest constraint:** Google Business Profile guidelines don't allow a profile for a temporary location, and the Jehangir Art Gallery profile belongs to the gallery. **Don't create a "Malvika Kapoor – Mumbai" profile.** It breaks the guidelines and risks suspension.

**What works instead:**
- **Lucknow profile** (the real studio, 2/18 Vikas Nagar): category *Art studio* (or *Art school*, depending on which brings more enquiries; add the other as a secondary category). Use the same name, address and phone as the site and schema. Add photos of paintings, the studio and classes. Add **Products** (a few paintings with "price on request"). Post an **Event** "Layers at Jehangir Art Gallery, Mumbai, 27 Oct – 2 Nov" linking to the exhibition page. Ask real students and collectors for reviews.
- **Mumbai, without a profile:**
  - The exhibition page with `ExhibitionEvent` schema and the Jehangir address, so it can appear in Google's event results.
  - **Citations and listings** (§15): Jehangir event page and Artist Finder, Altbollywood weekly roundups, Mumbai Live, Mid-Day "what's on", Insider.in / District / AllEvents (free event listings), Kala Ghoda Association events.
  - **Google Maps:** you can't add the show to Jehangir's profile, but you **can** upload exhibition photos and a short review to Jehangir's Google Maps listing from your own Google account. Photos there are seen by people searching for the gallery.
  - **Local keywords** in copy: Kala Ghoda, Fort, South Mumbai, M.G. Road, near CSMVS / Prince of Wales Museum ✅.
- **Location pages:** don't create "artist in Mumbai" pages. Each exhibition page *is* the location page for its venue and city.

---

## 15. Backlink and PR strategy

Scoring: **Impact** (authority and relevance of the link) · **Difficulty** · **Relevance**. ★ = act first.

| Opportunity | Type | Impact | Difficulty | Relevance | Notes |
|---|---|---|---|---|---|
| ★ Jehangir Art Gallery: event page + Artist Finder profile link | Exhibition site | High | Low | Very high | Ask the office. You're already an exhibitor. |
| ★ Altbollywood "Mumbai art exhibitions open" weekly roundups | Mumbai listings blog | Medium | Low | High | Send the show details and the URL. |
| ★ Bombay Art Society: member page / directory | Art body | Medium–High | Low | High | You're a member, so ask for a profile link. |
| ★ Lalit Kala Akademi (UP / Lucknow) artist listings, camp reports | Cultural org | High | Medium | High | Government `.gov.in` / `.nic.in` links carry strong trust. |
| ★ BHU Faculty of Visual Arts: alumni news or notable alumni | University | High | Medium | High | `.ac.in` link. Pitch "alumna's 3rd Jehangir solo". |
| Mid-Day / Hindustan Times Mumbai / Free Press Journal: city listings, weekend picks | Mumbai press | High | Medium–High | High | Short pitch with 2 photos and dates. Best 1–2 weeks before a show. |
| Mumbai Live, Homegrown, Curly Tales, LBB (Little Black Book) | Mumbai culture sites | Medium | Medium | High | Feature angle: "Lucknow educator who has trained 5,000+ students". |
| Times of India Lucknow, HT Lucknow, Amar Ujala / Dainik Jagran (Hindi) | Lucknow press | Medium–High | Medium | High | The hometown angle is the easiest press win. |
| Artzolo, Mojarto, Saatchi Art, Singulart | Marketplaces | Medium | Low | High | Profile with a link to the site. Also a sales channel. |
| Insider.in / District / AllEvents / Townscript | Event listings | Low–Medium | Low | High | Free listings for each future show. |
| AIFACS (New Delhi): exhibitor archives | Art body | Medium | Medium | High | Past 78th All India Art Exhibition participant. |
| IIT Kanpur Antaragni: judges page | University fest | Medium | Low | Medium | You were an honorary judge in 2024. |
| Art podcasts and YouTube (e.g. Indian art interview channels) | Interviews | Medium | Medium | Medium | A 20-minute talk on teaching vs practice. |
| Art blogs: Abirpothi, Art Fervour, Kalakriti/Artisera blogs | Indian art portals | Medium | Medium | High | Exhibition review or artist profile. |
| Press release (PRLog, a free tier) | Press release | Low | Low | Medium | Only for the record. Don't expect ranking value. |
| Wikipedia | Encyclopedia | Very high | Very high | High | **Not yet.** Needs several independent press articles first. Don't self-write it. |

**Pitch template (email or WhatsApp to editors):**
> *Subject:* Lucknow artist Malvika Kapoor's solo show "Layers" at Jehangir Art Gallery (Gallery 3), 27 Oct – 2 Nov
> Two lines on who she is (BHU MFA, Lalit Kala award 2005, 3rd Jehangir solo), the dates and venue, 3 photos, and the link to the exhibition page.

---

## 16. Google Search Console plan

**Set up:** a domain property (DNS), submit the sitemap, and link it to Google Analytics 4 if you use it.

**Queries to watch** (Performance → Search results → filter by query):
- Branded: `malvika kapoor`, `malvika kapoor artist`, `malvika kapoor paintings`, `malvika kapoor jehangir`, `layers malvika kapoor`
- Exhibition: anything containing `jehangir`, `jahangir`, `kala ghoda`, `layers`
- Commercial: anything containing `for sale`, `buy`, `original painting`, `mixed media`
- Local: `art classes lucknow` and similar (the existing business, so make sure it doesn't drop)

**Pages to watch:** `/exhibitions/layers-jehangir-art-gallery-2026`, `/`, `/gallery`, each `/artworks/*`, `/contact`.

**Branded vs non-branded:** in Performance, add a query filter → *Custom (regex)* → `malvika|kapoor` (branded) and the same filter with "Doesn't match regex" (non-branded). Compare the two weekly.

**What tells you it's working:**

| Timeframe | Signal | Healthy target |
|---|---|---|
| 1–2 weeks | Exhibition page **indexed** (URL Inspection) and showing impressions | Indexed within 7 days |
| 2–4 weeks | Branded queries ranking #1 for the site | "malvika kapoor" in position 1–3 |
| 4–8 weeks | Google Images impressions (Search type: Image) for artwork pages | Steady growth week on week |
| 4–12 weeks | Non-branded impressions on long-tail queries (titles, mixed media, Jehangir) | Any non-zero is progress; aim for 20%+ of impressions |
| Ongoing | **WhatsApp enquiries that mention a painting title**, the real measure of success | Count them weekly |

**CTR opportunities:** in Performance, sort by impressions. Any page with **more than 100 impressions and under 2% CTR** needs a better title and description. For example, if "jehangir art gallery exhibitions" brings impressions to the exhibition page, put "Now on" and the dates at the start of the title.

**Indexing issues to watch:** Pages → "Crawled – currently not indexed" (thin pages, so add content), "Duplicate without user-selected canonical" (check the `.html` URLs don't get indexed), "Page with redirect" (expected for `.html` → clean URLs).

**Image performance:** Performance → Search type: Image. Expect artwork file names and pages to start appearing 4–8 weeks after the artwork pages go live.

---

## 17. Priorities at a glance

| Priority | Item | Owner |
|---|---|---|
| **High** | Deploy this change · Search Console + request indexing · Jehangir link request · share the exhibition URL · photograph the Layers works | 👤 |
| **High** | Layers collection page update · first artwork pages · artist statement | 👤 data → build |
| **High** | `www` DNS + 301 · 404 handling in Cloudflare | 👤 |
| **Medium** | Google Business Profile (Lucknow) · marketplace profiles · Lucknow and Mumbai press pitches | 👤 |
| **Medium** | Class and workshop image pass · fonts down to 2 · remaining artwork pages · blog posts 1–2 | build |
| **Medium** | Price / availability / shipping info on artwork pages | 👤 |
| **Low** | Exhibitions archive · series pages · collector guide · podcasts | later |
| **Low** | AVIF · deleting unused HEIC files · consolidating `ArtGallery` schema | build |

---

## 18. Recommended site structure

```
/                                   Artist home: biography, statement, selected works, current show
/gallery                            All paintings (cards → artwork pages)
/gallery/<series>                   Optional series pages (e.g. nature-series)
/artworks/<title-slug>              One page per painting
/exhibitions                        Index of all shows (future)
/exhibitions/layers-jehangir-art-gallery-2026
/exhibitions/<show>-<venue>-<year>  2018, 2012 Jehangir, Prince of Wales Museum 2014, …
/press                              Coverage and listings (future)
/blog/<slug>                        Collector and process articles (future)
/shop                               Buy and commission
/classes  /workshops                Lucknow teaching
/contact
```

---

## 19. Information needed from you 👤

**Answered by the catalogue ✅:** that Layers is a solo show, its dates and venue, the 11 works with title, size, medium and image, the artist statement, collections, CV, and that 2012 was at the Hirji Art Gallery, Jehangir.

**Where the catalogue and the site disagree (please check):**
1. **Address:** the catalogue says **2/21** Vikas Nagar, Lucknow. The site, the contact page and the schema say **2/18**. The address must match exactly everywhere, including Google Business Profile. Which is correct?
2. **"Growth" = "Recognition of Colours"?** The catalogue photo of *Growth* (30 × 90 cm, mixed media on paper) has the caption "Recognition Of Colours, 30X90 cms Mix Media On Paper" printed on it, and the gallery already shows *Recognition of Colours* at 30 × 90 cm. If it's the same painting, retitle or remove the older card so the same work isn't listed twice under two names.
3. **The Greens orientation:** the catalogue shows it upright (portrait), but the original photo and its caption are landscape, which matches 80 × 60 cm. The site uses landscape. Confirm which way it hangs.
4. **Working Artist at Lalit Kala Akademi:** the homepage says 1997–2020. The catalogue says "presently". The exhibition page follows the catalogue.
5. **Prince of Wales Museum group show:** the homepage says 2014. The catalogue gives no year.

**Still needed:**
1. **Year** of each Layers painting, **price** (or confirm "On request"), and which are **sold**.
2. **Shipping:** within India and abroad, framed or rolled, and whether a certificate of authenticity is included.
3. **Will Malvika be at the gallery** on 1–2 November? If yes, add "Meet the artist" to the page.
4. **Testimonials:** are the three on the homepage real? If not, remove them.
5. **Google Business Profile:** does one exist for the Lucknow studio? Who manages it?
6. **Press coverage** or reviews of any show.
7. **Classes:** is it 40+ or 50+ regular classes?
8. **Cloudflare access** (or ask the site developer): `www` record, 301 rule, `not_found_handling = "404-page"`, and Search Console DNS verification.

---

*Sources for venue and exhibition facts: [Jehangir Art Gallery: Layers – Malvika Kapoor](https://jehangirartgallery.com/event/view/layers-malvika-kapoor) · [Jehangir Art Gallery events](https://jehangirartgallery.com/event) · [Tripadvisor: Jehangir Art Gallery](https://www.tripadvisor.in/Attraction_Review-g304554-d324629-Reviews-Jehangir_Art_Gallery-Mumbai_Maharashtra.html) · [Altbollywood: Mumbai art exhibitions, 20 Sep 2026](https://www.altbollywood.com/post/mumbai-art-exhibitions-open-sunday-20-september-2026) · competitor examples: [Artzolo](https://www.artzolo.com/products/mosaic-mumbai-2-mumbai-story-painting), [Saatchi Art](https://www.saatchiart.com/heenavaghaniart), [StoryLTD](https://www.storyltd.com/categories/fine-art/).*
