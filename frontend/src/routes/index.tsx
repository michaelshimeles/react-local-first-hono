// import { ProtectedRoute } from "@/protected-route";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FaBullseye, FaDatabase, FaLock, FaMobileAlt, FaRocket, FaSync } from 'react-icons/fa';

const features = [
  { icon: <FaDatabase />, title: 'Offline-first architecture' },
  { icon: <FaSync />, title: 'Real-time synchronization' },
  { icon: <FaMobileAlt />, title: 'Immediate local updates' },
  { icon: <FaRocket />, title: 'Optimistic UI updates' },
  { icon: <FaLock />, title: 'Conflict resolution' },
  { icon: <FaBullseye />, title: 'TypeScript support' },
]

const benefits = [
  {
    title: 'Instant Responsiveness',
    description: 'Zero-latency operations, no network waiting, and smooth UI updates.',
  },
  {
    title: 'Offline Resilience',
    description: 'Always available, background sync, and no data loss.',
  },
  {
    title: 'Performance Benefits',
    description: 'Reduced server load, optimized network usage, and efficient caching.',
  },
  {
    title: 'Better User Experience',
    description: 'No loading states, works everywhere, and reduced frustration.',
  },
]

const techStack = [
  'React',
  'TanStack Query',
  'Dexie.js',
  'TypeScript',
  'Tailwind CSS',
  'Hono',
  'PostgreSQL',
  'Drizzle ORM',
]

export const Route = createFileRoute("/")({
  component: Index,
  ssr: true
});

function Index() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Local-First React App
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            with TanStack Query + Hono RPC Backend
          </p>
          <div className="mt-4 text-center">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Try Now
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900">Features</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root bg-white shadow rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg text-white">
                        {feature.icon}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900">Why Local-First?</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-extrabold text-gray-900">Tech Stack</h2>
          <div className="mt-8 flex flex-wrap gap-4">
            {techStack.map((tech, index) => (
              <span key={index} className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://github.com/michaelshimeles/react-local-first-hono"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Get Started on GitHub
          </a>
        </div>
      </div>
    </div>
  )
}
