import { usersTable } from "@/db/schemas/users.schema";
import { seed } from "@/lib/seed";
import { User, UserInsert } from "@/models/user.model";
import { createService } from "../_base";

const baseService = createService<User, UserInsert>(usersTable);

export const userService = {
  ...baseService,
  create: async (user: UserInsert) => {
    const newUser = await baseService.create(user);
    await seed(newUser.id);

    return newUser;
  },
};
