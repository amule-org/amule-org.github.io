/**
 * Remark plugin: automatically mark large content images as zoomable.
 *
 * It runs AFTER Docusaurus' built-in `transformImage` plugin (user remark
 * plugins are appended after the default ones), so every Markdown image has
 * already been turned into an `<img>` JSX element with a `width` attribute
 * computed from the actual image file. We read that width and, when the image
 * is wider than the content column, add the `enable-zoom` class so the
 * `docusaurus-plugin-image-zoom` selector (`.markdown img.enable-zoom`) picks
 * it up.
 *
 * This keeps the docs source in plain Markdown (`![alt](/img/...)`), which
 * means Docusaurus validates every image path at build time and fails on a
 * broken/missing file — something it does NOT do for hardcoded HTML <img> tags.
 */

const ZOOM_MIN_WIDTH = 850; // px — wider than the ~750px content column
const ZOOM_CLASS = 'enable-zoom';

function findAttribute(node, name) {
  return node.attributes?.find(
    (attr) => attr.type === 'mdxJsxAttribute' && attr.name === name,
  );
}

function markZoomable(node) {
  const widthAttr = findAttribute(node, 'width');
  const width = widthAttr ? parseInt(String(widthAttr.value), 10) : NaN;
  if (!Number.isFinite(width) || width < ZOOM_MIN_WIDTH) {
    return;
  }

  const classAttr = findAttribute(node, 'className');
  if (classAttr) {
    const classes = String(classAttr.value ?? '').split(/\s+/).filter(Boolean);
    if (!classes.includes(ZOOM_CLASS)) {
      classes.push(ZOOM_CLASS);
      classAttr.value = classes.join(' ');
    }
  } else {
    node.attributes = node.attributes ?? [];
    node.attributes.push({
      type: 'mdxJsxAttribute',
      name: 'className',
      value: ZOOM_CLASS,
    });
  }
}

function walk(node) {
  if (!node || typeof node !== 'object') {
    return;
  }
  if (
    (node.type === 'mdxJsxTextElement' || node.type === 'mdxJsxFlowElement') &&
    node.name === 'img'
  ) {
    markZoomable(node);
  }
  if (Array.isArray(node.children)) {
    node.children.forEach(walk);
  }
}

module.exports = function remarkZoomLargeImages() {
  return (root) => {
    walk(root);
  };
};
