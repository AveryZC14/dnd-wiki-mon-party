import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Properties: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter
  if (!frontmatter) return null

  // Define properties you want to EXCLUDE from showing
  const exclude = ["title", "content", "slug"] 
  
  const entries = Object.entries(frontmatter).filter(([key]) => !exclude.includes(key))

  if (entries.length === 0) return null

  return (
    <div className={`properties ${displayClass ?? ""}`}>
      <hr />
      {entries.map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : String(value)}
        </p>
      ))}
      <hr />
    </div>
  )
}

export default (() => Properties) satisfies QuartzComponentConstructor