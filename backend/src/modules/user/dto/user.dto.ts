import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export function Match<T>(
  property: keyof T,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'Match',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return value === relatedValue;
        },

        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          return `${propertyName} must match ${relatedPropertyName} exactly`;
        },
      },
    });
  };
}

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(5)
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @Match('password')
  confirmPassword: string;

  @IsString()
  fullName: string;
}

export class UpdateInformationDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  newPassword?: string;
}
