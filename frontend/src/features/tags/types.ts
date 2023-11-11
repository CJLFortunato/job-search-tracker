export interface Tag {
  _id: string,
  user: string,
  label: string,
  applications: string[],
}

export interface State {
  tags: Tag[],
  isLoading: boolean,
  error: string,
}

export interface NewTag {
  label: string,
  applications: string[],
}

// prop types =====================

export interface DisplayTagsProps {
  tags: Tag[]
}

export interface TagChipProps {
  tag: Tag,
  canDelete?: boolean,
}

export interface SelectTagsProps {
  tags: Tag[],
  selectedTags: string[],
  handleSelect: Function,
}