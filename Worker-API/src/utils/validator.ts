import Ajv from "ajv";
import { inspect } from "util";

const ajv = new Ajv({ allErrors: true });

export const validatorFactory = (schema) => {
  const validate = ajv.compile(schema);

  const verify = <T>(data :T) => {
    const isValid = validate(data);
    if (isValid) {
      return data;
    }
    throw new Error(
      ajv.errorsText(
        validate.errors?.filter((err) => err.keyword !== "if"),
      )
    );
  };

  return { schema, verify };
};