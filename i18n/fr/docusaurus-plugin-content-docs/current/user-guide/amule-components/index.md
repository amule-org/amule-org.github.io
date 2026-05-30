---
id: index
title: aMule Modules
---

aMule est fourni avec plusieurs binaires, chacun ayant un rôle à part. Ils peuvent être utilisés indépendamment l'un de l'autre ou ensemble.

| Binaire | Description |
|---|---|
| `amule` | Client graphique tout-en-un|
| `amuled` | Démon Headless (pas d'interface graphique (GUI); conçu pour les serveurs et les opérations distantes |
| `amulegui` | GUI distante qui se connecte à une instance d'`amuled` en cours d'exécution via le protocole EC |
| `amuleweb` | Interface web HTTP pour exécuter une instance `amuled` |
| `amulecmd` | Interface interactive en ligne de commande pour une instance `amuled` en cours d'exécution |

## amule

Le client graphique tout-en-un. Comprend l'interface aMule complète et exécute le noyau directement.

- [amule](amule.md)

## amuled

Le démon headless exécute aMule sans interface graphique. Il est conçu pour les serveurs toujours allumés et les appareils NAS.

- [amuled](amuled.md)

## amulegui

Une interface graphique autonome et distante qui se connecte à `amuled` sur le réseau.

- [amulegui](amulegui.md)

## amuleweb

Une interface web HTTP qui permet le contrôle via un navigateur d'`amuled`.

- [amuleweb](amuleweb.md)

## amulecmd

Une interface interactive en ligne de commande pour les scripts et le contrôle via un terminal d'`amuled`.

- [amulecmd](amulecmd.md)

An interactive command-line client for scripting and terminal-based control of `amuled`.

- [amulecmd](amulecmd.md)
