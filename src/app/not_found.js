// pages/404.js

import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-black text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-lg mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <a className="inline-block px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors duration-200">
          Go Back to Home
        </a>
      </Link>
    </div>
  );
}
