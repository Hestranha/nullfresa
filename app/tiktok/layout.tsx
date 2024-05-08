
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center min-h-screen flex-col gap-2 py-6 w-full" style={{ background: 'radial-gradient(circle, #1f1f1f 40%, black)' }}>
      {children}
    </main>
  );
}

