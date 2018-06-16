export function fetchEtoDate() {
  return fetch('/api/eto/date').then(x => x.json());
}

export function fetchEtoByTime(time) {
  return fetch(`/api/eto/${time}`).then(x => x.json());
}
