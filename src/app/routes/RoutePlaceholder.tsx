type RoutePlaceholderProps = {
  label: string;
};

export function RoutePlaceholder({ label }: RoutePlaceholderProps) {
  return (
    <div className="page-frame">
      <section className="route-placeholder" aria-labelledby="page-title">
        <p className="route-placeholder__eyebrow">Site shell</p>
        <h1 className="route-placeholder__title" id="page-title">
          {label}
        </h1>
        <p className="route-placeholder__copy">This section is in preparation.</p>
      </section>
    </div>
  );
}
