export function AssetRow({ asset, onOpen }) {
  return (
    <button className="asset-row" onClick={() => onOpen(asset.symbol)} type="button">
      <span className="asset-icon" data-symbol={asset.symbol}>
        {asset.symbol.slice(0, 2)}
      </span>
      <div>
        <strong>{asset.symbol}</strong>
        <small>{asset.name}</small>
      </div>
      <div>
        <strong>{asset.amount}</strong>
        <small>
          {asset.value} - {asset.change}
        </small>
      </div>
    </button>
  );
}
