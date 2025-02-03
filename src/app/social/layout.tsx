export default function SocialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Social Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Monitor and manage your social interactions across platforms
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
