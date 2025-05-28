interface CategoryHeroProps {
  title: string
  description: string
}

export function CategoryHero({ title, description }: CategoryHeroProps) {
  return (
    <section className="mb-12 pt-4">
      <div className="border-l-2 border-green-300 pl-6 py-2">
        <h1 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tight leading-[1.15] mb-3 font-gothic">
          {title}
        </h1>
        <p className="text-base text-slate-700 leading-relaxed font-inter max-w-2xl">{description}</p>
      </div>
    </section>
  )
}
