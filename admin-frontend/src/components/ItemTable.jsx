import React from "react";

function ItemTable({ storeItems }) {
  const tableBorder = "border border-slate-400";

  return storeItems.length === 0 ? (
    ""
  ) : (
    <div className="mb-5">
      <table className="w-full text-center table-fixed border-collapse border border-slate-500 text-center">
        <thead>
          <tr className="bg-slate-200">
            <th className={tableBorder}>Item</th>
            <th className={tableBorder}>Quantity</th>
            <th className={tableBorder}>Stock Status</th>
          </tr>
        </thead>
        <tbody>
          {storeItems.items.map((storeItem) => {
            if (storeItem.name === "Standard Set") {
              return "";
            }
            const stockPercentage = Math.round(
              (storeItem.quantity / storeItem.originalQuantity) * 100
            );

            let tableColoring;

            if (stockPercentage > 40) {
              tableColoring = "green";
            } else if (stockPercentage > 10) {
              tableColoring = "yellow";
            } else {
              tableColoring = "red";
            }

            return (
              <tr key={storeItem.id}>
                <td className={tableBorder}>{storeItem.name}</td>
                <td className={tableBorder}>{storeItem.quantity}</td>
                <td className={`${tableBorder}`}>
                  <div className={`bg-${tableColoring}-200 rounded-md p-1 m-2`}>
                    {`${stockPercentage}%`}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ItemTable;
