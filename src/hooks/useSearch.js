export const useSearch = ({ query, suggestions }) => {
  if (!query.trim()) {
    return [];
  } else {
    const filtered = suggestions.filter(
      (item) =>
        item.toLowerCase().startsWith(query.toLowerCase()) ||
        item.toLowerCase() === query.toLowerCase(),
    );
    return filtered;
  }
};
