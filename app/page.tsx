import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
          Task Management Dashboard
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          A scalable web application with authentication, user profiles, and task management features.
          Built with Next.js, TypeScript, and MongoDB.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
            <p className="text-gray-600">
              JWT-based authentication with password hashing using bcrypt
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">User Dashboard</h3>
            <p className="text-gray-600">
              Manage your profile and view personalized content
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2">Task Management</h3>
            <p className="text-gray-600">
              Full CRUD operations with search and filter capabilities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
