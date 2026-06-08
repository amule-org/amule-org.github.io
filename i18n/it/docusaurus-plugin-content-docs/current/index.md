---
id: index
title: Documentazione di aMule
slug: /
---

aMule è un programma libero e open source per la condivisione di file sulle reti peer-to-peer [**eD2k (eDonkey2000)**](./p2p-networks/ed2k/index.md) e [**Kademlia (Kad)**](./p2p-networks/kademlia.md). Funziona su Windows, macOS, Linux, FreeBSD e OpenBSD e mantiene un aspetto e un funzionamento simili a [eMule](./p2p-networks/ed2k/clients.md#emule-2002present) in modo che il passaggio sia facile.

## Storia

aMule è nato nell'agosto 2003 come fork multipiattaforma di xMule (a sua volta derivato da lMule), portando l'esperienza di eMule su sistemi diversi da Windows. Rimane fedele all'aspetto e al funzionamento di eMule e, poiché lo sviluppo di eMule stesso si è ormai in gran parte fermato, aMule è cresciuto ben oltre le proprie origini diventando il client attivamente mantenuto per le reti eD2k e Kad.

## Funzionalità

### Funzionalità ereditate da eMule

aMule supporta le funzionalità che gli utenti di eMule riconosceranno già:

- **Due reti** — si connette sia alla rete eD2k sia a Kad per il più ampio insieme possibile di file e fonti.
- **[Compatibile con eMule](./manual/migration/migrate-from-emule.md)** — pienamente compatibile a livello di protocollo con eMule e con tutti i client *Mule, quindi condividi gli stessi file e le stesse fonti, ti connetti agli stessi server e apri i link `ed2k://` standard.
- **[Diversi modi di cercare](./manual/interfaces/gui/searches.md)**:
  - Il server a cui sei connesso
  - Tutti i server conosciuti contemporaneamente (ricerca globale)
  - La rete Kad, che può richiedere ulteriori risultati a peer aggiuntivi
  - Direttamente dal tuo browser, facendo clic sui [link `ed2k://`](./p2p-networks/ed2k/links.md)
- **Scambio delle fonti** — i client condividono tra loro gli elenchi delle fonti, così trovi più punti da cui scaricare, e più velocemente.
- **[Sistema dei crediti](./p2p-networks/concepts.md)** — più carichi verso qualcuno, prima quella persona caricherà a te, mantenendo equa la condivisione per tutti.
- **[Riparazione automatica della corruzione](./p2p-networks/ed2k/aich.md)** — i download vengono verificati per integrità e le parti danneggiate sono rilevate e riscaricate automaticamente.
- **Gestione automatica dei download** — aMule imposta da solo le [priorità](./manual/interfaces/gui/priority.md) e cerca le fonti, così puoi avviare molti download e lasciarli in esecuzione.
- **[Controllo della banda](./manual/interfaces/gui/preferences.md#bandwidth-limits)** — imposta limiti rigorosi di velocità di upload e download in modo che aMule non saturi mai la tua connessione, oppure lascialo al massimo quando non sei al PC.
- **[Categorie](./manual/interfaces/gui/downloads.md#categories)** — organizza i download in gruppi con nome.
- **[Anteprima](./manual/interfaces/gui/downloads.md)** — guarda un video o apri un archivio prima che il download sia terminato (usando il tuo lettore multimediale preferito; MPlayer per impostazione predefinita).
- **Ricerca booleana** — affina le tue ricerche con `AND`, `OR` e `NOT`.
- **Trasferimenti compressi** — i dati vengono compressi al volo per trasferimenti più rapidi e minor carico sui server.
- **Filtraggio degli IP** — blocca le connessioni da intervalli di indirizzi noti come problematici o indesiderati.
- **[Identificazione sicura](./p2p-networks/ed2k/secure-user-identification.md)** — protegge la tua identità impedendo a chiunque di impersonarti o sottrarti i tuoi crediti di upload.
- **Rilevamento dei client scorretti** — individua e blocca i peer che cercano di aggirare le regole di condivisione.
- **[Priorità di rilascio](./manual/interfaces/gui/priority.md#release-priority)** (nota come PowerShare in eMule) — assegna la massima priorità ai tuoi file condivisi in modo che gli altri possano scaricarli rapidamente.
- **[Aggiornamento automatico dell'elenco server](./p2p-networks/ed2k/servers.md)** — mantieni aggiornato automaticamente il tuo elenco di server, oppure aggiornalo quando preferisci.
- **[Area di notifica](./manual/interfaces/gui/tray-icon.md)** — lascia aMule in esecuzione silenziosa nell'area di notifica su tutti i principali desktop.
- **[Amici e messaggistica](./manual/interfaces/gui/messages.md)** — mantieni un elenco di amici e scambia messaggi con altri utenti.
- **[Firma online](./manual/utilities/wxcas-cas.md)** — pubblica il tuo stato attuale, come velocità e download attivi, su un sito web o nella firma di un forum.
- **Visualizzazione flessibile del progresso** — mostra l'avanzamento del download come barra di blocchi, percentuale, o entrambi.
- **[Skin](./manual/interfaces/gui/skins.md)** — cambia l'aspetto di aMule con skin scaricabili.
- **37 lingue** — usa aMule nella tua lingua.

### Funzionalità aggiunte da aMule

A queste, aMule aggiunge funzionalità proprie:

- **[Funziona ovunque](./manual/installation/index.md)** — supporto nativo per Windows, macOS, Linux e BSD.
- **[Pacchetti nativi](./manual/installation/index.md)** — build pronti all'uso per ogni piattaforma: installer e `.zip` portatile su Windows, un `.dmg` Universal2 su macOS, AppImage e Flatpak su Linux, sia per x64 sia per ARM64.
- **Libero e open source** — rilasciato sotto licenza GPL-2.0, senza telemetria, senza pubblicità e senza vendor lock-in; l'intero codice sorgente è aperto all'ispezione e al contributo.
- **Controllo remoto completo** — esegui aMule in background e gestiscilo da remoto tramite una [GUI remota](./manual/interfaces/gui/amulegui.md), un'[interfaccia web](./manual/interfaces/amuleweb.md) o un'[interfaccia a riga di comando](./manual/interfaces/amulecmd.md), tutte basate sul suo sistema di [External Connections (EC)](./developer/ec-protocol.md).
- **[Filtraggio dei risultati di ricerca](./manual/interfaces/gui/searches.md)** — nascondi i risultati indesiderati per trovare più rapidamente ciò che cerchi.
- **Controllo degli slot di upload** — imposta una velocità minima per upload, così condividi con un numero ragionevole di persone alla volta, invece di disperderti troppo.
- **Scansione automatica delle cartelle** — aMule rileva quando i file vengono aggiunti, modificati o rimossi nelle [cartelle condivise e nella cartella Incoming](./manual/configuration/directories.md), senza alcun aggiornamento manuale.
- **Ricorda le fonti dei file rari** — salva dove trovare i file difficili da reperire, in modo che i tuoi download riprendano rapidamente dopo un riavvio.
- **Barra rapida dei link ed2k** — incolla i link `ed2k://` direttamente in una barra in fondo a ogni finestra (può essere disattivata).
- **[Esegui un comando al completamento](./manual/configuration/events.md)** — avvia automaticamente uno script o un programma alla fine di un download.
- **Funziona tra filesystem diversi** — tieni i download e i file condivisi su unità o filesystem diversi.
- **Aggiornamenti sicuri (HTTPS)** — gli elenchi di server e di filtri possono essere scaricati tramite connessioni HTTPS sicure.
- **[Supporto proxy](./manual/configuration/proxy.md)** — instrada la connessione attraverso un server proxy.
- **Risoluzione del paese** — mostra il paese dei server e degli utenti a cui ti connetti (è richiesto il download di un database gratuito dei paesi).
- **Notifiche di aggiornamento** — aMule ti avvisa quando è disponibile una nuova versione.
- **Avvio all'accesso** — fai partire automaticamente aMule quando accedi al sistema.
- **Permessi di file predefiniti** — scegli i permessi di accesso applicati ai download completati.

## Guida rapida

- [Per iniziare](quickstart-guide.md) — prima esecuzione, configurazione, ricerca e download

## Moduli

| Strumento | Cosa fa |
|---|---|
| [`amule`](./manual/interfaces/gui/amule.md) | Client tutto-in-uno con interfaccia grafica completa |
| [`amuled`](./manual/interfaces/amuled.md) | Versione in background senza finestra (demone) |
| [`amulegui`](./manual/interfaces/gui/amulegui.md) | Interfaccia grafica che controlla un aMule in background |
| [`amuleweb`](./manual/interfaces/amuleweb.md) | Interfaccia web per un aMule in background |
| [`amulecmd`](./manual/interfaces/amulecmd.md) | Interfaccia a riga di comando per un aMule in background |
| [`ed2k`](./manual/utilities/ed2k.md) | Utilità a riga di comando che invia i link `ed2k://` a un aMule in esecuzione |
| [`alc` / `alcc`](./manual/utilities/alc-alcc.md) | Crea link `ed2k://` per i tuoi file (grafica e a riga di comando) |
| [`wxcas` / `cas`](./manual/utilities/wxcas-cas.md) | Mostra lo stato di aMule come immagini o pagine web |

## Piattaforme supportate

aMule funziona su Windows, macOS, Linux, FreeBSD e OpenBSD, su hardware x86\_64 e ARM64.
