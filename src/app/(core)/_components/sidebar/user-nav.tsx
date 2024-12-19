import { DropdownMenu } from "@/components/dropdown-menu";
import { Icon } from "@/components/icon";
import { Sheet } from "@/components/sheet";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { checkUser } from "@/lib/session";
import { UserCircle2 } from "lucide-react";
import { ProfileSheet } from "../profile-sheet";
import { SignOffDropdownItem } from "./sign-off-dropdown-item";

export const UserNav = async () => {
  const user = await checkUser();

  if (!user) {
    return null;
  }

  return (
    <Sheet.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className="h-10 w-full rounded-xl flex items-center transition-colors hover:bg-muted overflow-hidden"
            type="button"
            title="Profile"
          >
            <div className="min-w-10 h-10 grid place-content-center">
              <Icon
                src={UserCircle2}
                className="size-4"
              />
            </div>

            <span>Account</span>
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          className="w-56 mb-4"
          sideOffset={16}
          forceMount
          side="right"
        >
          <DropdownMenu.Label className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Group>
            <Sheet.Trigger asChild>
              <DropdownMenu.Item>Profile</DropdownMenu.Item>
            </Sheet.Trigger>

            <ThemeSwitcher />
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <SignOffDropdownItem />
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <ProfileSheet user={user} />
    </Sheet.Root>
  );
};
