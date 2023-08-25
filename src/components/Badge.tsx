export default function Badge({ caption }: { caption: string | number }) {
  return <span className="badge">{caption}</span>;
}
