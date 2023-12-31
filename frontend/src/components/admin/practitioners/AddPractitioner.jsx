import { useState } from "react";
import PropTypes from "prop-types";
import { practitionerSchema } from "../../../services/validators";
import notifySuccess, {
  notifyError,
} from "../../../services/ToastNotificationService";
import APIService from "../../../services/APIService";
import FormError from "../../FormError";

export default function AddPractitioner({ setIsShow }) {
  const [surname, setSurname] = useState({
    surname: "",
  });
  const [errors, setErrors] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (practitionerSchema.isValidSync(surname)) {
      try {
        const res = await APIService.post(`/practitioners`, surname);
        if (res) {
          notifySuccess("Le praticien a été ajouté.");
          setIsShow({ modalAdd: false });
        } else throw new Error();
      } catch (err) {
        if (err.request.status === 401) {
          notifyError(`${err.request.status} : La requete a échouée`);
        }
      }
    }
  };

  const handleChange = async (e) => {
    setSurname({
      ...surname,
      [e.target.name]: `Dr ${e.target.value}`,
    });
    try {
      const isValid = await practitionerSchema.validate(surname, {
        abortEarly: false,
      });
      if (isValid) {
        setErrors(null);
      }
      throw new Error();
    } catch (err) {
      setErrors(err.errors);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="self-start px-4 text-lg font-semibold lg:px-8 lg:text-xl">
        Un nouveau praticien ?
      </h1>
      <form
        action="addPractitioner"
        className="gap-4 space-y-4 p-4 lg:p-8"
        onSubmit={handleSubmit}
      >
        {errors && <FormError errors={errors} />}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-base">
            Nom du praticien
          </label>
          <input
            type="text"
            name="surname"
            id="praticien_id"
            placeholder="Nom du praticien"
            required=""
            className="rounded-lg p-2 text-sm placeholder:italic placeholder:opacity-50"
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            disabled={!practitionerSchema.isValidSync(surname)}
            type="submit"
            className="mb-4 h-fit w-fit rounded-lg border-2 border-violet-dark-0 bg-violet-dark-0 px-6 py-3 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-light-0 hover:bg-violet-light-0 disabled:border-slate-300 disabled:bg-slate-300"
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
}

AddPractitioner.propTypes = {
  setIsShow: PropTypes.func.isRequired,
};
