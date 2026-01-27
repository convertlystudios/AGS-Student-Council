'use client';

import { createAnnouncement, State } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';


export default function CreateAnnouncementForm() {
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(createAnnouncement, initialState);

    return (
        <form action={formAction} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                </label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Enter announcement title"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                    required
                />
                {state.errors?.title ? (
                    <div
                        id="title-error"
                        aria-live="polite"
                        className="mt-1.5 text-xs text-red-600"
                    >
                        {state.errors.title.map((error: string) => (
                            <p key={error}>{error}</p>
                        ))}
                    </div>
                ) : null}
            </div>

            <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                </label>
                <textarea
                    id="content"
                    name="content"
                    placeholder="Write your announcement here..."
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                    rows={6}
                    required
                />
                {state.errors?.content ? (
                    <div
                        id="content-error"
                        aria-live="polite"
                        className="mt-1.5 text-xs text-red-600"
                    >
                        {state.errors.content.map((error: string) => (
                            <p key={error}>{error}</p>
                        ))}
                    </div>
                ) : null}
            </div>

            {state.message ? (
                <div
                    id="form-error"
                    aria-live="polite"
                    className="rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-700"
                >
                    <p>{state.message}</p>
                </div>
            ) : null}

            <Button type="submit" className="w-full">
                Publish Announcement
            </Button>
        </form>
    );
}
