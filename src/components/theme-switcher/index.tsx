"use client";

import { uppercaseFirstLetter } from "@/lib/utils";
import { useTheme } from "next-themes";
import { DropdownMenu } from "../dropdown-menu";
import { themes } from "./consts";

export const ThemeSwitcher = () => {
  const { theme: selectedTheme, setTheme } = useTheme();

  return (
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger>Select theme</DropdownMenu.SubTrigger>
      <DropdownMenu.Portal>
        <DropdownMenu.SubContent
          className="mb-4"
          sideOffset={8}
        >
          <DropdownMenu.RadioGroup
            value={selectedTheme}
            onValueChange={(value) => setTheme(value)}
          >
            {themes.map((theme) => (
              <DropdownMenu.RadioItem
                key={theme}
                value={theme}
              >
                {uppercaseFirstLetter(theme)}
              </DropdownMenu.RadioItem>
            ))}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.SubContent>
      </DropdownMenu.Portal>
    </DropdownMenu.Sub>
  );
};
