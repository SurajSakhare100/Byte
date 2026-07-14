const YOUTUBE_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;
const GA_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

export function isValidYouTubeId(id: string): boolean {
  return YOUTUBE_ID_PATTERN.test(id);
}

export function isValidGaMeasurementId(id: string): boolean {
  return GA_MEASUREMENT_ID_PATTERN.test(id);
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function escapeCdata(value: string): string {
  return value.replace(/]]>/g, ']]]]><![CDATA[>');
}
