import { usersTable } from "@/db/schemas/users.schema";
import { User, UserInsert } from "@/models/user.model";
import { createService } from "../_base";
import { seedNewUser } from "./seed-new-user";

const baseService = createService<User, UserInsert>(usersTable);

export const userService = {
  ...baseService,
  create: async (user: UserInsert) => {
    const newUser = await baseService.create(user);
    await seedNewUser(newUser.id);

    return newUser;
  },
};
