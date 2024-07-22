
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center min-h-screen flex-col bg-black gap-2 py-14 w-full">
      {children}
    </main>
  );
}

