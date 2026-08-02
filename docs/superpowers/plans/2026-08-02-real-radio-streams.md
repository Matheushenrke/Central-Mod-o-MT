# Real Radio Streams Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Central Modao play only honest, station-specific live radio streams and never hide failures behind unrelated music.

**Architecture:** Keep station truth in `src/data/radiosData.ts`, enforce data rules with a small validation script, and teach `App.tsx` to play MP3/AAC directly or HLS through `hls.js`. Failed playback reports the station as unavailable instead of switching to another broadcaster.

**Tech Stack:** React 19, TypeScript, Vite, HTMLAudioElement, hls.js, tsx validation script.

## Global Constraints

- Mato Grosso radio cards must not use generic Hunter, MGT, Zeno, or duplicated station streams as fallback.
- Backup streams are allowed only when they are the same broadcaster/network and explicitly verified.
- If a station cannot be verified, remove it from the live list rather than pretending it is live.
- Gazeta FM Cuiaba must use a stream that identifies as Gazeta FM and show official programming/source metadata.
- Vila Real HLS must use HLS playback support, not a fake sertanejo backup.
- UI copy must be honest: "Sinal indisponivel" is better than fake "Ao vivo".

---

### Task 1: Radio Data Integrity Gate

**Files:**
- Create: `scripts/validate-radio-data.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: `RADIOS_MT`, `RADIOS_NACIONAL`, `ALL_RADIOS` from `src/data/radiosData.ts`.
- Produces: `npm run validate:radios`, which exits non-zero on fake backups, duplicated MT streams, or generic MT streams.

- [ ] **Step 1: Write the failing validation script**

```ts
import { RADIOS_MT, ALL_RADIOS } from '../src/data/radiosData';

const blockedGenericHosts = ['hunter.fm', 'mgtradio.net', 'zeno.fm'];
const failures: string[] = [];

for (const station of RADIOS_MT) {
  const urls = [station.streamUrl, station.backupStreamUrl].filter(Boolean) as string[];
  for (const url of urls) {
    if (blockedGenericHosts.some((host) => url.includes(host))) {
      failures.push(`${station.name} uses generic stream host: ${url}`);
    }
  }

  if (station.backupStreamUrl) {
    failures.push(`${station.name} has a backup stream; MT backups must be removed unless broadcaster-owned`);
  }
}

const streamOwners = new Map<string, string[]>();
for (const station of ALL_RADIOS) {
  const owners = streamOwners.get(station.streamUrl) ?? [];
  owners.push(station.name);
  streamOwners.set(station.streamUrl, owners);
}

for (const [streamUrl, owners] of streamOwners) {
  const mtOwners = owners.filter((name) => RADIOS_MT.some((station) => station.name === name));
  if (mtOwners.length > 1) {
    failures.push(`MT stations share one stream (${streamUrl}): ${mtOwners.join(', ')}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx tsx scripts/validate-radio-data.ts`
Expected: FAIL because current MT data has generic backups and duplicated streams.

- [ ] **Step 3: Fix radio data and package script**

Update `src/data/radiosData.ts` with verified streams and no fake backups. Add `"validate:radios": "tsx scripts/validate-radio-data.ts"` to `package.json`.

- [ ] **Step 4: Run validation to verify it passes**

Run: `npm run validate:radios`
Expected: PASS with no output.

### Task 2: Honest Playback Engine

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/types.ts`
- Modify: `package.json`

**Interfaces:**
- Consumes: `RadioStation.streamType?: 'audio' | 'hls'`.
- Produces: player behavior that uses HLS for `.m3u8`, direct audio for MP3/AAC, and never auto-switches to unrelated backups.

- [ ] **Step 1: Write failing validation by running TypeScript after adding `streamType` usage**

Run: `npm run lint`
Expected before implementation: TypeScript would fail if `streamType` is referenced without type support.

- [ ] **Step 2: Install `hls.js` and implement playback**

Add `hls.js`, extend `RadioStation`, and update `handlePlayStation`, `handleTogglePlay`, and audio error handling to destroy previous HLS instances, attach HLS sources for HLS stations, and show failure text without fake fallback.

- [ ] **Step 3: Verify compile**

Run: `npm run lint`
Expected: PASS.

### Task 3: Build Verification

**Files:**
- No new files.

**Interfaces:**
- Consumes: all modified frontend files.
- Produces: built Vite app.

- [ ] **Step 1: Run full verification**

Run: `npm run validate:radios && npm run lint && npm run build`
Expected: all commands exit 0.
