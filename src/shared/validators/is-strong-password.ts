import { registerDecorator } from 'class-validator';
import validator from 'validator';

export function IsStrongPassword() {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['password'],
      options: { message: 'Weak password.' },
      validator: {
        validate(value: string) {
          return validator.isStrongPassword(value, {
            minLength: 8,
            minSymbols: 1,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
          });
        }
      }
    });
  };
}
