function formatDate(date) {
  return new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(date));
}

function formatPrice(price) {
  return price.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).split(",");
}

export default {
    formatDate,
    formatPrice
}