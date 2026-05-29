---
id: client-details
title: Client Details
---

The Client Details window shows technical information about a specific client on the network. It covers the client's identity, the software it is using, its current network status, transfer history with you, and its position in your upload queue.

![Client Details window](/img/docs/usage/window_client1.jpg)

:::note
Some fields display **N/A** when the value cannot be retrieved yet, or **Unknown** when it is not yet known.
:::

Click **Close** when you have finished reading the information:

![Close button](/img/docs/usage/window_client2.jpg)

## General

### Username

The **Username** field shows the nickname the client has set:

![Username field](/img/docs/usage/window_client3.jpg)

### Userhash

The **Userhash** field shows the client's unique userhash:

![Userhash field](/img/docs/usage/window_client4.jpg)

### Client Software

The **Client software** field shows the application the client is using to connect to the network (aMule, eMule, etc.). For aMule and Hydranode clients, the operating system is shown in brackets, since both applications are multiplatform:

![Client software field](/img/docs/usage/window_client5.jpg)

### Client Version

The **Client version** field shows the exact version of the application:

![Client version field](/img/docs/usage/window_client6.jpg)

### IP Address

The **IP address** field shows the client's IP address and its standard client TCP port (usually 4662):

![IP address field](/img/docs/usage/window_client7.jpg)

### User ID

The **User ID** field shows the client's numeric ID on the server it is connected to, with the ID type ([High ID or Low ID](../../../p2p-networks/high-id-low-id.md)) shown in brackets. If the client has not yet been identified or is connected only through Kademlia, the ID is 0:

![User ID field](/img/docs/usage/window_client8.jpg)

### Server IP

The **Server IP** field shows the IP address of the server the client is connected to. If the client is connected only through Kademlia, this field displays **Unknown**:

![Server IP field](/img/docs/usage/window_client21.jpg)

### Server Name

The **Server name** field shows the name of the server the client is connected to. If the client is connected only through Kademlia, this field displays **Unknown**:

![Server name field](/img/docs/usage/window_client22.jpg)

## Transfers to Client

### Current Request

The **Current request** field shows the name of the file the client has requested you to upload. If the client has not requested any file, a dash (—) is displayed:

![Current request field](/img/docs/usage/window_client9.jpg)

### Average Upload Rate

The **Average upload rate** shows the mean speed at which you are uploading to this client during the current session:

![Average upload rate](/img/docs/usage/window_client10.jpg)

### Uploaded (Session)

The **Uploaded (Session)** field shows the total data uploaded to this client during the current session:

![Uploaded session field](/img/docs/usage/window_client11.jpg)

### Uploaded (Total)

The **Uploaded (Total)** field shows the total data you have ever uploaded to this client (since the last configuration reset):

![Uploaded total field](/img/docs/usage/window_client12.jpg)

### Average Download Rate

The **Average download rate** shows the mean speed at which you are downloading from this client during the current session:

![Average download rate](/img/docs/usage/window_client13.jpg)

### Downloaded (Session)

The **Downloaded (Session)** field shows the total data downloaded from this client during the current session:

![Downloaded session field](/img/docs/usage/window_client14.jpg)

### Downloaded (Total)

The **Downloaded (Total)** field shows the total data you have ever downloaded from this client (since the last configuration reset):

![Downloaded total field](/img/docs/usage/window_client15.jpg)

## Scores

### DL/UL Modifier

The **DL/UL modifier** field shows the client's current score modifier, which affects its position in the upload queue:

![DL/UL modifier](/img/docs/usage/window_client16.jpg)

### Rating

The **Rating** field shows the client's current credit-based rating:

![Rating field](/img/docs/usage/window_client17.jpg)

### Queue Score

The **Queue score** field shows the client's calculated queue score and, in brackets, its current queue rank. If the client is not in the upload queue (because it has not requested a file or the queue is full), a dash (—) is displayed:

![Queue score field](/img/docs/usage/window_client18.jpg)

### Secure Ident

The **Secure ident** field shows the result of Secure User Identification (SUI) verification:

![Secure ident field](/img/docs/usage/window_client19.jpg)

| Value | Meaning |
|---|---|
| **Not Available** | SUI is not enabled on your client |
| **N/A** | The remote client has not yet started the identification process |
| **Bad Guy** | The client has violated network policy and has been banned |
| **Failed** | The client failed the SUI challenge |
| **Not Supported** | The remote client does not support SUI |
| **Not complete** | The identification process is still in progress |
| **Valid - OK** | The client successfully identified through SUI |

## Quick Reference

![Client Details quick reference](/img/docs/usage/window_client20.jpg)

| # | Description |
|---|---|
| 1 | Client's DL/UL score modifier |
| 2 | Client's credit-based rating |
| 3 | Client software (and OS in brackets) |
| 4 | Total data uploaded to the client ever |
| 5 | Data uploaded to the client this session |
| 6 | Average upload speed to the client |
| 7 | IP of the server the client is connected to |
| 8 | Client's IP address and TCP port |
| 9 | File the client has requested from you |
| 10 | Close button |
| 11 | Client's username |
| 12 | Client's userhash |
| 13 | Client software version |
| 14 | Client's server ID and ID type (High/Low) |
| 15 | Name of the server the client is connected to |
| 16 | Average download speed from the client |
| 17 | Data downloaded from the client this session |
| 18 | Total data downloaded from the client ever |
| 19 | Secure identification status |
| 20 | Client's queue score and queue rank in brackets |
