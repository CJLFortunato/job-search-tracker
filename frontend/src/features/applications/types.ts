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
  _id?: string,
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
}

export interface AddFormProps {
  setOpenForm: Function,
}

export interface StepsProps {
  application: Application
}

export interface DeleteButtonProps {
  id: string
}
