import React, { useEffect, useState } from "react";
import { validateQuantity } from "../Functions";
import VariationTable from "./VariationTable";
import AssociatedRequests from "./AssociatedRequests";
import StoreItemEditingBox from "./StoreItemEditingBox";
import { checkUserLogin } from "../services";

function StoreItemVariationDisplay({
  mainItem,
  setMainItemQuantity,
  setMainItemOriginalQuantity,
  variations,
  setVariationQuantity,
  setVariationOriginalQuantity,
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    const checkLogin = async () => {
      const loginStatus = await checkUserLogin();
      setIsLoggedIn(loginStatus);
    };
    checkLogin();
  }, []);
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

  const hasSize = mainItem.sizes.length > 0;

  let variationOrSizeHeader = "";
  if (hasSize) {
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
      <table className="w-full text-center table-fixed border-collapse border border-slate-500  mt-2">
        <tbody>
          <tr>
            <td className={`${tableBorder}`}>Current Stock</td>
            <td className={`${tableBorder}`}>Total Stock</td>
            <td className={`${tableBorder}`}>Percentage</td>
          </tr>
          <tr>
            <td className={`${tableBorder}`}>
              {isLoggedIn?.ok && !hasSize ? (
                <StoreItemEditingBox
                  item={mainItem}
                  setQuantity={setMainItemQuantity}
                  quantity={mainItem.quantity}
                  width="14"
                  field="quantity"
                  isLoggedIn={isLoggedIn}
                />
              ) : (
                <p>{mainItem.quantity}</p>
              )}
            </td>
            <td className={`${tableBorder}`}>
              {isLoggedIn?.ok && !hasSize ? (
                <StoreItemEditingBox
                  item={mainItem}
                  setQuantity={setMainItemOriginalQuantity}
                  quantity={mainItem.originalQuantity}
                  width="14"
                  field="originalQuantity"
                />
              ) : (
                <p>{mainItem.originalQuantity}</p>
              )}
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
            setVariationQuantity={setVariationQuantity}
            setVariationOriginalQuantity={setVariationOriginalQuantity}
            variationOrSizeHeader={variationOrSizeHeader}
            isLoggedIn={isLoggedIn}
            setMainItemQuantity={setMainItemQuantity}
            setMainItemOriginalQuantity={setMainItemOriginalQuantity}
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
