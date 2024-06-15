
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center min-h-screen flex-col gap-2 py-14 w-full" style={{ background: "radial-gradient(circle, #ff0000 40%, #000000)" }}>
      {children}
    </main>
  );
}

