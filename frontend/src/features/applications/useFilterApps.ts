import useApps from './useApps';

function useFilterApps(formData: any) {
  const { apps } = useApps();

  const sortedApps = [...apps].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateB.getTime() - dateA.getTime();
  });

  let filteredApps = sortedApps;

  if (formData.jobTitle) {
    filteredApps = filteredApps.filter(
      (app) => app.jobTitle.toLowerCase().includes(formData.jobTitle.toLowerCase()),
    );
  }

  if (formData.companyName) {
    filteredApps = filteredApps.filter(
      (app) => app.companyName.toLowerCase().includes(formData.companyName.toLowerCase()),
    );
  }

  if (formData.contractType) {
    filteredApps = filteredApps.filter(
      (app) => app.contractType.toLowerCase().includes(formData.contractType.toLowerCase()),
    );
  }

  if (formData.location) {
    filteredApps = filteredApps.filter(
      (app) => app.location.toLowerCase().includes(formData.location.toLowerCase()),
    );
  }

  const arrayCompare = (arr1: any[], arr2: any[]) => {
    let isIncluded = false;
    for (let i = 0; i < arr1.length; i += 1) {
      for (let j = 0; j < arr2.length; j += 1) {
        isIncluded = arr1[i] === arr2[j];
      }
    }
    return isIncluded;
  };

  if (formData.tags.length) {
    filteredApps = filteredApps.filter(
      (app) => arrayCompare(app.tags.map((tag) => tag._id), formData.tags),
    );
  }
  return filteredApps;
}

export default useFilterApps;
