import Form from "../../ui/Form.jsx";
import { useState } from "react";
import Input from "../../ui/Input.jsx";
import Select from "../../ui/Select.jsx";
import useCreateEditForm from "../../../hooks/useCreateEditForm.jsx";
import { createMemberWithImage, editMemberWithImage } from "../../../services/membersService.js";
import useCreate from "../../../hooks/useCreate.jsx";
import useEdit from '../../../hooks/useEdit.jsx';
import Button from "../../ui/Button.jsx";
import Loading from "../../ui/Loading.jsx";
import ErrorMessage from "../../ui/ErrorMessage.jsx";
import LoadingSpinner from "../../ui/LoadingSpinner.jsx";

const defaultFormValue = {
  firstName: '',
  lastName: '',
  role: '',
  photoUrl: '',
  description: '',
  funFact: '',
  type: 'other',
  photoFile: null
}

export default function MembersForm({ editingItem }) {
  const { mutate: createMutationFn, isPending: isCreatePending, error: createError } = useCreate({ mutationFn: createMemberWithImage, queryKey: ['members'] });
  const { mutate: editMutationFn, isPending: isEditPending, error: editError } = useEdit({ mutationFn: editMemberWithImage, queryKey: ['members'] });

  const [currentPhotoLoaded, setCurrentPhotoLoaded] = useState(false);

  const { 
    submitForm,
    register,
    setValue,
    formState: { errors },
  } = useCreateEditForm({
    defaultFormValue,
    editingItem,
    createMutationFn: createMutationFn,
    editMutationFn: editMutationFn
  });

  return (
    <Form onSubmit={submitForm} title={editingItem ? 'Edit Member' : 'Add Member'}>
      <Input {...register('firstName', {required: 'First Name is required'})} label="First Name"/>
      {errors.firstName && <ErrorMessage>{errors.firstName.message}</ErrorMessage>}
      
      <Input {...register('lastName', {required: 'Last Name'})} label="Last Name"/>
      {errors.lastName && <ErrorMessage>{errors.lastName.message}</ErrorMessage>}
      
      <Input {...register('role', {required: 'Role is required'})} label="Role (CEO, Photographer, etc)"/>
      {errors.role && <ErrorMessage>{errors.role.message}</ErrorMessage>}
      
      <Input {...register('description')} type="textarea" rows="4" label="Description"/>
      {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
      
      <Input {...register('funFact', {required: 'Fun Fact is required'})} type="textarea" rows="4" label="Fun Fact"/>
      {errors.funFact && <ErrorMessage>{errors.funFact.message}</ErrorMessage>}
      
      <Select
        {...register('type', {required: 'Member Type is required'})} 
        label="Member Type" 
        options={[
          { value: 'exec', label: 'Executive' },
          { value: 'other', label: 'Other (Major Contributors)' }
        ]}
      />
      {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
      <Input 
      onChange={(e) => setValue('photoFile', e.target.files[0])}
      accept="image/*"
      required={!editingItem} type="file" label="Photo"/>

      {/*show current member photo when editing */}
      {editingItem && editingItem.photoUrl && (
        <div className="mb-4 w-full">
          <p className="text-white text-sm mb-2">Current Photo:</p>
          <div className="w-full flex justify-center items-center">
            {!currentPhotoLoaded && <LoadingSpinner className="h-20 w-auto" />}
            <img
              src={editingItem.photoUrl}
              alt="Current photo"
              className="max-w-xs"
              onLoad={() => { setCurrentPhotoLoaded(true) }}
            />
          </div>
        </div>
      )}
      
      <Button disabled={isCreatePending || isEditPending} type="submit">Submit</Button>
      {isCreatePending && <Loading />}
      {isEditPending && <Loading />}
      {createError && <ErrorMessage>Could not create member</ErrorMessage>}
      {editError && <ErrorMessage>Could not edit member</ErrorMessage>}
    </Form>
  );
}