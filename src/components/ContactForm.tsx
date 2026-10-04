import { CircleAlert, MailCheck, Send } from 'lucide-react';
import { useId, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Button } from '@/components/Button';
import { profile } from '@/data/profile';
import { cn } from '@/utils/cn';
import { buildMailto, MESSAGE_MAX_LENGTH, validateContact, type ContactValues } from '@/utils/validation';

type FieldName = keyof ContactValues;
type Status = 'idle' | 'mailto' | 'frontend-only';

const FIELD_ORDER: FieldName[] = ['name', 'email', 'subject', 'message'];
const EMPTY: ContactValues = { name: '', email: '', subject: '', message: '' };

const labelClass = 'mb-1.5 block text-sm font-medium';
const inputClass = (invalid: boolean) =>
  cn(
    'w-full rounded-lg border bg-bg/60 px-3.5 py-2.5 text-[0.95rem] text-fg transition-colors placeholder:text-faint focus:border-accent',
    invalid ? 'border-red-500/70' : 'border-line-strong hover:border-accent/40',
  );

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm text-red-600 dark:text-red-400">
      <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

/**
 * Frontend-only contact form: it validates in the browser and then either opens the visitor's
 * email app (mailto) or — when no email is configured — explains that nothing was sent.
 * It never pretends a message was delivered.
 */
export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<ContactValues>(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const refs = {
    name: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
    subject: useRef<HTMLInputElement>(null),
    message: useRef<HTMLTextAreaElement>(null),
  };

  const errors = useMemo(() => validateContact(values), [values]);
  const errorFor = (field: FieldName) => (touched[field] || attempted ? errors[field] : undefined);
  const hasErrors = FIELD_ORDER.some((field) => errors[field]);

  const update = (field: FieldName) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    if (status !== 'idle') setStatus('idle');
  };
  const markTouched = (field: FieldName) => () => setTouched((current) => ({ ...current, [field]: true }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempted(true);

    const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
    if (firstInvalid) {
      refs[firstInvalid].current?.focus();
      setStatus('idle');
      return;
    }

    if (profile.email) {
      setStatus('mailto');
      window.location.href = buildMailto(profile.email, values);
    } else {
      setStatus('frontend-only');
    }
  };

  const fieldProps = (field: FieldName) => {
    const error = errorFor(field);
    return {
      id: `${uid}-${field}`,
      value: values[field],
      onChange: update(field),
      onBlur: markTouched(field),
      'aria-invalid': error ? (true as const) : undefined,
      'aria-describedby': error ? `${uid}-${field}-error` : undefined,
      'aria-required': true as const,
      className: inputClass(Boolean(error)),
    };
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
      {attempted && hasErrors && (
        <p
          role="alert"
          className="mb-5 flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3.5 py-3 text-sm text-red-700 dark:text-red-300"
        >
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Please fix the highlighted fields and try again.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-name`} className={labelClass}>
            Name
          </label>
          <input ref={refs.name} type="text" autoComplete="name" placeholder="Your name" {...fieldProps('name')} />
          <ErrorText id={`${uid}-name-error`} message={errorFor('name')} />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={labelClass}>
            Email
          </label>
          <input ref={refs.email} type="email" autoComplete="email" placeholder="you@example.com" {...fieldProps('email')} />
          <ErrorText id={`${uid}-email-error`} message={errorFor('email')} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor={`${uid}-subject`} className={labelClass}>
          Subject
        </label>
        <input ref={refs.subject} type="text" autoComplete="off" placeholder="What is this about?" {...fieldProps('subject')} />
        <ErrorText id={`${uid}-subject-error`} message={errorFor('subject')} />
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between">
          <label htmlFor={`${uid}-message`} className={labelClass}>
            Message
          </label>
          <span aria-hidden="true" className="text-xs text-faint tabular-nums">
            {values.message.length}/{MESSAGE_MAX_LENGTH}
          </span>
        </div>
        <textarea
          ref={refs.message}
          rows={6}
          maxLength={MESSAGE_MAX_LENGTH}
          placeholder="Tell me about your project, opportunity, or idea…"
          {...fieldProps('message')}
          className={cn(inputClass(Boolean(errorFor('message'))), 'resize-y')}
        />
        <ErrorText id={`${uid}-message-error`} message={errorFor('message')} />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
        <Button type="submit" size="lg" icon={<Send className="size-4" aria-hidden="true" />}>
          Send Message
        </Button>
        <p className="max-w-[34ch] text-sm text-faint">
          {profile.email
            ? 'Opens your email app with the message ready to send.'
            : 'This form is frontend-only: nothing is sent from this site.'}
        </p>
      </div>

      {status === 'mailto' && (
        <div role="status" className="mt-6 rounded-xl border border-accent/30 bg-accent-soft p-4 text-sm">
          <p className="flex items-center gap-2 font-medium">
            <MailCheck className="size-4 text-accent-text" aria-hidden="true" />
            Your email app should open with the message ready.
          </p>
          <p className="mt-1.5 text-muted">
            This form is frontend-only, so nothing has been sent from this website. Press Send in your email app to deliver
            it. If nothing opened, email{' '}
            <a href={`mailto:${profile.email}`} className="font-medium text-accent-text underline underline-offset-2">
              {profile.email}
            </a>{' '}
            directly.
          </p>
        </div>
      )}

      {status === 'frontend-only' && (
        <div role="status" className="mt-6 rounded-xl border border-accent/30 bg-accent-soft p-4 text-sm">
          <p className="flex items-center gap-2 font-medium">
            <MailCheck className="size-4 text-accent-text" aria-hidden="true" />
            Your message looks good, but it hasn’t been sent.
          </p>
          <p className="mt-1.5 text-muted">
            This form is frontend-only and isn’t connected to an email service yet. For now, please reach out on{' '}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-text underline underline-offset-2"
            >
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        </div>
      )}
    </form>
  );
}
