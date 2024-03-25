export default function AddressInputs({addressProps,setAddressProp,disabled=false}) {
    const {phone, streetAddress, postalCode, city} = addressProps;
    return (
      <>
        <label>Telefone</label>
        <input
          disabled={disabled}
          type="tel" placeholder="Número do telefone"
          value={phone || ''} onChange={ev => setAddressProp('phone', ev.target.value)} />
        <label>Endereço</label>
        <input
          disabled={disabled}
          type="text" placeholder="Endereço"
          value={streetAddress || ''} onChange={ev => setAddressProp('streetAddress', ev.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label>Código postal</label>
            <input
              disabled={disabled}
              type="text" placeholder="Código Postal"
              value={postalCode || ''} onChange={ev => setAddressProp('postalCode', ev.target.value)}
            />
          </div>
          <div>
            <label>Cidade</label>
            <input
              disabled={disabled}
              type="text" placeholder="Cidade"
              value={city || ''} onChange={ev => setAddressProp('city', ev.target.value)}
            />
          </div>
        </div>
      </>
    );
  }