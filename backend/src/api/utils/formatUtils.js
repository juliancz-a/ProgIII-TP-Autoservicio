function formatDate(date) {
  return new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date(date));
}

function formatPrice(price) {

}

export default {
    formatDate,
    formatPrice
}