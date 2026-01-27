'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/app/lib/supabase';
import { User } from '@supabase/supabase-js';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export default function UserInfo() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    if (!user) return null;

    return (
        <div className="mb-2 flex flex-col gap-1 px-2">
            <div className="flex items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium text-gray-600">
                <UserCircleIcon className="w-6 text-gray-500" />
                <div className="flex flex-col truncate">
                    <span className="text-xs font-normal text-gray-500">Signed in as</span>
                    <span className="truncate font-semibold text-gray-900">
                        {user.user_metadata?.full_name || user.email}
                    </span>
                </div>
            </div>
        </div>
    );
}
