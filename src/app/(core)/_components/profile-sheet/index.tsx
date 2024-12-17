import { Sheet } from "@/components/sheet";
import { UserAuth } from "@/models/user.model";
import { ProfileSheetForm } from "./profile-sheet-form";

export const ProfileSheet = async ({ user }: { user: UserAuth }) => {
  return (
    <Sheet.Content>
      <Sheet.Header>
        <Sheet.Title>Profile</Sheet.Title>
        <Sheet.Description>
          Manage your personal information here
        </Sheet.Description>
      </Sheet.Header>

      <ProfileSheetForm user={user} />
    </Sheet.Content>
  );
};
