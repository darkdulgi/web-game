import { DependencyList, useEffect } from "react";

export default function usePreload(assetList: string[], depList: DependencyList) {
  useEffect(() => {
    assetList.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, depList);
}
