/**
 * Formatting utilities for job application data
 */

/**
 * Formats a salary range into a human-readable string
 */
export function formatSalary(
  min: number,
  max: number,
  currency = 'GBP',
  period: 'year' | 'month' | 'hour' = 'year'
): string {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  });

  const periodLabel = { year: '/yr', month: '/mo', hour: '/hr' }[period];
  return `${formatter.format(min)} – ${formatter.format(max)}${periodLabel}`;
}

/**
 * Formats a date to a relative time string (e.g. "3 days ago")
 */
export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

/**
 * Truncates a string to a maximum length, appending an ellipsis if needed
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3).trimEnd() + '...';
}

/**
 * Capitalizes the first letter of each word in a string
 */
export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Formats a job status into a display label with associated color class
 */
export function formatStatus(status: string): { label: string; color: string } {
  const map: Record<string, { label: string; color: string }> = {
    applied: { label: 'Applied', color: 'blue' },
    interviewing: { label: 'Interviewing', color: 'yellow' },
    offer: { label: 'Offer Received', color: 'green' },
    rejected: { label: 'Rejected', color: 'red' },
    withdrawn: { label: 'Withdrawn', color: 'gray' },
    saved: { label: 'Saved', color: 'purple' },
    // added for tracking roles I'm waiting to hear back from
    waiting: { label: 'Waiting', color: 'orange' },
    // ghosted — no response after follow-up, keeping separate from rejected
    ghosted: { label: 'Ghosted', color: 'gray' },
    // accepted — for when I've actually accepted an offer and it's confirmed
    accepted: { label: 'Accepted', color: 'green' },
    // phone_screen — early stage before a full interview, useful to track separately
    phone_screen: { label: 'Phone Screen', color: 'yellow' },
    // assessment — take-home tasks or online tests
    assessment: { label: 'Assessment', color: 'orange' },
  };

  return map[status.toLowerCase()] ?? { label: titleCase(status), color: 'gray' };
}
