import { DropdownMenu } from "@/components/dropdown-menu";
import { signOff } from "./actions";

export const SignOffDropdownItem = () => {
  return <DropdownMenu.Item onSelect={signOff}>Log out</DropdownMenu.Item>;
};
