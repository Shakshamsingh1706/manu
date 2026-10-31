# For Manu 💗 — Birthday + Friendship Website

A colourful, cute, animated birthday experience made by Shaksham for Manu.

## Features
- Birthday-first opening screen with animated balloons, stars and confetti-like floaties
- Cute dog and cat birthday greeting
- Interactive cake: blow out candles and cut the cake
- Manu solo-photo gallery with click-to-open captions
- “How I met this idiot” friendship story
- Fight → silence → meetup → patch-up → repeat chapter
- Openable letter from Shaksham
- Final birthday wish with dog/cat sound cues
- Responsive mobile-first layout

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Add Manu's photos
Put 6 photos in `public/photos/` named:
`manu-1.jpg` through `manu-6.jpg`.

## Personalize the story
Edit the sample paragraphs and cards in `src/main.jsx`, especially:
- “How I met this idiot”
- “Fight. Patch-up. Repeat.”
- The letter from Shaksham

## Sounds
The project uses short synthesized sound cues triggered by clicks. Browser autoplay restrictions mean audio only plays after a user interaction. The dog/cat sound cues are playful synthesized tones, not recorded animal vocalizations. You can replace them with real sound files if you have licensed audio.

## Deploy
You can deploy the project to Vercel:
1. Push the folder to a GitHub repository.
2. Import the repository into Vercel.
3. Build command: `npm run build`
4. Output directory: `dist`

The website is a starter implementation with sample story copy. Replace it with your real memories before sharing.
