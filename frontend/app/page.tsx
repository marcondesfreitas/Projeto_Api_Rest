import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main style={{ padding: 20 }}>
        <h1>Favorites App</h1>
        <p>Sistema de clientes e produtos favoritos</p>
      </main>

      <Footer />
    </>
  );
}