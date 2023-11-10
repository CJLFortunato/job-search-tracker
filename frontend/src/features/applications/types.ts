import { Tag } from "features/tags/types"

// data Types
interface Apply {
  date: string,
  type: string,
}

interface FollowUp {
  date: string,
  type: string,
}

interface Interview {
  date: string,
  type: string,
}

interface Answer {
  date: string,
  outcome: string,
}

export interface Application {
  user: string,
  _id: string,
  jobTitle: string,
  companyName: string,
  contractType: string,
  jobLink: string,
  companyLink: string,
  appType: string,
  location: string,
  contactName: string | null,
  coverLetter: boolean,
  status: number,
  steps?: {
    apply?: Apply,
    followUp?: FollowUp[],
    interview?: Interview[],
    answer?: Answer,
  },
  tags: Tag[],
  createdAt: string,
  updateddAt: string,
}

export interface ApplicationCreate {
  user?: string,
  jobTitle: string,
  companyName: string,
  contractType: string,
  jobLink: string,
  companyLink: string,
  appType: string,
  location: string,
  contactName: string | null,
  coverLetter: boolean,
  status: number,
  steps?: {
    apply?: Apply,
    followUp?: FollowUp[],
    interview?: Interview[],
    answer?: Answer,
  },
  tags: string[],
  createdAt?: string,
  updateddAt?: string,
}

export interface ApplicationUpdate {
  _id: string,
  user: string,
  jobTitle: string,
  companyName: string,
  contractType: string,
  jobLink: string,
  companyLink: string,
  appType: string,
  location: string,
  contactName: string | null,
  coverLetter: boolean,
  status: number,
  steps?: {
    apply?: Apply,
    followUp?: FollowUp[],
    interview?: Interview[],
    answer?: Answer,
  },
  tags: string[],
  createdAt?: string,
  updateddAt?: string,
}

// prop types

export interface State {
  apps: Application[],
  isLoading: boolean,
  error: string,
}

export interface ColumnProps {
  columnData: {
    id: number,
    label: string
  },
  apps: Application[],
  isMobile: boolean,
}

export interface AppCardProps {
  app: Application,
  index: number,
  isMobile: boolean,
}

export interface AddFormProps {
  setOpenForm: Function,
  isUpdate?: boolean,
  app?: Application
}

export interface StepsProps {
  application: Application,
  setOpenDialog?: Function,
}

export interface DeleteButtonProps {
  id: string
}

export interface AppDetailsProps {
  app: Application,
  setOpen: Function,
}

export interface EditAppProps {
  app: Application,
}

export interface FilterBarProps {
  formData: {
    jobTitle: string,
    companyName: string,
    contractType: string,
    location: string,
    tags: string[]
  },
  setFormData: Function
}
