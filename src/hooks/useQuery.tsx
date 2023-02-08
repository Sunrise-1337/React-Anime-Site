import React from "react";

import { useLocation } from "react-router-dom";

export default function useQuery() {
    const { search } = useLocation();
    console.log(search)
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
    console.log(new URLSearchParams(search))
}