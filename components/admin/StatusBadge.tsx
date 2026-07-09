interface StatusBadgeProps {
  status: "pending" | "confirmed" | "cancelled" | boolean;
}

const statusConfig = {
  pending: { label: "Menunggu", className: "bg-amber-100 text-amber-700" },
  confirmed: { label: "Dikonfirmasi", className: "bg-green-100 text-green-700" },
  cancelled: { label: "Dibatalkan", className: "bg-red-100 text-red-700" },
  true: { label: "Dipublikasi", className: "bg-green-100 text-green-700" },
  false: { label: "Draft", className: "bg-gray-100 text-gray-600" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config =
    typeof status === "boolean"
      ? statusConfig[String(status) as "true" | "false"]
      : statusConfig[status];

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
