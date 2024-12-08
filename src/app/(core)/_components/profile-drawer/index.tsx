import { Sheet } from "@/components/sheet";
import { UserAuth } from "@/models/user.model";
import { ProfileDrawerForm } from "./profile-drawer-form";

export const ProfileDrawer = async ({ user }: { user: UserAuth }) => {
  return (
    <Sheet.Content>
      <Sheet.Header>
        <Sheet.Title>Profile</Sheet.Title>
        <Sheet.Description>
          Manage your personal information here
        </Sheet.Description>
      </Sheet.Header>

      <ProfileDrawerForm user={user} />
    </Sheet.Content>
  );
};
