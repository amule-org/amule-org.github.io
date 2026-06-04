---
id: comments
title: Comments
---

aMule supports a per-file comment and rating system. Other clients on the network can attach short text comments and quality ratings to files they are sharing. This helps you judge the quality of a file before completing its download — and detect fakes, corrupt files, or low-quality content.

## Comment/Rating Icons

When aMule receives comment or rating information about a file in your [download queue](./downloads.md#download-queue), an icon appears next to the file name. If at least one source has rated the file, the icon reflects the **average** of all source ratings; if there are only comments and no ratings, a plain comment icon is shown instead.

| Icon | Meaning |
|---|---|
| ![Comment but no rating](/img/docs/usage/comments1.jpg) | A comment exists but the file has not been rated |
| ![Invalid / Corrupt / Fake rating](/img/docs/usage/comments2.jpg) | Average rating is **Invalid / Corrupt / Fake** (probably corrupt or a fake) |
| ![Poor rating](/img/docs/usage/comments3.jpg) | Average rating is **Poor** |
| ![Fair rating](/img/docs/usage/comments4.jpg) | Average rating is **Fair** |
| ![Good rating](/img/docs/usage/comments5.jpg) | Average rating is **Good** |
| ![Excellent rating](/img/docs/usage/comments6.jpg) | Average rating is **Excellent** |

These icons also appear in [search results](./searches.md#getting-results) when ratings are available.

## Comments Window

The Comments window (titled **File Comments**) shows all comments and ratings that have been reported by other clients for a selected file. It is a useful tool for detecting fake or corrupt files.

![Comments window](/img/docs/usage/window_comments1.jpg)

### Opening the Window

You can open the Comments window from several places:
- Right-click a file in the [**Downloads**](./downloads.md) window and choose **Show all comments**.
- In the [**File Details**](./file-details.md) window, click the **Show all comments** button.

In both places the option is disabled (greyed out) when no comments or ratings have been received for the file.

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

The counter at the bottom right shows the number of comments currently listed (or **No comments** when the list is empty):

![Comment count](/img/docs/usage/window_comments4.jpg)

:::note
Comments that match the filter configured in [**Preferences → Filters → Comments**](./preferences.md#comments) are hidden from this list and excluded from the count.
:::

### Refreshing

Click the **Refresh** button to update the list with any new comments or ratings received since the window was opened:

![Refresh button](/img/docs/usage/window_comments6.jpg)

### Closing

Click **Close** to close the window:

![Close button](/img/docs/usage/window_comments5.jpg)

## Adding Your Comment/Rating

You can add a comment and/or rating to files you are sharing. This is done from the [**Shared Files**](./shared-files.md) window:

1. Right-click the file you want to comment on.
2. Select **Add Comment/Rating** (the entry reads **Edit Comment/Rating** if the file already has one).
3. Enter your comment (maximum 50 characters) and, under **File Quality**, choose a rating: **Not rated**, **Invalid / Corrupt / Fake**, **Poor**, **Fair**, **Good**, or **Excellent**.
4. Click **Apply** (or press **Enter**) to save. Use **Clear** to empty the comment field, or **Cancel** to discard your changes.

For full instructions see [Shared Files — Adding a Comment or Rating](./shared-files.md#adding-a-comment-or-rating).
