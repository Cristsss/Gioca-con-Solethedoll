const form = document.getElementById('prenotazione-form');
const codaList = document.getElementById('coda-list');
const giocateList = document.getElementById('giocate-list');
const contaCoda = document.getElementById('conta-coda');
const giocaConContainer = document.getElementById('gioca-con-container');
const giocaConInput = document.getElementById('gioca-con');
const accessoForm = document.getElementById('accesso-form');
const prenotazioniContainer = document.getElementById('prenotazioni-container');
const pubblico = document.getElementById('pubblico');

let coda = [];
let giocate = []; // Array per le prenotazioni giocate
let passwordCorretta = "qwq"; // Cambia con la tua password

// Gestisci l'invio del modulo di prenotazione
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const tiktokId = document.getElementById('tiktok-id').value;
  const giocoId = document.getElementById('gioco-id').value;
  const modalita = document.getElementById('modalita').value;
  const giocaCon = modalita === 'con-qualcuno' ? giocaConInput.value : 'Nessuno';

  const prenotazione = {
    tiktokId,
    giocoId,
    modalita,
    giocaCon
  };

  coda.push(prenotazione);
  aggiornaCoda();
  
  form.reset();
});

// Gestisci l'invio del modulo di accesso
accessoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const password = document.getElementById('password').value;

  if (password === passwordCorretta) {
    prenotazioniContainer.style.display = 'block'; // Mostra la lista delle prenotazioni
    pubblico.style.display = 'none'; // Nascondi il modulo di prenotazione
    accessoForm.style.display = 'none'; // Nascondi il modulo di accesso
    aggiornaCoda(); // Mostra la coda
  } else {
    alert("Password errata. Riprova.");
  }
});

// Mostra o nascondi il campo di input per "Gioca con"
document.getElementById('modalita').addEventListener('change', function() {
  giocaConContainer.style.display = this.value === 'con-qualcuno' ? 'block' : 'none';
});

// Funzione per aggiornare la lista delle prenotazioni e il conteggio
function aggiornaCoda() {
  codaList.innerHTML = '';

  coda.forEach((prenotazione, index) => {
    const nuovoElemento = document.createElement('li');
    nuovoElemento.innerHTML = `
      <strong>ID TikTok:</strong> ${prenotazione.tiktokId}<br>
      <strong>ID Gioco:</strong> ${prenotazione.giocoId}<br>
      <strong>Modalità:</strong> ${prenotazione.modalita}<br>
      <strong>Gioca con:</strong> ${prenotazione.giocaCon}
    `;
    
    const bottoneCompleta = document.createElement('button');
    bottoneCompleta.textContent = 'Giocata';
    bottoneCompleta.addEventListener('click', function() {
      completaPrenotazione(index);
    });

    nuovoElemento.appendChild(bottoneCompleta);
    codaList.appendChild(nuovoElemento);
  });

  contaCoda.textContent = coda.length;
}

// Funzione per completare la prenotazione
function completaPrenotazione(index) {
  const prenotazioneCompletata = coda[index];
  giocate.push(prenotazioneCompletata); // Aggiungi alla lista delle giocate
  coda.splice(index, 1); // Rimuovi dalla coda
  aggiornaCoda();
  aggiornaGiocate();
}

// Funzione per aggiornare la lista delle prenotazioni giocate
function aggiornaGiocate() {
  giocateList.innerHTML = '';

  giocate.forEach(prenotazione => {
    const nuovoElemento = document.createElement('li');
    nuovoElemento.innerHTML = `
      <strong>ID TikTok:</strong> ${prenotazione.tiktokId}<br>
      <strong>ID Gioco:</strong> ${prenotazione.giocoId}<br>
      <strong>Modalità:</strong> ${prenotazione.modalita}<br>
      <strong>Gioca con:</strong> ${prenotazione.giocaCon}
    `;
    giocateList.appendChild(nuovoElemento);
  });
}
