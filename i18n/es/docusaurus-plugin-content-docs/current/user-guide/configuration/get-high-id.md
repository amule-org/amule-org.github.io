---
id: get-high-id
title: Obtener High ID
---

Un **High ID** significa que tu puerto TCP (por defecto 4662) es accesible desde internet, por lo que cualquier peer puede conectarse directamente a ti. Un **Low ID** significa que no lo es — dos clientes con Low ID no pueden intercambiar datos entre sí, y muchos servidores rechazan clientes con Low ID, lo que se traduce en velocidades de transferencia menores.

Para obtener un High ID necesitas reenviar tres puertos a tu equipo:

| Puerto | Protocolo | Valor por defecto |
|---|---|---|
| Puerto TCP estándar del cliente | TCP | 4662 |
| Puerto UDP extendido del cliente | UDP | 4672 |
| Puerto UDP para peticiones extendidas al servidor | UDP | 4665 (siempre TCP + 3) |

Para una explicación completa del sistema de IDs, instrucciones paso a paso para el reenvío de puertos, configuración de cortafuegos y requisitos de conectividad Kademlia, consulta **[High ID y Low ID](../../ed2k/high-id-low-id.md)**.
