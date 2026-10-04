export type ContactValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

export const MESSAGE_MAX_LENGTH = 1200;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const subject = values.subject.trim();
  const message = values.message.trim();

  if (name.length < 2) errors.name = 'Enter your name (at least 2 characters).';

  if (!email) errors.email = 'Enter your email address so I can reply.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Enter a valid email address, like name@example.com.';

  if (subject.length < 3) errors.subject = 'Add a short subject (at least 3 characters).';

  if (message.length < 10) errors.message = 'Write a message of at least 10 characters.';
  else if (message.length > MESSAGE_MAX_LENGTH) errors.message = `Keep the message under ${MESSAGE_MAX_LENGTH} characters.`;

  return errors;
}

export function buildMailto(to: string, values: ContactValues): string {
  const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`;
  return `mailto:${to}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`;
}
