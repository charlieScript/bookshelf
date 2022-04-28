import { User } from "../entities/users.entity";
import { connectionSource } from "../db/db";
import { ROLES } from "../entities/enums/category.enum";

// edit to run once
const createOwner = {
  email: 'admin@admin.com',
  password: 'Admin@12345',
  ROLE: ROLES.OWNER
}

const createUser = async (email: string, password: string) => {
  const user = connectionSource.getRepository(User).create({
    email, password, ROLE: ROLES.READER
  });
  const newUser = await connectionSource.getRepository(User).save(user)
  return newUser
};

const findUser = async (email: string) => {
  const user = await connectionSource.getRepository(User).findOne({ where: { email: email } });
  return user
};

export {
  createUser, findUser
};