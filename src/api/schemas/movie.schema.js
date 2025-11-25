import Yup from "yup";

export const newMovieSchema = Yup.object().shape({
  name: Yup.string().required("Name required"),
  genre: Yup.string().required("Genre required"),
  public: Yup.boolean().default(false),
  img: Yup.string().url("Invalid image URL").required("Image URL required"),
  year: Yup.number()
    .min(1800, "Year too old, must be >= 1800")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .required("Year required"),
});
