export function getInitials(name: string) {
  const parts = name.trim().split(" ");
  if (parts.length < 2) {
    return ""; // Return an empty string if there's only one word
  }
  const firstInitial = parts[0][0].toUpperCase();
  const secondInitial = parts[1][0].toUpperCase();
  return firstInitial + secondInitial;
}
