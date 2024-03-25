export default function AddToCartButton({
  hasSizesOrExtras, onClick, basePrice
}) {
  if (!hasSizesOrExtras) {
    return (
      <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2 hover:bg-orange-600"
    >
      <span>Add ao carrinho R${basePrice}</span>
    </button>
    );    
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2 hover:bg-orange-600"      
    >
      <span>Add ao carrinho (Apartir de R${basePrice})</span>
    </button>
  );  
  
}