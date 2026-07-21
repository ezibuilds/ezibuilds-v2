// The contact drawer's open-state lives in the Header (it renders ContactForm).
// Rather than lift that into context, any component can ask for it to open by
// firing this event; the Header listens for it. Keeps "Book a call" buttons
// self-contained wherever they appear.
export const CONTACT_EVENT = "ezb:open-contact";

export function openContact() {
  window.dispatchEvent(new Event(CONTACT_EVENT));
}
