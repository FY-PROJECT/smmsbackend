const getRegexDatePattern = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const pattern = `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month}`;
    const dateRegex = new RegExp(`^${pattern}`);
    return dateRegex;
  };
  
  
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month}-${year}`;
  };

module.exports = {getRegexDatePattern,formatDate};