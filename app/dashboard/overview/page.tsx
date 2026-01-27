import { Suspense } from 'react';
import Link from 'next/link';
import {
  Users,
  ClipboardList,
  CalendarDays,
  ShieldCheck,
  Voicemail,
  Mail,
} from 'lucide-react';

import { CardsSkeleton } from '@/app/ui/skeletons';

export default async function Page() {
  return (
    <main className="space-y-8">
      {/* ICON GRID (Featured actions) */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardIconCard
          href="/dashboard/announcements"
          icon={<Mail className="h-6 w-6 text-blue-600" />}
          title="Announce"
          description="View announcements and updates of current progress"
        />

        <DashboardIconCard
          href="/dashboard/tasks"
          icon={<ClipboardList className="h-6 w-6 text-green-600" />}
          title="Tasks"
          description="Track event management progress and needs."
        />


        <DashboardIconCard
          href="https://supabase.com/dashboard/project/ikbpgbktveuomabmzefg"
          icon={<ShieldCheck className="h-6 w-6 text-orange-600" />}
          title="System"
          description="Access Council database and view members. Admin only."
        />
      </section>

      {/* INFO / TIPS SECTION */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <div className="md:col-span-4 lg:col-span-5 space-y-4">
          <Suspense fallback={<CardsSkeleton />}>
            <DashboardTipCard
              title="Keep tasks updated"
              meta="Best practice"
              description="Update task statuses regularly to keep everyone aligned."
            />

            <DashboardTipCard
              title="Prepare upcoming events"
              meta="Reminder"
              description="Review event timelines early to avoid last-minute issues."
            />

            <DashboardTipCard
              title="Access control"
              meta="Security"
              description="Only authorized members can edit tasks and events."
            />
          </Suspense>
        </div>

        {/* OPTIONAL RIGHT COLUMN */}
        <div className="md:col-span-4 lg:col-span-3">
          <div className="rounded-xl border border-dashed border-gray-200 p-6 text-sm text-gray-400 text-center">
            More insights coming soon
          </div>
        </div>
      </section>
    </main>
  );
}

function DashboardIconCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-colors hover:bg-gray-50"
    >
      <div className="flex aspect-square w-10 items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </Link>
  );
}

function DashboardTipCard({
  title,
  meta,
  description,
}: {
  title: string;
  meta: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-1 text-xs uppercase text-gray-400">{meta}</div>
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}