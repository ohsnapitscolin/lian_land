import { useEffect } from "react";
import { navigate } from "gatsby";

export default function FourOhFour() {
  useEffect(() => {
    navigate("/");
  }, []);

  return null;
}
