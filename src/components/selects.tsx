import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import CreatableSelect, { useCreatable } from 'react-select/creatable';
import { fetchCities } from '../redux/categories';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { fetchTags } from '../redux/tags';

type Props = {};

type DeliveryInputs = {
  categories: any;
  tags: any;
};

const Selects = (props: Props) => {
  const { categories, tags } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<DeliveryInputs>({
    mode: 'onBlur',
  });
  React.useEffect(() => {
    dispatch(fetchCities());
  }, []);
  React.useEffect(() => {
    dispatch(fetchTags());
  }, []);

  return (
    <div className='select'>
      <div className="select_categories">
        <Controller
          name="categories"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CreatableSelect
              {...field}
              isClearable
              isDisabled={categories.loading}
              isLoading={categories.loading}
              options={categories?.data?.results}
              placeholder={<div>Выберите категорию</div>}
              formatCreateLabel={(userInput) => `Создать: ${userInput}`}
              // onChange={handleCityChange}
            />
          )}
        />
      </div>
      <div className="select_tags">
        <Controller
          name="tags"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CreatableSelect
              {...field}
              isClearable
              isDisabled={tags.loading}
              isLoading={tags.loading}
              options={tags?.data?.results}
              placeholder={<div>Выберите тег</div>}
              formatCreateLabel={(userInput) => `Создать: ${userInput}`}
              // onChange={handleCityChange}
            />
          )}
        />
      </div>
    </div>
  );
};

export default Selects;
