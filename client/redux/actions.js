export const initiateSession = (service, data) => {
  return {
    type: 'INIT_SESSION',
    service,
    data,
  };
};

export const endSession = () => {
  return {
    type: 'END_SESSION',
  };
};
