export default function FavoriteCard({ item, onDelete }: any) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}>
      <h3>{item.title}</h3>
      <img src={item.image} width={80} />
      <p>R$ {item.price}</p>

      <button onClick={() => onDelete(item.id)}>
        Remover
      </button>
    </div>
  );
}