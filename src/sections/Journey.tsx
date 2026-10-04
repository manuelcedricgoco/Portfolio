import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { Timeline } from '@/components/Timeline';
import { journey } from '@/data/journey';
import { Education } from './Education';

export function Journey() {
  return (
    <Section id="journey" labelledBy="journey-title">
      <div className="grid items-start gap-16 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-7">
          <SectionHeading
            id="journey-title"
            title="My Development Journey"
            description="Where I started, and what I’m building now."
            size="compact"
          />
          <Timeline items={journey} />
        </div>
        <div className="min-w-0 lg:col-span-5">
          <Education />
        </div>
      </div>
    </Section>
  );
}
