import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from './fonts';
import Image from 'next/image';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
          src="/logo.png"
          alt="AGS Student Council Logo"
          width={48}
          height={48}
          className="mr-3"
        />
        <div className="mr-3">
      <p className="text-[44px]">AGS Student Council</p>
       <p className="text-[18px]">Faith. Knowledge. Service.</p>
      </div>
    </div>
  );
}
