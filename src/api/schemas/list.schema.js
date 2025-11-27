import Yup from "yup";

export const newListSchema = Yup.object()
  .shape({
    name: Yup.string().required("Name required"),
  })
  .noUnknown(true, "Unkown keys are not allowed");
