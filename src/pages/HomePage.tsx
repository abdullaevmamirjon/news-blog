import React, { useState } from 'react';
import News from './news';
import { AddNews, FetchNews } from '../redux/news';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { useParams } from 'react-router-dom';
import Selects from '../components/selects';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import CreatableSelect, { useCreatable } from 'react-select/creatable';
import { fetchCities } from '../redux/categories';
import { fetchTags } from '../redux/tags';

type Props = {};

type AddInputs = {
  title: string;
  image: any;
  description: string;
  views: number;
  author: number;
  tags: any;
  categories: any;
  content: any;
};

const HomePage = (props: Props) => {
  const [fetch, setFetch] = useState<any>(false);
  const dispatch = useAppDispatch();
  const { news, categories, tags } = useAppSelector((state) => state);
  React.useEffect(() => {
    dispatch(fetchCities());
  }, []);
  React.useEffect(() => {
    dispatch(fetchTags());
  }, []);
  React.useEffect(() => {
    dispatch(FetchNews());
  }, [fetch]);

  const [categoryId, setCategoryID] = useState();
  const [tagsId, setTagsID] = useState();
  const [img2, setImg] = useState();
  const changer = (e: any) => {
    setImg(e.target.files[0]);
  };
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<AddInputs>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<AddInputs> = (data: any) => {
    dispatch(
      AddNews(
        {
          ...data,
          tags: tagsId,
          category: categoryId,
          image: img2,
        },
        fetch,
        setFetch,
      ),
    );
  };


  return (
    <div className="HomePage">
      <form className="add_news">
        <div>
          <input type="file" onChange={(e) => changer(e)} />
        </div>
        <div>
          <input placeholder="title" {...register('title', { required: true })} type="text" />
        </div>
        <div>
          <input
            placeholder="description"
            {...register('description', { required: true })}
            type="text"
          />
        </div>
        <div>
          <input placeholder="views" {...register('views', { required: true })} type="number" />
        </div>
        <div>
          <input placeholder="author" {...register('author', { required: true })} type="text" />
        </div>
        <div>
          <input placeholder="content" {...register('content', { required: true })} type="text" />
        </div>
        <div className="select">
          <div className="select_categories">
            <Controller
              name="categories"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  isClearable
                  isDisabled={categories.loading}
                  isLoading={categories.loading}
                  options={categories?.data?.results}
                  placeholder={<div>Выберите категорию</div>}
                  formatCreateLabel={(userInput) => `Создать: ${userInput}`}
                  onChange={(e: any) => setCategoryID(e.id)}
                />
              )}
            />
          </div>
          <div className="select_tags">
            <Controller
              name="tags"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <CreatableSelect
                  {...field}
                  isClearable
                  isDisabled={tags.loading}
                  isLoading={tags.loading}
                  options={tags?.data?.results}
                  placeholder={<div>Выберите тег</div>}
                  formatCreateLabel={(userInput) => `Создать: ${userInput}`}
                  onChange={(e: any) => setTagsID(e.id)}
                />
              )}
            />
          </div>
        </div>
        <div className="btn">
          <button onClick={handleSubmit(onSubmit)} className="button">
            Add
          </button>
        </div>
      </form>

      <table>
        <tr className="header_tr">
          <th className="td_image2">Image</th>
          <th className="td_title">Title </th>
          <th className="td_description">Description</th>
          <th className="td_image2">Views</th>
          <th>Options</th>
        </tr>
      </table>
      <div className="MapNews">
        {news.data?.results?.map((item: any) => (
          <News key={item.id} item={item} image={item.image} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
