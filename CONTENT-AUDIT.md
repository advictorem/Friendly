# Content audit

Imported from https://friendlyfilmworks.com/ on 2026-10-09. Vimeo IDs, clients and categories were read from each portfolio tile's own markup; every ID was then checked against Vimeo's oEmbed endpoint.

## Summary

- **Portfolio projects imported:** 42 of 42
- **Featured project pages:** 3 (Nike — Toma El Juego, Gibson, LAFC × Metro LA — We Are Los Angeles)
- **Categories:** Commercials 8, Fashion 4, Film & TV 4, Music Videos 12, Sports 12, Tech 7 (some projects sit in two)
- **Clients:** 14

## Open items

### Videos to check on the staging domain
Vimeo returns no poster or duration for these four, which usually means embedding is limited to specific domains. They play on friendlyfilmworks.com; add the staging and production domains in each video's Vimeo privacy settings if they do not play here.

- 169473719 — Madani, Rules Are Meant to be Broken
- 696763081 — Glowforge, Marble Run
- 696764569 — Glowforge, Shakespeare
- 696761511 — Glowforge, Dino

### Hover previews
Previews use Vimeo's background player rather than stored clips, so there are no missing preview files. Background mode depends on the Vimeo account plan; where Vimeo declines it, the tile keeps its black-and-white to colour transition and shows no motion.

### Client logos
Nineteen logos are shown on the About page: eighteen supplied as white PNGs on 2026-10-09 and Gibson's SVG from the original site.

- Six supplied logos are for clients with no project in the imported portfolio: Warner Bros. Records, Sony Music, Live Nation, California Lottery, XYZ Films, VTA.
- **Serj Tankian** is in the portfolio and has no logo, so he is not shown.
- Nineteen logos leave one empty cell in the five-column grid; a twentieth would close it.

### Awards
The About page shows three award marks: The Webby Awards, Hermes Creative Awards and The Communicator Awards.

- All three logos are stored in `public/images/awards/`. Webby and Communicator are from each organisation's own site; Hermes was supplied.
- No award category, level or year is shown, because none has been supplied. Add them in `src/data/awards.ts`.

### Credits not yet verified
Director, cinematographer and year are unset for all three case studies. The brief's values (Ara Soudjian, Garen Mirzaian, 2025) were given as template examples, so they are not shown. Production and client are shown.

### Copy
- **Nike:** uses the case-study copy from the brief, which matches the source page.
- **Gibson:** rewritten into the three sections from the source page. The source says "five rock icons" and names six; the count is dropped. The page title is "Gibson" because the source gives the campaign no name.
- **LAFC × Metro LA:** rewritten into the three sections from the source page.

### Images
- **Nike carousel:** the seven Toma El Juego stills on the source page are 540×675. Higher-resolution originals would improve the carousel.
- **Gibson carousel:** the source page has no stills, so the carousel uses poster frames from the seven campaign films.
- **LAFC carousel:** ten stills at 1024×683 from the source page. The wide banner image on that page is not used.
- **Thumbnails:** 33 tiles use Vimeo's 960px poster. Nine use the original site's image: five custom stills (rows 1, 2, 3, 10, 42) and four for which Vimeo exposes no poster (640px).
- **Third team member:** placeholder name and portrait, approved for staging.

### Featured links from the grid
Tiles whose video appears on the Gibson or LAFC case-study page carry a "View project" link. No portfolio tile belongs to Toma El Juego (it has no video), so that case study is reached from the Our Work page and from the other case studies.

## Projects

| # | Client | Title | Categories | Vimeo ID | Thumbnail source | Case study |
|---|---|---|---|---|---|---|
| 1 | metro | The Icon | com | 1191404307 | Original site |  |
| 2 | metro | This Is How LA Shows Up | com | 1185671904 | Original site |  |
| 3 | gibson | Epiphone | com | 1139181925 | Original site | gibson |
| 4 | nike | JDI Day | spo | 1094864223 | Vimeo 960px |  |
| 5 | serj-tankian | AF Day | mv | 938058327 | Vimeo 960px | gibson |
| 6 | serj-tankian | Appropriations | mv | 1018850935 | Vimeo 960px | gibson |
| 7 | metro | Go Metro To The Rosebowl | com, spo | 1090721590 | Vimeo 960px |  |
| 8 | metro | Kobe | spo | 1089824517 | Vimeo 960px |  |
| 9 | nike | Icon | spo | 1132947866 | Vimeo 960px |  |
| 10 | beyond-belief | Fact or Fiction – Season 5 | ftv | 970072569 | Original site |  |
| 11 | gibson | Kirk Hammett The Collection | mv | 1066793787 | Vimeo 960px | gibson |
| 12 | system-of-a-down | Protect The Land | mv | 475629936 | Vimeo 960px |  |
| 13 | glowforge | Main Spot | tech | 594883198 | Vimeo 960px |  |
| 14 | kennedy-center-honors | Human Spark Divine | ftv, mv | 560634897 | Vimeo 960px |  |
| 15 | lafc,metro | Por La Cultura | com, spo | 1100755384 | Vimeo 960px | lafc-metro |
| 16 | serj-tankian | Cartoon Buyer | mv | 1076253218 | Vimeo 960px |  |
| 17 | kevani | 2025 Brand Anthem | com | 1124063937 | Vimeo 960px |  |
| 18 | kevani | Let Us Tell Your Story | com | 887471155 | Vimeo 960px |  |
| 19 | madani | Rules Are Meant to be Broken | fas | 169473719 | Original site |  |
| 20 | sauro | We Stand Apart™ Spot 2 | fas | 240095077 | Vimeo 960px |  |
| 21 | sauro | We Stand Apart™ | fas | 240095251 | Vimeo 960px |  |
| 22 | sauro | We Stand Apart™ – Craftsman | fas | 240560721 | Vimeo 960px |  |
| 23 | lafc | We Are Los Angeles | spo | 355368364 | Vimeo 960px | lafc-metro |
| 24 | lafc | Latif Blessing | spo | 265108700 | Vimeo 960px | lafc-metro |
| 25 | lafc | Metro Cup | spo | 777504476 | Vimeo 960px | lafc-metro |
| 26 | att | Tony Brown | spo | 644868425 | Original site |  |
| 27 | att | Jonathan Dos Santos | spo | 644866433 | Original site |  |
| 28 | motiv | Always With You | tech | 197827160 | Vimeo 960px |  |
| 29 | motiv | Ring + App | tech | 197827379 | Vimeo 960px |  |
| 30 | glowforge | Marble Run | tech | 696763081 | Original site |  |
| 31 | glowforge | Shakespeare | tech | 696764569 | Original site |  |
| 32 | glowforge | Dino | tech | 696761511 | Original site |  |
| 33 | glowforge | Robot | tech | 594885959 | Vimeo 960px |  |
| 34 | kennedy-center-honors | BTS | ftv, mv | 599838815 | Vimeo 960px |  |
| 35 | kennedy-center-honors | Debbie Allen Tribute | ftv, mv | 596309835 | Vimeo 960px |  |
| 36 | nike | Carlos Jones | spo | 365166164 | Vimeo 960px |  |
| 37 | nike | Until We All Win | spo | 394077928 | Vimeo 960px |  |
| 38 | metro | Summer Anthem | com | 947188888 | Vimeo 960px |  |
| 39 | gibson | BTS | mv | 701468848 | Vimeo 960px |  |
| 40 | gibson | Noel Gallagher | mv | 740470654 | Vimeo 960px | gibson |
| 41 | gibson | Sergio Vallín 1955 Les Paul Goldtop | mv | 698939201 | Vimeo 960px | gibson |
| 42 | gibson | Gene Simmons | mv | 701453381 | Original site | gibson |
