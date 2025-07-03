export function buildFiltersQuery(filters = {}) {
    let query = '';

    if (filters.category) {
        query += `&category=${filters.category}`;
    }
    if (filters.priceRange) {
        if (!isNaN(filters.priceRange.min)) {
            query += `&min=${filters.priceRange.min}`;
        }
        if (!isNaN(filters.priceRange.max)) {
            query += `&max=${filters.priceRange.max}`;
        }
    }
    if (typeof filters.enabled !== 'undefined') {
        query += `&enabled=${filters.enabled}`;
    }

    return query;
}