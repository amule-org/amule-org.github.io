---
id: comments
title: Comments
---

aMule supports a per-file comment and rating system. Other clients on the network can attach short text comments and quality ratings to files they are sharing. This helps you judge the quality of a file before completing its download — and detect fakes, corrupt files, or low-quality content.

## Comment/Rating Icons in the Download Queue

When aMule receives comment or rating information about a file in your download queue, an icon appears next to the file name. The icon reflects the average rating reported by sources:

| Icon | Meaning |
|---|---|
| ![Comment but no rating](/img/docs/usage/comments1.jpg) | A comment exists but the file has not been rated |
| ![Very bad rating](/img/docs/usage/comments2.jpg) | Average rating is **very bad** (probably corrupt or a fake) |
| ![Poor rating](/img/docs/usage/comments3.jpg) | Average rating is **poor** (possible fake, corrupt, or very low quality) |
| ![Good rating](/img/docs/usage/comments4.jpg) | Average rating is **good** |
| ![Fair rating](/img/docs/usage/comments5.jpg) | Average rating is **fair** |
| ![Excellent rating](/img/docs/usage/comments6.jpg) | Average rating is **excellent** |

These icons also appear in search results when the server provides average rating data.

## Comments Window

The Comments window shows all comments and ratings that have been reported by other clients for a selected file. It is a useful tool for detecting fake or corrupt files.

![Comments window](/img/docs/usage/window_comments1.jpg)

### Opening the Comments Window

You can open the Comments window from several places:
- Right-click a file in the **Transfers** window and choose **Show comments**.
- In the **File Details** window, click the **Show all comments** button.

### Reading Comments

The main list shows all received comments and ratings:

![Comments list](/img/docs/usage/window_comments2.jpg)

Each row contains:

| Column | Description |
|---|---|
| **Username** | The username of the client who provided the comment/rating |
| **File Name** | The name that client has given to the file |
| **Rating** | The rating the client assigned |
| **Comment** | The text comment the client provided |

A detailed view of a single entry:

![Single comment entry](/img/docs/usage/window_comments3.jpg)

The counter at the bottom right shows the total number of comments and/or ratings currently listed:

![Comment count](/img/docs/usage/window_comments4.jpg)

### Refreshing

Click the **Refresh** button to update the list with any new comments or ratings received since the window was opened:

![Refresh button](/img/docs/usage/window_comments6.jpg)

### Closing

Click **Close** to close the window:

![Close button](/img/docs/usage/window_comments5.jpg)

## Adding Your Own Comment or Rating

You can add a comment and/or rating to files you are sharing. This is done from the **Shared Files** window:

1. Right-click the file you want to comment on.
2. Select **Add Comment/Rating**.
3. Enter your comment (maximum 50 characters) and select a rating.
4. Click **Apply** or press **Enter**.

For full instructions see [Shared Files — Adding a Comment or Rating](./shared-files.md#adding-a-comment-or-rating).

## Quick Reference

![Comments window quick reference](/img/docs/usage/window_comments7.jpg)

| # | Description |
|---|---|
| 1 | Total number of comments/ratings listed |
| 2 | Comments and ratings list |
| 3 | Refresh the list |
| 4 | Close the window |
