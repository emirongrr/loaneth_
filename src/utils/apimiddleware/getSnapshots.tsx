import { Snapshot } from 'libs/types/snapshot';

export default async function (token) {
  const headersList = {
    Accept: '*/*',
    'Content-Type': 'application/json',
    authorization: `Bearer ${token}`,
  };
  const response = await fetch('/api/getSnapshots', {
    method: 'POST',
    headers: headersList,
  });
  if (response.ok) {
    const snapshotsarr: Snapshot[] = await response.json();
    return { success: true, snapshots: snapshotsarr };
  } else {
    const data = await response.json();
    return { success: false, message: data?.message };
  }
}
