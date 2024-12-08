import { usersTable } from "@/db/schemas";
import { User, UserInsert } from "@/models/user.model";
import { createService } from "../_base";

export const userService = createService<User, UserInsert>(usersTable);
