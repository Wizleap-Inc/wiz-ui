const getAttributes = (info, mark) => {
  return info.trim().slice(mark.length).trim();
};

module.exports = {
  getAttributes,
};
