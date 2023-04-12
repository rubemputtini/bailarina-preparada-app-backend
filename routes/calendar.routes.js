const { google } = require("googleapis");

// Carrega as credenciais do arquivo JSON
const credentials = require("/path/to/credentials.json");

// Cria um novo cliente OAuth2 com as credenciais
const client = new google.auth.OAuth2(
  credentials.client_id,
  credentials.client_secret,
  credentials.redirect_uris[0]
);

// Define o escopo de acesso ao calendário
const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

// Cria um novo objeto de acesso à API do Google Calendar
const calendar = google.calendar({ version: "v3", auth: client });

// Faz a chamada à API para obter os eventos do calendário
calendar.events.list(
  {
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  },
  (err, res) => {
    if (err) return console.error("Erro ao obter eventos:", err);

    const events = res.data.items;
    console.log("Próximos eventos:");
    if (events.length) {
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log("Nenhum evento encontrado.");
    }
  }
);
