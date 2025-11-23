import { useForm } from 'react-hook-form';
import useCreate from '../../../hooks/useCreate.jsx';
import { createArticle } from '../../../services/articlesService.jsx';
import Form from '../../ui/Form.jsx';
import Input from '../../ui/Input.jsx';
import Button from '../../ui/Button.jsx';
import ErrorMessage from '../../ui/ErrorMessage.jsx';
import Loading from '../../ui/Loading.jsx';
import useEdit from '../../../hooks/useEdit.jsx';
import { editArticle } from '../../../services/articlesService.jsx';
import useCreateEditForm from '../../../hooks/useCreateEditForm.jsx';
import { useEffect } from 'react';

const defaultFormValue = {
  title: '',
  source: '',
  date: '',
  description: '',
  link: ''
}

export default function ArticlesForm({ editingItem }) {

  const createMutation = useCreate({ mutationFn: createArticle, queryKey: ['articles'] });
  const editMutation = useEdit({ mutationFn: editArticle, queryKey: ['articles'] });

  const { submitForm,
    register,
    formState: { errors },
    createState: { isCreatePending, isCreateError },
    editState: { isEditPending, isEditError }
  } = useCreateEditForm({
    defaultFormValue,
    editingItem,
    createMutation,
    editMutation
  });

  return (
    <Form title={editingItem ? 'Edit Article' : 'Create New Article'} onSubmit={submitForm}>
      <Input label={"Title"} placeholder="Title" {...register("title", { required: 'Title is required' })} />
      {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}

      <Input label={"Source"} placeholder="Source" {...register("source", { required: 'Source is required' })} />
      {errors.source && <ErrorMessage>{errors.source.message}</ErrorMessage>}

      <Input type="date" label={"Date"} {...register("date", { required: 'Date is required', pattern: { value: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, message: "Date must be in YYYY-MM-DD format. This is a glitch, please report to developer" } })} />
      {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}

      <Input type="textarea" rows="4" label={"Description"} placeholder="Description" {...register("description", { required: 'Description is required' })} />
      {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

      <Input label={"Link"} placeholder="https://example.com" {...register("link", { required: 'Link is required', pattern: { value: /^https?:\/\/.+\..+/, message: "Link must be in https://mylink.com format" } })} />
      {errors.link && <ErrorMessage>{errors.link.message}</ErrorMessage>}

      <Button disabled={isCreatePending || isEditPending}>{editingItem ? 'Edit Article' : 'Create Article'}</Button>
      {isCreatePending && <Loading />}
      {isEditPending && <Loading />}
      {isCreateError && <ErrorMessage>Could not create article</ErrorMessage>}
      {isEditError && <ErrorMessage>Could not edit article</ErrorMessage>}
    </Form>
  )
}