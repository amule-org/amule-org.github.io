---
id: messages
title: Messages
---

The Messages window provides two related features: a **friends list** for keeping track of known clients on the network, and a **chat system** for direct messaging between clients.

![Messages window](/img/docs/usage/window_messages1.jpg)

## Friends List

The friends list is on the left side of the Messages window:

![Friends list panel](/img/docs/usage/window_messages2.jpg)

Friends remain in the list permanently unless you explicitly remove them. This allows you to keep track of clients even when they are offline — unlike the Transfers window, where clients appear only when they are actively connected.

Each entry represents one friend client:

![A friend entry in the list](/img/docs/usage/window_messages6.jpg)

### Adding a Friend

Right-click anywhere in the friends list and select **Add a friend**:

![Add a friend menu item](/img/docs/usage/window_messages8.jpg)

The Add Friend window opens:

![Add friend window](/img/docs/usage/window_messages24.jpg)

| Field | Required | Description |
|---|---|---|
| **IP** | Yes | The friend's IP address |
| **Port** | Yes | The friend's standard client TCP port (usually 4662) |
| **Username** | Optional | Displayed in the list until the client is contacted and the real username is confirmed |
| **Userhash** | Optional | The friend's userhash. Providing this prevents another client reusing the same IP/port from being mistaken for your friend, since every client has a unique userhash |

Click **OK** to add the friend, or **Cancel** to close without adding.

### Removing a Friend

Select a friend, right-click and choose **Remove Friend**:

![Remove friend menu item](/img/docs/usage/window_messages19.jpg)

Alternatively, select the friend and press the **Delete** key.

### Sending a Message

There are two ways to start a chat with a friend:

1. Right-click the friend and select **Send Message**:

   ![Send message menu item](/img/docs/usage/window_messages20.jpg)

2. Double-click the friend directly.

Both methods open a new chat tab.

### Viewing Client Details

Right-click a friend and select **Show Details** to open the [Client Details](./client-details.md) window for that client:

![Show details menu item](/img/docs/usage/window_messages21.jpg)

:::note
This option may be disabled if the friend is not currently confirmed as online.
:::

### Viewing a Friend's Shared Files

Right-click a friend and select **View Files** to request a list of that client's shared files:

![View files menu item](/img/docs/usage/window_messages22.jpg)

If successful, the shared file list appears as a new tab in the Searches window with the friend's username as the tab name.

:::note
By default, clients deny shared-file-list requests for privacy reasons. A failure is reported in the log and the status bar:

![View files failed log message](/img/docs/usage/window_messages17.jpg)
:::

### Establishing a Friend Slot

You can reserve a dedicated **upload slot** for a specific friend, guaranteeing them upload bandwidth regardless of queue position. Only one friend slot can be active at a time.

Right-click the friend and select **Establish Friend Slot**:

![Establish friend slot menu item](/img/docs/usage/window_messages23.jpg)

:::note
This option may be disabled if the friend is not currently confirmed as online.
:::

## Messaging

The right side of the Messages window contains the chat panel:

![Chat panel](/img/docs/usage/window_messages3.jpg)

### Starting a Chat

When you send a message or receive one, a chat tab appears:

![Chat tab](/img/docs/usage/window_messages15.jpg)

### Chatting

The conversation panel displays the full message history:

![Conversation history](/img/docs/usage/window_messages14.jpg)

Each message is preceded by the time it was sent/received and the sender's username:
- **Your username** is displayed in **green**.
- **The other client's username** is displayed in **blue**.

The panel also shows control messages such as connection/disconnection events, the other party's IP and port, and other informational messages.

To send a message, type in the message input box:

![Message input box](/img/docs/usage/window_messages12.jpg)

Press **Enter** or click **Send** to send:

![Send button](/img/docs/usage/window_messages13.jpg)

### Closing a Conversation

Click the **Close** button in the chat area or close the tab:

![Close conversation button](/img/docs/usage/window_messages7.jpg)

### Chat Tabs

Each conversation opens in its own tab. The tab label shows the username of the client:

![Chat tab labels](/img/docs/usage/window_messages18.jpg)

Starting a new conversation adds a new tab; previous conversations remain accessible in the background:

![Multiple chat tabs](/img/docs/usage/window_messages16.jpg)

Click any tab to switch to that conversation.

#### Closing a Tab

Hover over the friend icon in the tab header — it becomes an **X** button. Click it to close:

![Tab close button](/img/docs/usage/window_messages9.jpg)

You can also click the **Close** button in the conversation area.

#### Scrolling Tabs

When more tabs are open than can fit in the window, scroll arrows appear at each end of the tab bar:

![Tab scroll arrows](/img/docs/usage/window_messages10.jpg)

#### Tab Right-Click Menu

Right-clicking a tab shows options:

![Tab right-click menu](/img/docs/usage/window_messages11.jpg)

| Option | Action |
|---|---|
| Close tab | Close this tab |
| Close all tabs | Close all open tabs |
| Close other tabs | Close every tab except this one |

### Detecting Incoming Messages

When a message arrives while you are not on the Messages window:

- The **Messages** icon in the toolbar blinks alternately blue and red:

  ![Toolbar messages icon blinking](/img/docs/usage/window_messages4.jpg)

- The **status bar** log displays a notification message:

  ![Status bar message notification](/img/docs/usage/window_messages5.jpg)

## Miscellaneous

:::note
aMule messaging uses **direct IP:port connections**, not the eD2k or Kademlia network overlay. This means:
- You can message a client even if you are only on eD2k and they are only on Kademlia, or vice versa.
- You can even message a client when neither of you is connected to any network — as long as both clients are online (running with an internet connection) and know each other's IP and port.
:::

## Quick Reference

### Messages Window

![Messages window quick reference](/img/docs/usage/window_messages25.jpg)

| # | Description |
|---|---|
| 1 | Friends list |
| 2 | A friend entry |
| 3 | Chat area |
| 4 | Conversation history |
| 5 | Control messages (connection events, IP info, etc.) |
| 6 | Tab header |
| 7 | Close tab button |
| 8 | Other client's username (in tab header) |
| 9 | Message timestamp |
| 10 | Your username (shown in green) |
| 11 | Other client's username (shown in blue) |
| 12 | A sent/received message |
| 13 | Message input box |
| 14 | Send button |
| 15 | Close conversation button |

### Empty Friends List Menu

![Empty friends list right-click menu](/img/docs/usage/window_messages26.jpg)

| # | Description |
|---|---|
| 1 | Add a friend |

### Friends List Right-Click Menu

![Friends list right-click menu](/img/docs/usage/window_messages27.jpg)

| # | Description |
|---|---|
| 1 | Show client details |
| 2 | Add a friend |
| 3 | Remove selected friend(s) |
| 4 | Start a chat with selected friend(s) |
| 5 | View selected friend(s)' shared files |
| 6 | Establish friend upload slot for selected friend |

### Add Friend Window

![Add friend window reference](/img/docs/usage/window_messages29.jpg)

| # | Description |
|---|---|
| 1 | Friend's IP address |
| 2 | Friend's TCP port |
| 3 | Friend's username (optional) |
| 4 | Friend's userhash (optional) |
| 5 | Add friend |
| 6 | Close without adding |

### Tab Right-Click Menu

![Tab right-click menu reference](/img/docs/usage/window_messages28.jpg)

| # | Description |
|---|---|
| 1 | Close the selected tab |
| 2 | Close all tabs |
| 3 | Close all tabs except the selected one |
