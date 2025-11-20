import {useForm} from 'react-hook-form';
import ErrorMessage from '../ErrorMessage.jsx';
import useCreateArticle from '../../hooks/useCreateArticle.jsx';
import useEditArticle from '../../hooks/useEditArticle.jsx';
import { useEffect } from 'react';
import Loading from '../Loading.jsx';

export default function ArticlesForm( {article} ){

  const {register, handleSubmit, formState: { errors }, reset } = useForm();
  const { isPending: isCreatePending, isError: isCreateError, mutate: createArticle } = useCreateArticle();
  const { isPending: isEditPending, isError: isEditError, mutate: editArticle } = useEditArticle();

  useEffect(() => {
    if(article){
      reset({
        title: article.title,
        source: article.source,
        date: article.date.split('T')[0],
        description: article.description,
        link: article.link
      });
    }else{
      reset({
        title: '',
        source: '',
        date: '',
        description: '',
        link: ''
      });
    }
  }, [article]);

  function onSubmit(articleToSubmit){
    if(article){
      editArticle({ id: article.id, article: articleToSubmit });
    } else {
      createArticle(articleToSubmit);
    }
  }
  
  return(
    <div className="bg-gray-900 rounded-lg shadow-2xl p-8 fade-in delay-200">
            <h2 className="text-3xl font-bold text-white racing-sans-one-regular mb-6">
              {article ? 'Edit Article' : 'Create New Article'}
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* title */}
              <div>
                <label 
                  htmlFor="title" 
                  className="block text-white oswald-400 text-sm font-semibold mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  {...register("title", {
                    required: "Title is required"
                  })}
                  className="w-full px-4 py-3 bg-black border border-purple-900 rounded-lg text-white oswald-400 focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700/50 transition"
                  placeholder="Article title"
                />
                {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
              </div>

              {/* source */}
              <div>
                <label 
                  htmlFor="source" 
                  className="block text-white oswald-400 text-sm font-semibold mb-2"
                >
                  Source
                </label>
                <input
                  type="text"
                  {...register("source", {
                    required: 'Source is required'
                  })}
                  className="w-full px-4 py-3 bg-black border border-purple-900 rounded-lg text-white oswald-400 focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700/50 transition"
                  placeholder="Source name"
                />
                {errors.source && <ErrorMessage>{errors.source.message}</ErrorMessage>}
              </div>

              {/* date */}
              <div>
                <label 
                  htmlFor="date" 
                  className="block text-white oswald-400 text-sm font-semibold mb-2"
                >
                  Date
                </label>
                <input
                  type="date"
                  {...register("date", {
                    required: 'Date is required',
                    pattern : {
                      value: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
                      message: "Date must be in YYYY-MM-DD format. This is a glitch, please report to developer"
                    }
                  })}
                  className="w-full px-4 py-3 bg-black border border-purple-900 rounded-lg text-white oswald-400 focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700/50 transition"
                  placeholder="MM/DD/YYYY"
                />
                {errors.date && <ErrorMessage>{errors.date.message}</ErrorMessage>}
              </div>

              {/* description */}
              <div>
                <label 
                  htmlFor="description" 
                  className="block text-white oswald-400 text-sm font-semibold mb-2"
                >
                  Description
                </label>
                <textarea
                  type="text"
                  rows="4"
                  {...register("description", {
                    required: "Description is required"
                  })}
                  className="w-full px-4 py-3 bg-black border border-purple-900 rounded-lg text-white oswald-400 focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700/50 transition resize-none"
                  placeholder="Article description"
                />
                {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
              </div>

              {/* link */}
              <div>
                <label 
                  htmlFor="link" 
                  className="block text-white oswald-400 text-sm font-semibold mb-2"
                >
                  Link
                </label>  
                <input
                  {...register("link", {
                    required: "Link is required",
                    pattern: {
                      value: /^https?:\/\/.+\..+/,
                      message: "Link must be in https://mylink.com format"
                    }
                  })}
                  className="w-full px-4 py-3 bg-black border border-purple-900 rounded-lg text-white oswald-400 focus:outline-none focus:border-purple-700 focus:ring-1 focus:ring-purple-700/50 transition"
                  placeholder="https://example.com/article"
                />
                {errors.link && <ErrorMessage>{errors.link.message}</ErrorMessage>}
              </div>

              {/* submit button */}
              <button
                type="submit"
                disabled={isCreatePending || isEditPending}
                className="w-full py-3 bg-purple-950 hover:bg-purple-800 text-white rounded-lg font-semibold oswald-700 text-lg transition transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-[1] disabled:bg-gray-800 shadow-lg shadow-purple-900/50"
              >
                { isCreatePending || isEditPending ? 'Submitting' :
                article ? 'Edit Article' :
                'Create Article' }
              </button>
              { isCreateError && <ErrorMessage>Could not submit article</ErrorMessage>}
              { isEditError && <ErrorMessage>Could not edit article</ErrorMessage>}
            </form>
          </div>
  )
}