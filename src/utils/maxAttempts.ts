export default function maxAttempts(challenge: number): number {
  if (challenge * 1.5 > 12) {
    return 12;
  }

  return Math.floor(challenge * 1.5);
}
