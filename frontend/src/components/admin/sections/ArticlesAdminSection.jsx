import React, { useState, useEffect } from 'react';
import ItemsList from '../ItemsList.jsx';
import useArticles from '../../../hooks/useArticles.jsx';
import AdminSection from './AdminSection.jsx';
import ItemCard from '../ItemCard.jsx';
import H3 from '../../ui/H3.jsx';
import Anchor from '../../ui/Anchor.jsx';
import Loading from '../../ui/Loading.jsx';
import ErrorMessage from '../../ui/ErrorMessage.jsx';
import useDeleteArticle from '../../../hooks/useDeleteArticle.jsx';
import Form from '../../ui/Form.jsx';
import Input from '../../ui/Input.jsx';
import Button from '../../ui/Button.jsx';
import { useForm } from 'react-hook-form';
import useCreateArticle from '../../../hooks/useCreateArticle.jsx';
import useEditArticle from '../../../hooks/useEditArticle.jsx';


export default function ArticlesAdminSection() { 
  const { isLoading: isArticleLoading, isError: isFetchError, data: articles } = useArticles();
  const { isPending: isDeletePending, isError: isDeleteError, mutate: deleteArticle} = useDeleteArticle();
  const { isPending: isCreatePending, isError: isCreateError, mutate: createArticle} = useCreateArticle();
  const { isPending: isEditPending, isError: isEditError, mutate: editArticle} = useEditArticle();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [editingArticle, setEditingArticle] = useState(null);

  function onSubmit(data){
    if(editingArticle){
      editArticle({ id: editingArticle.id, article: data });
    } else {
      createArticle(data);
    }
  }

  function onEditClick(article){
    if(editingArticle?.id === article.id){
      setEditingArticle(null);
      reset({ title: '', source: '', date: '', description: '', link: '' });
    } else {
      setEditingArticle(article);
      reset(article);
    }
  }

  return (
    <>
      <AdminSection >
        <Form title={editingArticle ? 'Edit Article' : 'Create New Article'} onSubmit={handleSubmit(onSubmit)}>
          <Input label={"Title"} placeholder="Title" {...register("title", { required: 'Title is required' })}/>
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}

          <Input label={"Source"} placeholder="Source" {...register("source", { required: 'Source is required' })}/>
          {errors.source && <ErrorMessage>{errors.source.message}</ErrorMessage>}

          <Input type="date" label={"Date"} {...register("date", { required: 'Date is required', pattern: { value: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, message: "Date must be in YYYY-MM-DD format. This is a glitch, please report to developer" } })}/>
          {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}

          <Input type="textarea" rows="4" label={"Description"} placeholder="Description" {...register("description", { required: 'Description is required' })}/>
          {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}

          <Input label={"Link"} placeholder="https://example.com" {...register("link", { required: 'Link is required', pattern: { value: /^https?:\/\/.+\..+/, message: "Link must be in https://mylink.com format" } })}/>
          {errors.link && <ErrorMessage>{errors.link.message}</ErrorMessage>}

          <Button disabled={isCreatePending || isEditPending}>{editingArticle ? 'Edit Article' : 'Create Article'}</Button>
          {isCreateError && <ErrorMessage>Could not create article</ErrorMessage>}
          {isEditError && <ErrorMessage>Could not edit article</ErrorMessage>}
        </Form>

        <ItemsList itemsName="Articles">
          {isArticleLoading ? <Loading /> :
          isFetchError ? <ErrorMessage>Could not get articles</ErrorMessage> :
          articles.map((article) => {
            return (
              <ItemCard key={article.id} onDelete={() => deleteArticle(article.id)} onEdit={() => onEditClick(article)}>
                <H3>{article.title}</H3>
                <Anchor>{article.link}</Anchor>
              </ItemCard>
            )
          })}
          {isDeletePending && <Loading />}
          {isDeleteError && <ErrorMessage>Could not delete article</ErrorMessage>}
        </ItemsList>

      </AdminSection>
    </>
  );
}
