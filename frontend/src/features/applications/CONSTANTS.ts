export const COLUMNS = [
  {
    id: 0,
    label: 'A postuler',
  },
  {
    id: 1,
    label: 'En cours',
  },
  {
    id: 2,
    label: 'Relancé',
  },
  {
    id: 3,
    label: 'Entretien',
  },
  {
    id: 4,
    label: 'Terminé',
  },
];

export const CONTRACT_TYPE = {
  cdi: 'CDI',
  cdd: 'CDD',
  stage: 'Stage',
  alternance: 'Alternance',
  interim: 'Intérim',
  autre: 'Autre',
};

export const EMPTY_APP = {
  user: '',
  jobTitle: '',
  companyName: '',
  contractType: '',
  jobLink: '',
  companyLink: '',
  appType: '',
  location: '',
  contactName: '',
  coverLetter: false,
  status: 0,
  steps: {},
  tags: [],
  _id: '',
  createdAt: '',
  updatedAt: '',
};
