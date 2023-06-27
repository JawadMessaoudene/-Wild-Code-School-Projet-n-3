import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { notifyError } from "../../services/ToastNotificationService";
import APIService from "../../services/APIService";
import EditSvg from "../../components/svg/EditSvg";
import DeleteSvg from "../../components/svg/DeleteSvg";

export default function AdminPatientDetails() {
  const [patient, setPatient] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    APIService.get(`/users/${id}`)
      .then((response) => setPatient(response.data))
      .catch((error) => notifyError(`${error}"La requête a échoué"}`));
  }, []);

  if (!patient) return null;
  return (
    <main className="min-w-screen relative flex min-h-screen flex-col bg-slate-50 p-4 font-poppins lg:py-16 lg:pl-72 lg:pr-12">
      <div className="flex w-full items-center justify-between">
        <h3 className="mb-2 text-2xl font-semibold lg:mb-8 lg:text-4xl">
          Fiche du patient
        </h3>
      </div>
      <div className="flex flex-col justify-center lg:rounded-xl lg:bg-gray-200 lg:p-10 lg:shadow-xl">
        <div className="mb-2 flex w-full items-center justify-between">
          <h2 className="text-2xl font-bold lg:mb-8 lg:text-4xl ">
            {patient.firstname} {patient.lastname}
          </h2>
          <div className="ml-2 flex gap-2">
            <button
              type="button"
              className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-dark-0 hover:bg-violet-dark-0 disabled:border-slate-300 disabled:bg-slate-300 lg:p-2"
            >
              <EditSvg />
            </button>
            <button
              type="button"
              className="h-fit w-fit rounded-lg border-2 border-gray-300 bg-gray-300 p-1 text-sm text-slate-100 shadow-lg transition-all hover:border-violet-dark-0 hover:bg-violet-dark-0 disabled:border-slate-300 disabled:bg-slate-300 lg:p-2"
            >
              <DeleteSvg />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col">
            <div className="mb-2 text-xl font-bold  lg:text-2xl">Nom</div>
            <div className="mb-2 text-xl  font-semibold lg:h-14 lg:text-3xl">
              {patient.lastname}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-2 text-xl font-bold  lg:text-2xl">Prénom</div>
            <div className="mb-2 text-xl  font-semibold lg:h-14 lg:text-3xl ">
              {patient.firstname}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-2 text-xl font-bold  lg:text-2xl">
              Numéro de rue
            </div>
            <div className="mb-2 text-xl  font-semibold lg:h-14 lg:text-3xl">
              {patient.address_number}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-2 text-xl font-bold  lg:text-2xl">Adresse</div>
            <div className="mb-2 text-xl  font-semibold lg:h-14 lg:text-3xl">
              {patient.address_streetname}
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-2 text-xl font-bold  lg:text-2xl">Ville</div>
            <div className="mb-2 text-xl  font-semibold lg:h-14 lg:text-3xl">
              {patient.city}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-2 text-xl font-bold  lg:text-2xl">Email</div>
            <div className="mb-2 text-xl  font-semibold lg:h-14 lg:text-3xl">
              {patient.email}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-2 text-xl font-bold  lg:text-2xl">Téléphone</div>
            <div className="mb-2 text-xl  font-semibold lg:h-14 lg:text-3xl">
              {patient.phone_number}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer limit={1} />
    </main>
  );
}