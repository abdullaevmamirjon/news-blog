import { useState } from 'react';
import ProfileShow from './profile';
import Edit from './profileEdit';

export const Index = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="profile">
      {isEdit ? <Edit setIsEdit={setIsEdit} /> : <ProfileShow setIsEdit={setIsEdit} />}
    </div>
  );
};
