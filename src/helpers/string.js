const generateRandomId = () => {
  const randomId = Date.now() + parseInt(String(Math.random() * 10000), 10);

  return randomId;
};

export {generateRandomId};
