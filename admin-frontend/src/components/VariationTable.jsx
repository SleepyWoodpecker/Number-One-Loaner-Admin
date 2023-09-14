import React from "react";

function VariationTable({ mainItem, variations, variationOrSizeHeader }) {
  const tableBorder = "border border-slate-400";
  return (
    <table className="w-full text-center table-fixed border-collapse border border-slate-500 text-center">
      <thead>
        <tr>
          <td className={`${tableBorder}`}>{variationOrSizeHeader}</td>
          <td className={`${tableBorder}`}>Current Stock</td>
          <td className={`${tableBorder}`}>Percentage</td>
        </tr>
      </thead>
      <tbody>
        {variations.map((variation) => {
          const stockPercentage = Math.round(
            (variation.quantity / variation.originalQuantity) * 100
          );

          let cellColoring;

          if (stockPercentage > 40) {
            cellColoring = "green";
          } else if (stockPercentage > 10) {
            cellColoring = "yellow";
          } else {
            cellColoring = "red";
          }
          return (
            <tr key={variation.id}>
              <td className={`${tableBorder} text-sm`}>
                {variation.name
                  .replace(`${mainItem.name} - (`, "")
                  .replace(")", "")}
              </td>
              <td className={`${tableBorder}`}>{variation.quantity}</td>
              <td className={`${tableBorder}`}>
                <div
                  className={`bg-${cellColoring}-200 rounded-md p-1 mx-5 my-2 flex justify-center`}
                >
                  {stockPercentage}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default VariationTable;
