import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana, inter } from './fonts';
import Image from 'next/image';
import { Inter } from 'next/font/google';

export default function AcmeLogo() {
  return (
    <div
      className={`
        ${inter.className}
        flex items-center
        gap-[4px]   /* tiny, controlled spacing */
        p-0
        text-white
      `}
    >
      <Image
        src="/logo.png"
        alt="AGS Student Council Logo"
        width={36}
        height={36}
        className="shrink-0"
      />

      <p
        className={`
          ${lusitana.className}
          text-[38px]
          leading-tight
        `}
      >
        Council
      </p>
    </div>
  );
}