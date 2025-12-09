import { useState } from "react";
import useCreateEditForm from "../../../hooks/useCreateEditForm.jsx";
import useCreate from "../../../hooks/useCreate.jsx";
import useEdit from "../../../hooks/useEdit.jsx";
import { createPastEventWithImage, editPastEventWithImage } from "../../../services/pastEventsService.js";
import Form from "../../ui/Form.jsx";
import Input from "../../ui/Input.jsx";
import Button from "../../ui/Button.jsx";
import ErrorMessage from "../../ui/ErrorMessage.jsx";
import Loading from "../../ui/Loading.jsx";
import LoadingSpinner from "../../ui/LoadingSpinner.jsx";
import { dateValidatorPattern } from "../../../validators/validators.js";
import { useFieldArray } from "react-hook-form";

const defaultPastEvent = {
  title: '',
  flyerUrl: '',
  imageFile: null,
  date: '',
  description: '',
  place: '',
  artists: [{ name: '', contact: '' }], // Start with one empty artist
}

export default function PastEventsForm({ editingItem }) {
  const [currentFlyerLoaded, setCurrentFlyerLoaded] = useState(false);

  const { mutate: editMutationFn, isPending: isEditPending, error: editError } = useEdit({
    mutationFn: editPastEventWithImage,
    queryKey: ['pastEvents']
  });

  const { mutate: createMutationFn, isPending: isCreatePending, error: createError } = useCreate({
    mutationFn: createPastEventWithImage,
    queryKey: ['pastEvents']
  });

  const {
    register,
    submitForm,
    setValue,
    formState: { errors },
    control
  } = useCreateEditForm({
    defaultFormValue: defaultPastEvent,
    createMutationFn: createMutationFn,
    editMutationFn: editMutationFn,
    editingItem
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'artists'
  });


  return (
    <Form title={editingItem ? 'Edit Past Event' : 'Create Past Event'} onSubmit={submitForm}>
      <Input {...register('title', { required: 'Title is required' })} label="Title" />
      {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}

      <Input {...register('date', { required: 'Date is required', pattern: dateValidatorPattern })} type="date" label="Date" />
      {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}

      <Input {...register('place', { required: 'Place is required' })} label="Place" />
      {errors.place && <ErrorMessage>{errors.place.message}</ErrorMessage>}

      <Input {...register('description', { required: 'Description is required'})} type="textarea" rows="4" label="Description" />
      {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

      {fields.map((field, index) => {
        return(
          <div key={field.id}>
            <Input label={`Artist ${index + 1}`} {...register(`artists.${index}.name`, { required: 'Name is required' })} placeholder="Artist Name"/>
            <Input {...register(`artists.${index}.contact`, { required: 'Contact is required' })} placeholder="Artist Handle (e.g. nxtworldco)"/>
            { errors?.artists?.[index].name && <ErrorMessage>{errors.artists?.[index]?.name?.message}</ErrorMessage>}
            { errors?.artists?.[index].contact && <ErrorMessage>{errors.artists?.[index]?.contact?.message}</ErrorMessage>}
            <Button type="button" onClick={() => remove(index)} className="bg-red-600 hover:bg-red-700 max-w-1/4 !py-0 !text-sm mt-2 max-h-10">Remove Artist</Button>
          </div>
        ) 
      })}

      <Button type="button" onClick={() => append({ name: '', contact: '' })}>Add Artist</Button>


      {/* Show current flyer when editing */}
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
      {createError && <ErrorMessage>Could not create past event</ErrorMessage>}
      {editError && <ErrorMessage>Could not edit past event</ErrorMessage>}
    </Form>
  );
}
