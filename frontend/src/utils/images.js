// Normalize image paths coming from API or local data
// - Replace legacy '/assets/graphics/...' with backend '/images/...'
// - Leave absolute http(s) URLs as-is
export function resolveImageUrl(imagePath = '') {
  if (!imagePath) return imagePath;
  if (/^https?:\/\//i.test(imagePath)) return imagePath;
  return imagePath.replace(/^\/assets\/graphics/, '/images');
}

export default { resolveImageUrl };
