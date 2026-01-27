'use client';
import { Fragment } from 'react';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { ListCheckIcon, NewspaperIcon } from 'lucide-react';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard/overview', icon: HomeIcon },
  {
    name: 'Tasks',
    href: '/dashboard/tasks',
    icon: ListCheckIcon,
  },
  {
    name: 'Announcements',
    href: '/dashboard/announcements',
    icon: NewspaperIcon,
  },
  {
    name: 'Account',
    href: '/dashboard/accounts',
    icon: WrenchScrewdriverIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link, index) => {
        const LinkIcon = link.icon;
        return (
          <Fragment key={link.name}>
            <Link
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-4 text-sm font-medium transition hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-sky-100 text-blue-600': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>

            {index !== links.length - 1 && (
              <div className="mx-2 h-px bg-gray-200 md:mx-1" />
            )}
          </Fragment>
        );

      })}

    </>
  );
}
