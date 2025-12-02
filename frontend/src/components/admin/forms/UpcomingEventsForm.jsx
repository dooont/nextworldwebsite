import useCreateEditForm from "../../../hooks/useCreateEditForm.jsx";
import Form from "../../ui/Form.jsx";
import Input from "../../ui/Input.jsx";
import useEdit from "../../../hooks/useEdit.jsx";
import useCreate from "../../../hooks/useCreate.jsx";
import { createUpcomingEventWithImage, editUpcomingEventWithImage } from "../../../services/upcomingEventsService.jsx";
import Button from "../../ui/Button.jsx";
import ErrorMessage from "../../ui/ErrorMessage.jsx";
import Loading from "../../ui/Loading.jsx";
import { dateValidatorPattern, linkValidatorPattern } from "../../../validators/validators.js";
import LoadingSpinner from "../../ui/LoadingSpinner.jsx";
import { useState } from "react";

const defaultUpcomingEvents = {
  title: '',
  flyerUrl: '',
  ticketLink: '',
  imageFile: null,
  date: '',
}

export default function UpcomingEventsForm({ editingItem }) {
  const [currentFlyerLoaded, setCurrentFlyerLoaded] = useState(false);
  const { mutate: editMutationFn, isPending: isEditPending, error: editError } = useEdit({
    mutationFn: editUpcomingEventWithImage,
    queryKey: ['upcomingEvents']
  });

  const { mutate: createMutationFn, isPending: isCreatePending, error: createError } = useCreate({
    mutationFn: createUpcomingEventWithImage,
    queryKey: ['upcomingEvents']
  });

  const {
    register,
    submitForm,
    setValue,
    formState: { errors }
  } = useCreateEditForm({
    defaultFormValue: defaultUpcomingEvents,
    createMutationFn: createMutationFn,
    editMutationFn: editMutationFn,
    editingItem
  });

  return (
    <Form title={editingItem ? 'Edit Upcoming Event' : 'Create Upcoming Event'} onSubmit={submitForm} >
      <Input {...register('title', { required: 'Title is required' })} label="Title" />
      {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}

      <Input {...register('date', { required: 'Date is required', pattern: dateValidatorPattern })} type="date" label="Date" />
      {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}

      <Input {...register('ticketLink', { required: 'Ticket Link is required', pattern: linkValidatorPattern })} label="Ticket Link" />
      {errors.ticketLink && <ErrorMessage>{errors.ticketLink.message}</ErrorMessage>}

      {/*show current flyer when editing */}
      {editingItem && editingItem.flyerUrl && (
        <div className="mb-4 w-full">
          <p className="text-white text-sm mb-2">Current Flyer:</p>
          <div className="w-full flex justify-center items-center">
            {!currentFlyerLoaded && <LoadingSpinner className="h-20 w-auto" />}
            <img
              src={editingItem.flyerUrl}
              alt="Current flyer"
              className="max-w-xs"
              onLoad={() => { setCurrentFlyerLoaded(true) }}
            />
          </div>
        </div>
      )}

      <Input
        onChange={(e) => setValue('imageFile', e.target.files[0])}
        label={editingItem ? "New Flyer (optional)" : "Flyer"}
        type="file"
        accept="image/*"
        required={!editingItem} //only required when creating
      />

      <Button disabled={isCreatePending || isEditPending} type="submit">Submit</Button>
      {isCreatePending && <Loading />}
      {isEditPending && <Loading />}
      {createError && <ErrorMessage>Could not create upcoming event</ErrorMessage>}
      {editError && <ErrorMessage>Could not edit upcoming event</ErrorMessage>}
    </Form>
  );
}