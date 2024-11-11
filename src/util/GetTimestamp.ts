export default function GetTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}