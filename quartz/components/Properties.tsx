import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, FullSlug, simplifySlug } from "../util/path"

const Properties: QuartzComponent = ({ fileData, displayClass, allFiles }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter
  if (!frontmatter) return null

  const exclude = ["title", "content", "slug", "tags"] 
  const entries = Object.entries(frontmatter).filter(([key]) => !exclude.includes(key))

  if (entries.length === 0) return null

  const renderValue = (value: any) => {
    const str = String(value)
    const match = str.match(/\[\[([^\]|#]+)(?:#([^\]|]+))?(?:\|([^\]]+))?\]\]/)
    
    if (match) {
      const targetName = match[1]
      const anchor = match[2] ? `#${match[2]}` : ""
      const alias = match[3] || targetName

      // 1. Find the actual file in the vault that matches this link
      const dest = allFiles.find(f => 
        f.slug === simplifySlug(targetName) || 
        f.frontmatter?.title === targetName ||
        f.name === targetName
      )

      if (dest) {
        // 2. Resolve the relative path using the destination's ACTUAL slug
        const href = resolveRelative(fileData.slug!, dest.slug) + anchor
        return (
          <a href={href} class="internal" data-slug={dest.slug}>
            {alias}
          </a>
        )
      }
      
      // Fallback if file isn't found
      return <span class="broken-link" style={{ color: "var(--red)" }}>{alias}</span>
    }
    
    return str
  }

  return (
    <div className={`properties ${displayClass ?? ""}`}>
      <div className="property-container" style={{ 
        fontSize: "0.9rem", 
        margin: "1rem 0",
        padding: "0.8rem",
        backgroundColor: "var(--light)",
        border: "1px solid var(--lightgray)",
        borderRadius: "5px"
      }}>
        {entries.map(([key, value]) => (
          <div key={key} style={{ display: "flex", gap: "10px", marginBottom: "4px" }}>
            <span style={{ color: "var(--gray)", fontWeight: "bold", minWidth: "80px" }}>{key}</span>
            <span>
              {Array.isArray(value) 
                ? value.map((v, i) => <span key={i}>{renderValue(v)}{i < value.length - 1 ? ", " : ""}</span>)
                : renderValue(value)
              }
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default (() => Properties) satisfies QuartzComponentConstructor