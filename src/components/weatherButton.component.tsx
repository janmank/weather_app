import { Button } from "@mui/material";
import Link from "next/link";
import { Links } from "../constants";

interface IButton {
  link: Links;
  text?: string;
}

const WeatherButton: React.FC<IButton> = ({ link, text }) => {
  return (
    <Link href={link}>
      <Button variant="contained">{text ? text : "Check"}</Button>
    </Link>
  );
};

export default WeatherButton;
