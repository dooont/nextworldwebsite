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

const defaultUpcomingEvents = {
  title: '',
  flyerUrl: '',
  ticketLink: '',
  date: '',
}

export default function UpcomingEventsForm({ editingItem }) {

  const editUpcomingEventMutation = useEdit({
    mutationFn: editUpcomingEventWithImage,
    queryKey: ['upcomingEvents']
  });

  const createUpcomingEventMutation = useCreate({
    mutationFn: createUpcomingEventWithImage,
    queryKey: ['upcomingEvents']
  });

  const {
    register,
    submitForm,
    setValue,
    formState: { errors },
    createState: { isCreatePending, isCreateError },
    editState: { isEditPending, isEditError }
  } = useCreateEditForm({
    defaultFormValue: defaultUpcomingEvents,
    createMutation: createUpcomingEventMutation,
    editMutation: editUpcomingEventMutation,
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
        <div className="mb-4">
          <p className="text-white text-sm mb-2">Current Flyer:</p>
          <img
            src={editingItem.flyerUrl}
            alt="Current flyer"
            className="max-w-xs border border-purple-900 rounded"
          />
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
      {isCreateError && <ErrorMessage>Could not create upcoming event</ErrorMessage>}
      {isEditError && <ErrorMessage>Could not edit upcoming event</ErrorMessage>}
      {editUpcomingEventMutation.error && <ErrorMessage>{editUpcomingEventMutation.error.message}</ErrorMessage>}
      {createUpcomingEventMutation.error && <ErrorMessage>{createUpcomingEventMutation.error.message}</ErrorMessage>}
    </Form>
  );
}