export const adminSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      description: 'Username of the user',
    },
    password: {
      type: 'string',
      description: 'Password of the user',
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{6,8}$',
    },
    fullname: {
      type: 'string',
      description: 'Full name of the user',
    },
    phone_number: {
      type: 'string',
      description: 'Phone number of the user',
    },
    address: {
      type: 'string',
      description: 'Address of the user',
    },
  },
  required: [],
  additionalProperties: false,
};
