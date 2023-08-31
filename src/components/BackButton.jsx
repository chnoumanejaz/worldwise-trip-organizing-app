import { useNavigate } from 'react-router-dom';
import * as Unicons from '@iconscout/react-unicons';
import Button from './Button';

function BackButton() {
  const navigate = useNavigate();

  function handleBack(e) {
    e.preventDefault();
    navigate(-1);
  }
  return (
    <Button type={'back'} onClick={handleBack}>
      <Unicons.UilArrowLeft />
      Back
    </Button>
  );
}

export default BackButton;
