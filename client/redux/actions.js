export const initiateSession = (service, data) => {
  return {
    type: 'INIT_SESSION',
    service,
    data,
  };
};
