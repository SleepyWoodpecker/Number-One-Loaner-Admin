import React from "react";
import { validateQuantity } from "../Functions";
import VariationTable from "./VariationTable";
import AssociatedRequests from "./AssociatedRequests";
import StoreItemEditingBox from "./StoreItemEditingBox";

function StoreItemVariationDisplay({
  mainItem,
  setMainItemQuantity,
  variations,
  setVariations,
}) {
  const stockPercentage = Math.round(
    (mainItem.quantity / mainItem.originalQuantity) * 100
  );

  let cellColoring;

  if (stockPercentage > 40) {
    cellColoring = "green";
  } else if (stockPercentage > 10) {
    cellColoring = "yellow";
  } else {
    cellColoring = "red";
  }

  let variationOrSizeHeader = "";
  if (mainItem.sizes.length > 0) {
    if (validateQuantity(mainItem.sizes[0])) {
      variationOrSizeHeader = "Sizes";
    } else {
      variationOrSizeHeader = "Variations";
    }
  }

  const tableBorder = "border border-slate-400";
  return (
    <div className="flex flex-col items-center">
      <img
        src={mainItem.imgUrl}
        className="h-48 w-48 rounded-xl"
        alt={mainItem.name}
      ></img>
      <p className="mt-2 text-lg font-semibold">{mainItem.name}</p>
      <table className="w-full text-center table-fixed border-collapse border border-slate-500 text-center mt-2">
        <tbody>
          <tr>
            <td className={`${tableBorder}`}>Current Stock</td>
            <td className={`${tableBorder}`}>Percentage</td>
          </tr>
          <tr>
            <td className={`${tableBorder}`}>
              <StoreItemEditingBox
                item={mainItem}
                setQuantity={setMainItemQuantity}
              />
            </td>
            <td className={`${tableBorder}`}>
              <div
                className={`bg-${cellColoring}-200 rounded-md p-1 mx-5 my-2 flex justify-center`}
              >
                {`${stockPercentage}%`}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {variationOrSizeHeader !== "" ? (
        <div className="mt-4">
          <VariationTable
            mainItem={mainItem}
            variations={variations}
            setVariations={setVariations}
            variationOrSizeHeader={variationOrSizeHeader}
          />
        </div>
      ) : (
        ""
      )}

      <h1 className="mt-4 font-semibold">Requests with {mainItem.name}</h1>
      <AssociatedRequests
        variationOrSizeHeader={variationOrSizeHeader}
        mainItem={mainItem}
      />
    </div>
  );
}

export default StoreItemVariationDisplay;
