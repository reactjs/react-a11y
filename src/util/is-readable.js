const isReadable = text => {
  return text.replace(/\s/g, '').length > 1;
};

export default isReadable;
