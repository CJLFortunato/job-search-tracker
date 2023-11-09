import { useEffect } from 'react';

import { getTags, createTags, deleteTags } from './tags.slice';
import { NewTag } from './types';
import { useAppDispatch, useAppSelector } from '../../common/hooks';

function useTags() {
  const dispatch = useAppDispatch();
  const { tags, error } = useAppSelector((state) => state.tagsReducer);

  useEffect(() => {
    if (!tags.length) dispatch(getTags());
  }, []);

  const createTagsFunction = (newTags: NewTag[]) => {
    dispatch(createTags(newTags));
  };

  const deleteTag = (id: string) => {
    dispatch(deleteTags(id));
  };

  return {
    tags,
    createTagsFunction,
    deleteTag,
    error,
  };
}

export default useTags;
