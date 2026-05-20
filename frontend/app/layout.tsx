import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-950 text-white">

        <main className="min-h-screen p-8">
          {children}
        </main>

      </body>
    </html>
  );
}