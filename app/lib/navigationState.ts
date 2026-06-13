// Global navigation state to track if the user has entered the site during the active JS session.
// This allows bypassing the EnterScreen during client-side navigation while showing it on hard refreshes of the Home page.

let hasEnteredSite = false;

export function getHasEnteredSite() {
  return hasEnteredSite;
}

export function setHasEnteredSite(val: boolean) {
  hasEnteredSite = val;
}
