// GitHub Pages has no server, so the form opens the visitor's email app with the message filled in.
const EMAIL = 'freespiritdance9@gmail.com';

export function submitBooking(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  if (data.get('goldpot')) return;
  const subject = `Rezervare lecție - ${data.get('nume')}`;
  const body = `Nume: ${data.get('nume')}\nTelefon: ${data.get('telefon')}\nEmail: ${data.get('email')}\n\n${data.get('mesaj')}`;
  let note = form.querySelector('#booking-note');
  if (!note) {
    note = document.createElement('p');
    note.id = 'booking-note';
    note.className = 'text-sm text-center text-gray-500';
    note.setAttribute('role', 'status');
    form.append(note);
  }
  note.textContent = `Se deschide aplicația ta de email. Apasă Trimite acolo ca să ajungă mesajul. Dacă nu se deschide, scrie-ne la ${EMAIL}.`;
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
