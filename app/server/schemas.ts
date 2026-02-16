import {z} from 'zod';

/**
 * Visit table schemas
 */
const VisitSchema = z.object({
  id: z.string(),
  reconId: z.string(),
  userId: z.string({
    message: 'Uh oh, something went wrong (no user). Please try again.',
  }),
  shopId: z.string().min(1, {
    message: 'A shop must be selected from the popup (shop ID).',
  }),
  shopName: z.string().min(1, {
    message: 'A shop must be selected from the popup (shop name).',
  }),
  size: z.coerce.number(),
  drink: z.string().min(1, {
    message: 'The drink must be filled in.',
  }),
  rating: z.coerce
    .number()
    .min(-1, {message: 'The rating must be between 0 and 5.'})
    .max(5, {message: 'The rating must be between 0 and 5.'}),
  price: z.union([
    z.literal('').transform(() => undefined),
    z.coerce.number().min(0, {
      message: 'The price must be greater than or equal to $0.',
    }),
  ]),
  date: z.string().optional(),
  notes: z.string().min(0).max(500, {
    message: 'The shop notes must be 500 characters or less.',
  }),
  orderType: z.enum(['TO GO', 'FOR HERE', 'BEANS'], {
    message: "The order type must be either 'TO GO', 'FOR HERE', or 'BEANS'.",
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
