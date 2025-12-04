import Form from "../../ui/Form.jsx";
import { useState } from "react";
import Input from "../../ui/Input.jsx";
import Select from "../../ui/Select.jsx";
import useCreateEditForm from "../../../hooks/useCreateEditForm.jsx";
import { createMemberWithImage, updateMemberById } from "../../../services/membersService.js";
import useCreate from "../../../hooks/useCreate.jsx";
import useEdit from '../../../hooks/useEdit.jsx';
import Button from "../../ui/Button.jsx";
import Loading from "../../ui/Loading.jsx";
import ErrorMessage from "../../ui/ErrorMessage.jsx";

const defaultFormValue = {
  firstName: '',
  lastName: '',
  role: '',
  photoUrl: '',
  description: '',
  funFact: '',
  type: 'other'
}

export default function MembersForm({ editingItem }) {
  const { mutate: createMutationFn, isPending: isCreatePending, error: createError } = useCreate({ mutationFn: createMemberWithImage, queryKey: ['members'] });
  const { mutate: editMutationFn, isPending: isEditPending, error: editError } = useEdit({ mutationFn: updateMemberById, queryKey: ['articles'] });

  function tempSubmitForm(data) {
    console.log(data);
  }

  const { 
    submitForm,
    register,
    setValue,
    formState: { errors },
  } = useCreateEditForm({
    defaultFormValue,
    editingItem,
    createMutationFn: createMutationFn,
    editMutation: editMutationFn
  });

  return (
    <Form onSubmit={submitForm}>
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
      
      <Button disabled={isCreatePending || isEditPending} type="submit">Submit</Button>
      {isCreatePending && <Loading />}
      {isEditPending && <Loading />}
      {createError && <ErrorMessage>Could not create member</ErrorMessage>}
      {createError && <ErrorMessage>{createError.message}</ErrorMessage>}
      {editError && <ErrorMessage>Could not edit member</ErrorMessage>}

    </Form>
  );
}