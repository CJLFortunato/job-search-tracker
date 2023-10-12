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
  id?: string,
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
  steps: {
    apply: Apply,
    followUp: FollowUp,
    interview: Interview,
    answer: Answer,
  },
  tags: string[],
}

// prop types

export interface State {
  apps: Application[],
  isLoading: boolean,
  error: string,
}
