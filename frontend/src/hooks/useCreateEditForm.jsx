import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";

/**
 * Calls upon the createMutation or editMutation based on whether editingItem is provided
 * @param {Object} params.defaultFormValue - Should include all fields of object with empty fields
 * @param {Object} params.createMutationFn - The function that will be used to create a new item. Will call upon the mutations mutate function. Function should take an object {id, data}
 * @param {Object} params.editMutationFn - The function that will be used to edit an existing item. Will call upon the mutations mutate function. Function should take an object {id, data}
 * @param {Object} params.editingItem - The item that is being edited. If this is provided, the form will call the editMutation.mutate function
 * @returns {Object}
 * @property {Function} register - Register function from useForm
 * @property {Function} submitForm - Submit function from useForm
 * @property {Object} formState - Form state from useForm
 */

export default function useCreateEditForm({ defaultFormValue, createMutationFn, editMutationFn, editingItem }) {
  const { register, handleSubmit, formState, setValue, reset } = useForm({ defaultValues: defaultFormValue });

  useEffect(() => { //set default form values
    if (editingItem) {
      reset(editingItem);
    } else {
      reset(defaultFormValue);
    }
  }, [editingItem, reset]);

  function submitForm(data) {
    if (editingItem) {
      editMutationFn({ id: editingItem.id, data: data });
    } else {
      createMutationFn(data);
    }
    reset(defaultFormValue);
  }

  return {
    register,
    submitForm: handleSubmit(submitForm),
    setValue,
    formState
  }
}