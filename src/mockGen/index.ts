function mockGenerator() {
  const locations = genArr('Location');
  const apartments = genArr('Apt', 14);

  function getApts(locationId: string) {
    const location = locations.find(l => l[0] === locationId);

    if (!location) {
      return null;
    }

    return {
      location: location[1],
      apt: apartments.map(a => [`${location[0]}${a[0]}`, a[1]]),
    };
  }

  function getOneApt(aptId: string) {
    const location = aptId.slice(0, 2);
    return getApts(location)?.apt.find(a => a[0] === aptId);
  }

  return {
    locations,
    getApts,
    getOneApt,
  };
}

function genArr(string: string, len = 5) {
  return Array.from({ length: len }).map((_, i) => {
    const id = i + 1;
    return [`${string.at(0)}${id}`, `${string} ${id}`] as [string, string];
  });
}

export default mockGenerator();
