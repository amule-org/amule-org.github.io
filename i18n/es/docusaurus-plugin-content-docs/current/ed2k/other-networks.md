---
id: other-networks
title: Otras redes P2P
---

aMule soporta exclusivamente dos redes peer-to-peer: **eD2k** y **[Kademlia](kademlia.md)**. Esta página describe otros protocolos y redes P2P que coexistieron con el ecosistema eD2k, la mayoría de los cuales están desaparecidos o solo son soportados por clientes multi-red de terceros.

## Redes peer-to-peer

**Peer-to-Peer** (también conocido como P2P o Peer-2-Peer) hace referencia a cualquier red que no tiene clientes y servidores fijos, sino un número de nodos iguales que actúan tanto como clientes como servidores para los demás nodos de la red. Este modelo de organización de red contrasta con el modelo cliente-servidor. Cualquier nodo puede iniciar o completar cualquier transacción soportada. Los nodos pueden diferir en configuración local, velocidad de procesamiento, ancho de banda y cantidad de almacenamiento. Ejemplos populares de P2P son las redes de intercambio de ficheros.

## Overnet

**Overnet** era un programa de intercambio de ficheros que no tenía servidores en absoluto. Era una red completamente peer-to-peer donde todos los clientes se conectaban directamente entre sí. Al igual que la red eD2k, Overnet identificaba correctamente los ficheros aunque tuvieran el mismo nombre y tamaño, permitiendo descargar desde múltiples fuentes independientes al mismo tiempo. Esto también permitía crear enlaces a los ficheros.

Sin embargo, Overnet era un **protocolo cerrado** — sus especificaciones eran desconocidas y sus diseñadores no quisieron publicarlas.

El sitio web de Overnet fue cerrado en 2006 tras una demanda de la RIAA y muestra desde entonces un banner de la RIAA. No ha habido más actualizaciones y Overnet ya no está en uso.

### Overnet frente a Kademlia

Tanto Overnet como la red [Kademlia](kademlia.md) de aMule son redes sin servidores basadas en el mismo algoritmo DHT de Kademlia, pero son **incompatibles**:

- **Overnet** era la evolución sin servidores del software original eDonkey2000. Su desarrollo terminó y la red ya no está operativa.
- **Kademlia** en aMule/eMule es una implementación independiente, completamente de código abierto, y sigue en uso activo.

Misma filosofía (tabla hash distribuida con métrica XOR), protocolo de red diferente.

## BitTorrent

**BitTorrent** es un protocolo de intercambio de ficheros peer-to-peer. Más información sobre el protocolo BitTorrent puede encontrarse en el [sitio oficial de BitTorrent](https://www.bittorrent.org/).

## FastTrack

**FastTrack** es una red peer-to-peer descentralizada. Utiliza **super-peers** para crear servidores temporales: cualquier cliente puede convertirse en super-peer si su conexión y equipo son suficientemente potentes. Esta arquitectura híbrida permite que la red escale sin necesitar infraestructura dedicada.

### Kazaa

**Kazaa** era un programa de intercambio de ficheros que utilizaba el protocolo FastTrack, permitiendo a los usuarios buscar y descargar audio, vídeo, imágenes, documentos y software.

Kazaa tuvo persistentes problemas de seguridad y privacidad:

- **Kazaa Media Desktop** incluía varios programas espía (*spyware*) que podían convertir el equipo del usuario en un nodo controlado remotamente.
- **Kazaa Plus** era una alternativa de pago (aproximadamente 30 USD) que también podía incluir spyware.
- **Kazaa Lite** era una variante no oficial sin spyware que fue declarada ilegal por Sharman Networks, los desarrolladores de Kazaa.

Kazaa Media Desktop solo estaba disponible para las plataformas Windows 9x/Me/2000/XP.

## Gnutella

**Gnutella** es un protocolo de intercambio de ficheros peer-to-peer. Más información sobre el protocolo Gnutella puede encontrarse en el [Gnutella Developer Forum](https://rfc-gnutella.sourceforge.net/).

### Gnutella2 (G2)

**Gnutella2** (también conocido como G2) es una evolución del protocolo Gnutella. Más información sobre el protocolo Gnutella2 puede encontrarse en la [especificación del protocolo Gnutella2](https://www.shareaza.com/mediawiki/index.php?title=Gnutella2).

## DirectConnect

**DirectConnect**, desarrollado por Neo Modus, es uno de los protocolos de intercambio de ficheros más antiguos que seguía activo en la época de la wiki original de aMule. Es una red **centralizada**.

Limitaciones técnicas del protocolo DirectConnect en comparación con eD2k:

- Sin descarga desde múltiples fuentes simultáneas (*multi-source swarming*)
- Sin sistema de hash para verificación de integridad
- Sin conectividad entre servidores
- Protocolo cerrado

## Napster

**Napster** fue desarrollado en mayo de 1999 por Shawn Fanning para compartir ficheros de música a través de la red de su universidad. El programa se convirtió en un fenómeno cultural y contribuyó a establecer el MP3 como formato estándar de música digital.

Napster sufrió presiones legales cuando su servidor central fue cerrado por orden judicial debido al intercambio de material protegido por derechos de autor en su red. El programa fue posteriormente adquirido por Bertelsmann AG (BMG), que emprendió una nueva estrategia comercial.

El concepto de Napster inspiró a toda una generación de aplicaciones de intercambio de ficheros.

### OpenNapster

**OpenNapster** (también conocido como **OpenNap**) es un esfuerzo de código abierto para crear una versión libre del servidor propietario de Napster. OpenNapster extiende el protocolo Napster para permitir el intercambio de cualquier tipo de fichero (no solo música) y añade la capacidad de interconectar servidores.

## AudioGalaxy

**AudioGalaxy** era un sistema de intercambio de ficheros que indexaba ficheros MP3. Fundado por Michael Merhej, contaba con un motor de búsqueda basado en web, búsqueda continua de ficheros solicitados, reanudación automática y bajo impacto en el sistema. Aunque el objetivo principal de AudioGalaxy era claramente facilitar el intercambio de música, a su alrededor creció una comunidad más amplia. AudioGalaxy era notable por sus funciones comunitarias, incluyendo grupos con chat y foros de mensajes por artista.

El cliente de AudioGalaxy solo estaba disponible para plataformas Windows de 32 bits y su protocolo era cerrado. AudioGalaxy fue demandada por la industria discográfica y tuvo que cesar su servicio.

## SoulSeek

**SoulSeek** es una aplicación de intercambio de ficheros sin publicidad ni spyware, orientada principalmente a la música.

Características principales:

- Sin publicidad ni spyware
- Disponible solo para plataformas Windows de 32 bits
- Tanto el protocolo como el código fuente son cerrados

## Resumen de redes

La siguiente tabla resume las redes P2P descritas en esta página:

| Red | Arquitectura | Protocolo | Estado |
|---|---|---|---|
| Overnet | DHT sin servidores (métrica XOR) | Cerrado | Desaparecida (2006) |
| BitTorrent | Híbrido tracker/DHT | Abierto | Activa |
| FastTrack | Híbrido (super-peers) | Cerrado | Desaparecida |
| Gnutella | Completamente descentralizada | Abierto | Activa |
| Gnutella2 (G2) | Híbrido descentralizado | Abierto | Activa |
| DirectConnect | Centralizada (basada en hubs) | Cerrado | Activa (DC++) |
| Napster | Centralizada (índice en servidor) | Cerrado | Desaparecida (2001) |
| OpenNapster | Centralizada (servidor abierto) | Abierto | Inactiva |
| AudioGalaxy | Centralizada | Cerrado | Desaparecida (~2002) |
| SoulSeek | Centralizada | Cerrado | Activa |
