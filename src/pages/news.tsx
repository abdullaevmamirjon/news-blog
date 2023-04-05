import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { DeleteNews, EditNews } from '../redux/news';
import { FetchProfile } from '../redux/profile';
import { useAppDispatch, useAppSelector } from '../redux/store';

type Props = {
  image: string;
  item: any;
};

type Inputs = {
  title: string;
  description: string;
  image: string;
  id: string;
  views: number;
};

const News = ({ image, item }: Props) => {
  const { profile } = useAppSelector((state) => state);
  useEffect(() => {
    dispatch(FetchProfile())
  },[])
    const dispatch = useAppDispatch();
  const [editable, setIsEditable] = React.useState(false);
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    dispatch(
      EditNews(
        {
          id: data.id,
          title: data.title,
          description: data.description,
          views: data.views,
        },
        setIsEditable,
        item?.id,
      ),
    );
  };

  const deleteItem = () => {
    dispatch(DeleteNews(item?.id));
  };

  const profile2 = localStorage.getItem('profile')
    ? JSON.parse(localStorage.getItem('profile') || '')
    : undefined;


  return (
    <div className="News">
      {!editable ? (
        <table>
          <tr className="tr_bottom">
            <td className="td_image">
              <img src={item?.image} alt="" />
            </td>
            <td className="td_title">{item?.title}</td>
            <td className="td_description">{item?.description}</td>
            <td className="td_image">{item?.views}</td>
            <td className="td_buttons">
              {profile.data.id === item?.author ? (
                <>
                  <button onClick={() => setIsEditable(true)}>Edit</button>
                  <button onClick={() => deleteItem()}>Delete</button>
                </>
              ) : null}
            </td>
          </tr>
        </table>
      ) : (
        <tr className="tr_bottom">
          <td className="td_edit">
            <input defaultValue={item?.image} {...register('image')} />
          </td>
          <td className="">
            <input defaultValue={item?.title} {...register('title')} type="text" />
          </td>
          <td className="">
            <input defaultValue={item?.description} {...register('description')} type="text" />
          </td>
          <td className="">
            <input defaultValue={item?.views} {...register('views')} type="text" />
          </td>
          <td className="td_buttons">
            <button onClick={handleSubmit(onSubmit)}>Edit</button>
          </td>
        </tr>
      )}
    </div>
  );
};

export default News;
