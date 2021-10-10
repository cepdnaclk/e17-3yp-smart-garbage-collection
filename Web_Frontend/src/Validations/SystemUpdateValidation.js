import * as yup from 'yup';

export const systemSchema = yup.object().shape({
    lowBound: yup.number("Invalid input").integer("Invalid input").positive("Invalid input").min(10, 'Must be higher than 10').notRequired(true).nullable(true),
    highBound: yup.number("Invalid input").integer("Invalid input").positive("Invalid input").max(90, 'Must be lower than 90').notRequired(true).nullable(true),
});