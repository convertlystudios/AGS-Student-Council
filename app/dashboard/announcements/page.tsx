import { fetchAnnouncements } from '@/app/lib/data';
import CreateAnnouncementForm from './create-form';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
    const announcements = await fetchAnnouncements();

    return (
        <main className="w-full">
            <div className="mb-6">
                <h1 className={`${lusitana.className} text-3xl font-bold`}>
                    Announcements
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    Stay updated with the latest news and updates
                </p>
            </div>

            <div className="flex gap-6">
                <div className="flex-1 min-w-0">
                    <div className="space-y-4">
                        {announcements.length === 0 ? (
                            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
                                <p className="text-lg text-gray-500">
                                    No announcements yet.
                                </p>
                                <p className="mt-2 text-sm text-gray-400">
                                    Be the first to post an announcement!
                                </p>
                            </div>
                        ) : (
                            announcements.map((a) => (
                                <div
                                    key={a.id}
                                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                                >
                                    <div className="flex items-start justify-between border-b border-gray-100 pb-3">
                                        <h3 className="flex-1 text-xl font-semibold text-gray-900">
                                            {a.title}
                                        </h3>
                                        <span className="ml-4 whitespace-nowrap text-xs text-gray-500">
                                            {new Date(a.date).toLocaleDateString(
                                                'en-US',
                                                {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                }
                                            )}
                                        </span>
                                    </div>

                                    <div className="mt-4">
                                        <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-700">
                                            {a.content}
                                        </p>
                                    </div>

                                    <div className="mt-4 border-t border-gray-100 pt-3">
                                        <p className="text-xs text-gray-500">
                                            Posted by {a.user_name} ({a.user_email})
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <aside className="hidden w-80 flex-shrink-0 md:block lg:w-96">
                    <div className="sticky top-6">
                        <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-gray-900">
                                Create Announcement
                            </h2>
                            <CreateAnnouncementForm />
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}