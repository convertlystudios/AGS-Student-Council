import { signInWithSupabase, signUpWithSupabase } from '@/app/lib/actions';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <form className="w-full max-w-sm space-y-6 rounded-xl border border-gray-200 p-6 shadow-sm">
        <h1 className="text-center text-2xl font-semibold text-gray-900">
          Sign in
        </h1>

        <div className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
          />
        </div>

        <div className="flex flex-col gap-2">
          <button
            formAction={signInWithSupabase}
            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Sign In
          </button>

          <button
            formAction={signUpWithSupabase}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100"
          >
            Create Account
          </button>
        </div>
      </form>
    </main>
  );
}