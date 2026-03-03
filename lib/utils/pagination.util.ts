export function getPagination(
  searchParams: URLSearchParams,
  defaults = { page: 1, limit: 20 }
) {
  const page = Math.max(1, parseInt(searchParams.get('page') || String(defaults.page), 10))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || String(defaults.limit), 10)))
  const skip = (page - 1) * limit
  return { page, limit, skip }
}
