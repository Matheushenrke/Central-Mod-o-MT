import { ALL_RADIOS, RADIOS_MT } from '../src/data/radiosData';

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
