export function truncateText(string, n){
  return (string.length > n) ? string.slice(0, n-1) + '&hellip;' : string;
};