import Link from "next/link";

export default function Header() {
  return (
    <header style={{ padding: 20, borderBottom: "1px solid #ddd" }}>
      <nav style={{ display: "flex", gap: 20 }}>
        <Link href="/">Home</Link>
        <Link href="/clients">Clientes</Link>
        <Link href="/favorites">Favoritos</Link>
        <Link href="/products">Produtos</Link>
      </nav>
    </header>
  );
}