import { BcryptHasherService } from "@/modules/auth/domain/services/bcrypt-hasher.service";
import { UserMapper } from "@/modules/user/application/mappers/user.mapper";
import { PrismaUserRepository } from "@/modules/user/infrastructure/database/prisma-user.repository";
import { BadRequestError, ConflictError, Either, left, right } from "@repo/common";
import { RegisterDto, RegisterProjectionDto } from "../dto/auth.dto";
import { RegisterFactory } from "../factories/register.factory";
import { UserFactory } from "../factories/user.factory";
import { PrismaUserProfileRepository } from "./../../../user/infrastructure/database/prisma-user-profile.repository";

export type RegisterUseCaseResponse = Either<BadRequestError, RegisterProjectionDto>;

export class RegisterUseCase {
  static inject = [BcryptHasherService, PrismaUserRepository];

  constructor(
    private readonly prismaUserRepository: PrismaUserRepository,
    private readonly prismaUserProfileRepository: PrismaUserProfileRepository,
    private readonly bcryptHasherService: BcryptHasherService,
  ) {}

  async execute(input: RegisterDto): Promise<RegisterUseCaseResponse> {
    const existingUser = await this.prismaUserRepository.findActiveByEmail(input.email);

    if (existingUser) {
      return left(
        new ConflictError({
          fieldName: "e-mail",
          message: "Já existe um usuário cadastrado com este e-mail.",
        }),
      );
    }

    const passwordHash = await this.bcryptHasherService.hash(input.password);

    const newRegister = RegisterFactory.build({
      email: input.email,
      password: passwordHash,
    });

    const userEntity = UserFactory.buildUserRegister({
      email: newRegister.email,
      passwordHash: newRegister.password,
    });

    const createdUser = await this.prismaUserRepository.create(userEntity);

    return right(UserMapper.toProjection(createdUser));
  }
}
