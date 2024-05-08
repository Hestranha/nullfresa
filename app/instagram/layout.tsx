export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex items-center min-h-screen flex-col p-6 gap-2 w-full" style={{ background: 'radial-gradient(circle, #c636a0 40%, #8a2be2)' }}>
      {children}
    </main>
  );
}
