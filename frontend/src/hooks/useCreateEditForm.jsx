import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";

/**
 * @param {Object} params.defaultFormValue - Should include all fields of object with empty fields
 * @param {Object} params.createMutation - The mutation that will be used to create a new item. Will call upon the mutations mutate function. This implementation should use the custom hooks, which should be provided the appropriate service depending on item type
 * @param {Object} params.editMutation - The mutation that will be used to edit an existing item. Will call upon the mutations mutate function. This implementation should use the custom hooks in the hooks folder, which should be provided the appropriate service depending on item type
 * @param {Object} params.editingItem - The item that is being edited. If this is provided, the form will be in edit mode
 * @returns {Object}
 * @property {Function} register - Register function from useForm
 * @property {Function} submitForm - Submit function from useForm
 * @property {Object} formState - Form state from useForm
 * @property {Object} createState - Object containing create mutation state. Destructure for isCreatePending and isCreateError from createMutation
 * @property {Object} editState - Object containing edit mutation state. Destrucure for isEditPending and isEditError from editMutation
 */

export default function useCreateEditForm({ defaultFormValue, createMutation, editMutation, editingItem }) {
  const { register, handleSubmit, formState, reset } = useForm({ defaultValues: defaultFormValue }); //validates form

  useEffect(() => { //set default form valuesc
    if (editingItem) {
      reset(editingItem);
    } else {
      reset(defaultFormValue);
    }
  }, [editingItem]);

  function submitForm(data) {
    if (editingItem) {
      editMutation.mutate({ id: editingItem.id, data });
    } else {
      createMutation.mutate(data);
    }
    reset(defaultFormValue);
  }

  return {
    register,
    submitForm: handleSubmit(submitForm),
    formState,
    createState: {
      isCreatePending: createMutation.isPending,
      isCreateError: createMutation.isError
    },
    editState: {
      isEditPending: editMutation.isPending,
      isEditError: editMutation.isError
    }
  }
}