import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface FormProps {
  initialValues: InputFields;
  onSubmit: (values: InputFields) => void;
  onClose: () => void;
  title: string;
  isOpen: boolean;
}

export interface InputFields {
  title: string;
  description: string;
  category: string;
}

export const NoteForm: React.FC<FormProps> = ({
  initialValues,
  onSubmit,
  onClose,
  title,
  isOpen,
}) => {
  const [inputFields, setInputFields] = useState<InputFields>({
    title: initialValues.title,
    description: initialValues.description,
    category: initialValues.category,
  });
  const [errors, setErrors] = useState<Partial<InputFields>>({});
  const [isModalOpen, setIsModalOpen] = useState(true);

  const cancelButtonRef = useRef(null);
  const dispatch: AppDispatch = useDispatch();

  const validateValues = (inputValues: InputFields) => {
    const errors: Partial<InputFields> = {};
    if (inputValues.title.length < 5) {
      errors.title = "Title is too short";
    }
    if (inputValues.description.length < 8) {
      errors.description = "Description is too short";
    }
    return errors;
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputFields({ ...inputFields, title: e.target.value.trim() });
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setInputFields({ ...inputFields, category: e.target.value });
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputFields({ ...inputFields, description: e.target.value.trim() });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateValues(inputFields);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      onSubmit(inputFields);
      setIsModalOpen(false);
      onClose();
    }
  };

  const handleCloseModal = () => {
    const errors = validateValues(inputFields);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      onSubmit(initialValues);
    }
    setIsModalOpen(false);
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setIsModalOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h2"
                        className="text-xl text-center font-semibold leading-6 text-gray-900"
                      >
                        {title}
                      </Dialog.Title>
                      <form id="editNoteModal" onSubmit={handleSubmit}>
                        <div>
                          <div className="mt-2">
                            <label
                              htmlFor="noteTitle"
                              className="block text-md font-medium leading-6 text-gray-900 py-2 mt-4"
                            >
                              Note Title:
                            </label>
                            <input
                              type="text"
                              id="noteTitle"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                              value={inputFields.title}
                              onChange={handleTitleChange}
                            />
                            {errors.title ? (
                              <p className="text-red-500 py-2">
                                Title should be at least 5 characters long
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="category"
                            className="block text-md font-medium leading-6 text-gray-900 py-2 mt-4"
                          >
                            Category
                          </label>
                          <select
                            id="category"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                            value={inputFields.category}
                            onChange={handleCategoryChange}
                          >
                            <option value="Task">Task</option>
                            <option value="Random Thought">
                              Random Thought
                            </option>
                            <option value="Idea">Idea</option>
                            <option value="Quote">Quote</option>
                          </select>
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor="noteDescription"
                            className="block text-md font-medium leading-6 text-gray-900 py-2 mt-4"
                          >
                            Description:
                          </label>
                          <textarea
                            id="noteDescription"
                            className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6 ${
                              errors.description ? "border-red-500" : ""
                            }`}
                            value={inputFields.description}
                            onChange={handleDescriptionChange}
                          ></textarea>
                          {errors.description ? (
                            <p className="text-red-500 py-2">
                              Description should be at least 8 characters long
                            </p>
                          ) : null}
                        </div>

                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center mt-4">
                          <button
                            type="button"
                            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            onClick={handleCloseModal}
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
