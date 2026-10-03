export default function GenericPage({ title, description, icon, features }) {
    return (<div className="p-6">
      <div className="mb-5">
        <h1 className="text-xl font-bold text-[#0d2137]" style={{ fontFamily: "'DM Serif Display', serif" }}>{title}</h1>
        <p className="text-sm text-[#4a6080] mt-0.5">{description}</p>
      </div>

      <div className="bg-white border border-[#c8d6e8] rounded-sm p-8 text-center max-w-lg mx-auto">
        <div className="text-4xl mb-4">{icon}</div>
        <div className="text-base font-semibold text-[#0d2137] mb-2">{title}</div>
        <p className="text-sm text-[#4a6080] mb-5">{description}</p>
        {features && features.length > 0 && (<div className="flex flex-wrap gap-2 justify-center">
            {features.map((f) => (<span key={f} className="text-xs bg-[#e8eef7] text-[#1a3a5c] border border-[#c8d6e8] px-3 py-1.5 rounded-sm font-medium">
                {f}
              </span>))}
          </div>)}
      </div>
    </div>);
}
