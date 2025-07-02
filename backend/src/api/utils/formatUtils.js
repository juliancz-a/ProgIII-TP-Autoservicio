function formatDate(date) {
  return new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'long',
    timeStyle: 'medium',
    hour12: false
  }).format(new Date(date));
}

function formatPrice(price) {
  return price.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).split(",")[0];
}

export default {
    formatDate,
    formatPrice
}