const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatCurrency = (value) => {
  if (value) {
    return value
      .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
      .replace('.', ',');
  }
  return 'R$ 0,00';
};

export { formatDate, formatCurrency };
