import {z} from 'zod';

/**
 * Visit table schemas
 */
const VisitSchema = z.object({
  id: z.string(),
  reconId: z.string(),
  userId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  shopId: z.string().min(1),
  shopName: z.string().min(1),
  size: z.coerce.number(),
  drink: z.string().min(1),
  rating: z.coerce
    .number()
    .min(-1, {message: 'Please enter a valid rating between -1 and 5'})
    .max(5, {message: 'Please enter a valid rating between -1 and 5'}),
  price: z.coerce.number().min(0, {
    message: 'Please enter a valid price greater than or equal to $0',
  }),
  date: z.ostring(),
  notes: z.ostring(),
  orderType: z.enum(['TO GO', 'FOR HERE'], {
    invalid_type_error: 'Please select an order type.....',
  }),
});

export const CreateVisit = VisitSchema.omit({id: true, userId: true});

export const UpdateVisit = VisitSchema.omit({userId: true});

/**
 * User table schema
 */
const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});

export const AddUser = UserSchema.omit({id: true});
